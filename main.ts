import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface EnchiridionSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: EnchiridionSettings = {
	mySetting: 'default'
}

export default class Enchiridion extends Plugin {
	settings: EnchiridionSettings;

	/**
	 * Runs whenever the plugin starts being used.
	 */
	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new EnchiridionSettingsTab(this.app, this));
	}

	/**
	 * Runs whenever the plugin is disabled.
	 */
	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class EnchiridionSettingsTab extends PluginSettingTab {
	plugin: Enchiridion;

	constructor(app: App, plugin: Enchiridion) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
