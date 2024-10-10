import "./style.scss";

import collapsableList from "components/collapsableList";
import Sidebar from "components/sidebar";
import select from "dialogs/select";
import fsOperation from "fileSystem";
import constants from "lib/constants";
import settings from "lib/settings";
import plugin from "pages/plugin";
import Url from "utils/Url";
import helpers from "utils/helpers";

/** @type {HTMLElement} */
let $installed = null;
/** @type {HTMLElement} */
let $explore = null;
/** @type {HTMLElement} */
let container = null;
/** @type {HTMLElement} */
let $searchResult = null;

const $header = (
	<div className="header">
		<span className="title">
			{strings["plugins"]}
			<button className="icon-button" onclick={filterPlugins}>
				<span className="icon tune"></span>
			</button>
		</span>
		<input
			oninput={searchPlugin}
			type="search"
			name="search-ext"
			placeholder="Search"
		/>
	</div>
);

let searchTimeout = null;
let installedPlugins = [];

export default [
	"extension", // icon
	"extensions", // id
	strings["plugins"], // title
	initApp, // init function
	false, // prepend
	onSelected, // onSelected function
];

/**
 * On selected handler for files app
 * @param {HTMLElement} el
 */
function onSelected(el) {
	const $scrollableLists = container.getAll(":scope .scroll[data-scroll-top]");
	$scrollableLists.forEach(($el) => {
		$el.scrollTop = $el.dataset.scrollTop;
	});
}

/**
 * Initialize extension app
 * @param {HTMLElement} el
 */
function initApp(el) {
	container = el;
	container.classList.add("extensions");
	container.content = $header;

	if (!$searchResult) {
		$searchResult = <ul className="list search-result scroll"></ul>;
		container.append($searchResult);
	}

	if (!$explore) {
		$explore = collapsableList(strings["explore"]);
		$explore.ontoggle = loadExplore;
		container.append($explore);
	}

	if (!$installed) {
		$installed = collapsableList(strings["installed"]);
		$installed.ontoggle = loadInstalled;
		$installed.expand();
		container.append($installed);
	}

	Sidebar.on("show", onSelected);
}

async function searchPlugin() {
	clearTimeout(searchTimeout);
	searchTimeout = setTimeout(async () => {
		$searchResult.content = "";
		const status = helpers.checkAPIStatus();
		if (!status) {
			$searchResult.content = (
				<span className="error">{strings["api_error"]}</span>
			);
			return;
		}

		const query = this.value;
		if (!query) return;

		try {
			$searchResult.classList.add("loading");
			const plugins = await fsOperation(
				Url.join(constants.API_BASE, `plugins?name=${query}`),
			).readFile("json");

			installedPlugins = await listInstalledPlugins();
			$searchResult.content = plugins.map(ListItem);
			updateHeight($searchResult);
		} catch (error) {
			$searchResult.content = <span className="error">{strings["error"]}</span>;
		} finally {
			$searchResult.classList.remove("loading");
		}
	}, 500);
}

async function filterPlugins() {
	const filterOptions = {
		[strings.top_rated]: "top_rated",
		[strings.newly_added]: "newest",
		[strings.most_downloaded]: "downloads",
	};

	const filterName = await select("Filter", Object.keys(filterOptions));
	if (!filterName) return;

	$searchResult.content = "";
	const filterParam = filterOptions[filterName];

	try {
		$searchResult.classList.add("loading");
		const plugins = await getFilteredPlugins(filterParam);
		const filterMessage = (
			<div className="filter-message">
				<span>
					Filter for <strong>{filterName}</strong>
				</span>
				<span
					className="icon clearclose close-button"
					data-action="clear-filter"
					onclick={() => clearFilter()}
				></span>
			</div>
		);
		$searchResult.content = [filterMessage, ...plugins.map(ListItem)];
		updateHeight($searchResult);

		function clearFilter() {
			$searchResult.content = "";
			updateHeight($searchResult);
		}
	} catch (error) {
		window.log("error", "Error filtering plugins:");
		window.log("error", error);
		$searchResult.content = <span className="error">{strings["error"]}</span>;
	} finally {
		$searchResult.classList.remove("loading");
	}
}

async function clearFilter() {
	$searchResult.content = "";
}

async function loadInstalled() {
	if (this.collapsed) return;

	const plugins = await listInstalledPlugins();
	if (!plugins.length) {
		$installed.collapse();
	}
	$installed.$ul.content = plugins.map(ListItem);
	updateHeight($installed);
}

async function loadExplore() {
	if (this.collapsed) return;

	const status = helpers.checkAPIStatus();
	if (!status) {
		$explore.$ul.content = (
			<span className="error">{strings["api_error"]}</span>
		);
		return;
	}

	try {
		startLoading($explore);
		const plugins = await fsOperation(
			Url.join(constants.API_BASE, "plugins?explore=random"),
		).readFile("json");

		installedPlugins = await listInstalledPlugins();
		$explore.$ul.content = plugins.map(ListItem);
		updateHeight($explore);
	} catch (error) {
		$explore.$ul.content = <span className="error">{strings["error"]}</span>;
	} finally {
		stopLoading($explore);
	}
}

