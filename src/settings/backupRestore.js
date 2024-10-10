import settingsPage from "components/settingsPage";
import alert from "dialogs/alert";
import fsOperation from "fileSystem";
import appSettings from "lib/settings";
import FileBrowser from "pages/fileBrowser";
import Uri from "utils/Uri";
import Url from "utils/Url";

function backupRestore() {
	const title =
		strings.backup.capitalize() + "/" + strings.restore.capitalize();
	const items = [
		{
			key: "backup",
			text: strings.backup.capitalize(),
			icon: "file_downloadget_app",
		},
		{
			key: "restore",
			text: strings.restore.capitalize(),
			icon: "historyrestore",
		},
		{
			note: strings["backup/restore note"],
		},
	];

	return settingsPage(title, items, callback);

	function callback(key) {
		switch (key) {
			case "backup":
				backup();
				return;

			case "restore":
				restore();
				return;

			default:
				break;
		}
	}

	async function backup() {
		try {
			const settings = appSettings.value;
			const keyBindings = await fsOperation(KEYBINDING_FILE).readFile("json");

			const { url } = await FileBrowser("folder", strings["select folder"]);

			const backupFilename = "Acode.backup";
			const backupDirname = "Backup";
			const backupDir = Url.join(url, backupDirname);
			const backupFile = Url.join(backupDir, backupFilename);
			const backupStorageFS = fsOperation(url);
			const backupDirFS = fsOperation(backupDir);
			const backupFileFS = fsOperation(backupFile);

			if (!(await backupDirFS.exists())) {
				await backupStorageFS.createDirectory(backupDirname);
			}

			if (!(await backupFileFS.exists())) {
				await backupDirFS.createFile(backupFilename);
			}

			const backupString = JSON.stringify({
				settings,
				keyBindings,
			});

			await backupFileFS.writeFile(backupString);

			alert(
				strings.success.toUpperCase(),
				`${strings["backup successful"]}\n${Uri.getVirtualAddress(
					backupFile,
				)}.`,
			);
		} catch (error) {
			console.error(error);
			toast(error);
		}
	}

	function restore() {
		sdcard.openDocumentFile(
			(data) => {
				backupRestore.restore(data.uri);
			},
			toast,
			"application/octet-stream",
		);
	}
}

backupRestore.restore = async function (url) {
	try {
		let fs = fsOperation(url);
		let backup = await fs.readFile("utf8");

		try {
			backup = JSON.parse(backup);
		} catch (error) {
			alert(strings.error.toUpperCase(), strings["invalid backup file"]);
		}

		try {
			const text = JSON.stringify(backup.keyBindings, undefined, 2);
			await fsOperation(window.KEYBINDING_FILE).writeFile(text);
		} catch (error) {}

		const { settings } = backup;
		await appSettings.update(settings);
		location.reload();
	} catch (err) {
		toast(err);
	}
};

export default backupRestore;
