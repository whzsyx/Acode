import select from "dialogs/select";
import escapeStringRegexp from "escape-string-regexp";
import Url from "utils/Url";
import helpers from "utils/helpers";

const recents = {
	/**
	 * @returns {Array<String>}
	 */
	get files() {
		return JSON.parse(localStorage.recentFiles || "[]");
	},
	/**
	 * @returns {{url: String, opts: Map<String, String>}[]}
	 */
	get folders() {
		return JSON.parse(localStorage.recentFolders || "[]");
	},
	set files(list) {
		if (Array.isArray(list)) localStorage.recentFiles = JSON.stringify(list);
	},
	set folders(list) {
		if (Array.isArray(list)) localStorage.recentFolders = JSON.stringify(list);
	},
	MAX: 10,
	/**
	 *
	 * @param {string} file
	 */
	addFile(file) {
		let files = this.files;
		if (files.length >= this.MAX) files.pop();
		files = files.filter((i) => i !== file);
		files.unshift(file);
		this.files = files;
	},
	addFolder(url, opts) {
		if (url.slice(-1) === "/") {
			url = url.slice(0, -1);
		}

		let folders = this.folders;
		if (folders.length >= this.MAX) folders.pop();
		folders = folders.filter((i) => i.url !== url);
		folders.unshift({
			url,
			opts,
		});
		this.folders = folders;
	},

	removeFolder(url) {
		({ url } = Url.parse(url));
		this.folders = this.folders.filter((folder) => {
			return !new RegExp("^" + escapeStringRegexp(folder.url)).test(url);
		});
	},

	removeFile(url) {
		({ url } = Url.parse(url));
		this.files = this.files.filter((file) => {
			return !new RegExp("^" + escapeStringRegexp(url)).test(file);
		});
	},

	clear() {
		this.files = [];
		this.folders = [];
	},
	/**
	 *
	 * @param {Array<Array<string, any, string>>} [extra]
	 * @param {"file"|"dir"|"all"} [type]
	 * @param {string} [title]
	 * @returns {Promise<RecentPathData>}
	 */
	select(extra, type = "all", title = strings["open recent"]) {
		const all = [];
		const MAX = 20;
		const shortName = (name) => {
			name = helpers.getVirtualPath(name);

			if (name.length > MAX) {
				return "..." + name.substr(-MAX - 3);
			}
			return name;
		};

		if (type === "dir" || type === "all") {
			let dirs = this.folders;
			for (let dir of dirs) {
				const { url } = dir;

				all.push([
					{
						type: "dir",
						val: dir,
					},
					shortName(url),
					"icon folder",
				]);
			}
		}

		if (type === "file" || type === "all") {
			let files = this.files;
			for (let file of files) {
				if (!file) continue;
				const name = shortName(Url.parse(file).url);
				all.push([
					{
						type: "file",
						val: file,
					},
					name,
					helpers.getIconForFile(name),
				]);
			}
		}

		if (type === "all") all.push(["clear", strings.clear, "icon clearclose"]);

		if (extra) {
			extra = extra.map((item) => {
				item[1] = shortName(item[1]);
				return item;
			});

			all.push(...extra);
		}

		return select(title, all, {
			textTransform: false,
		});
	},
};

export default recents;