async function listInstalledPlugins() {
	const plugins = await Promise.all(
		(await fsOperation(PLUGIN_DIR).lsDir()).map(async (item) => {
			const id = Url.basename(item.url);
			const url = Url.join(item.url, "plugin.json");
			const plugin = await fsOperation(url).readFile("json");
			const iconUrl = getLocalRes(id, "icon.png");
			plugin.icon = await helpers.toInternalUri(iconUrl);
			plugin.installed = true;
			return plugin;
		}),
	);
	return plugins;
}

async function getFilteredPlugins(filterName) {
	try {
		let response;
		if (filterName === "top_rated") {
			response = await fetch(`${constants.API_BASE}/plugins?explore=random`);
		} else {
			response = await fetch(
				`${constants.API_BASE}/plugin?orderBy=${filterName}`,
			);
		}
		return await response.json();
	} catch (error) {
		window.log("error", error);
	}
}

function startLoading($list) {
	$list.$title.classList.add("loading");
}

function stopLoading($list) {
	$list.$title.classList.remove("loading");
}

/**
 * Update the height of the element
 * @param {HTMLElement} $el
 */
function updateHeight($el) {
	removeHeight($installed, $el !== $installed);
	removeHeight($explore, $el !== $explore);

	let height = $header.getBoundingClientRect().height;
	if ($el === $searchResult) {
		height += 60;
	} else {
		height += $searchResult.getBoundingClientRect().height + 30;
	}

	setHeight($el, height);
}

function removeHeight($el, collapse = false) {
	if (collapse) $el.collapse?.();
	$el.style.removeProperty("max-height");
	$el.style.removeProperty("height");
}

function setHeight($el, height) {
	const calcHeight = height ? `calc(100% - ${height}px)` : "100%";
	$el.style.maxHeight = calcHeight;
	if ($el === $searchResult) {
		$el.style.height = "fit-content";
		return;
	}
	$el.style.height = calcHeight;
}

function getLocalRes(id, name) {
	return Url.join(PLUGIN_DIR, id, name);
}

function ListItem({ icon, name, id, version, downloads, installed }) {
	if (installed === undefined) {
		installed = !!installedPlugins.find(({ id: _id }) => _id === id);
	}
	const $el = (
		<div className="tile" data-plugin-id={id}>
			<span className="icon" style={{ backgroundImage: `url(${icon})` }}></span>
			<span
				className="text sub-text"
				data-subtext={`v${version} • ${installed ? `${strings["installed"]}` : helpers.formatDownloadCount(downloads)}`}
			>
				{name}
			</span>
			{installed ? (
				<span
					className="icon more_vert"
					data-action="more-plugin-action"
				></span>
			) : (
				""
			)}
		</div>
	);

	$el.onclick = (event) => {
		const morePluginActionButton = event.target.closest(
			'[data-action="more-plugin-action"]',
		);
		if (morePluginActionButton) {
			more_plugin_action(id, name);
			return;
		}

		plugin(
			{ id, installed },
			() => {
				const $item = () => (
					<ListItem
						icon={icon}
						name={name}
						id={id}
						version={version}
						installed={true}
					/>
				);
				if ($installed.contains($el))
					$installed.$ul?.replaceChild($item(), $el);
				else $installed.$ul?.append($item());
				if ($explore.contains($el)) $explore.$ul?.replaceChild($item(), $el);
				if ($searchResult.contains($el))
					$searchResult?.replaceChild($item(), $el);
			},
			() => {
				$el.remove();
			},
		);
	};

	return $el;
}

async function loadAd(el) {
	if (!IS_FREE_VERSION) return;
	try {
		if (!(await window.iad?.isLoaded())) {
			const oldText = el.textContent;
			el.textContent = strings["loading..."];
			await window.iad.load();
			el.textContent = oldText;
		}
	} catch (error) {}
}

async function uninstall(id) {
	try {
		const pluginDir = Url.join(PLUGIN_DIR, id);
		await Promise.all([loadAd(this), fsOperation(pluginDir).delete()]);
		acode.unmountPlugin(id);
		if (!IS_FREE_VERSION && (await window.iad?.isLoaded())) {
			window.iad.show();
		}
	} catch (err) {
		helpers.error(err);
	}
}

async function more_plugin_action(id, pluginName) {
	let actions;
	let pluginSettings = settings.uiSettings[`plugin-${id}`];
	if (pluginSettings) {
		actions = [strings.settings, strings.uninstall];
	} else {
		actions = [strings.uninstall];
	}
	let action = await select("Action", actions);
	if (!action) return;
	switch (action) {
		case strings.settings:
			pluginSettings.setTitle(pluginName);
			pluginSettings.show();
			break;
		case strings.uninstall:
			await uninstall(id);
			const $plugin = $installed.querySelector(`[data-plugin-id="${id}"]`);
			$plugin.remove();
			break;
	}
}
