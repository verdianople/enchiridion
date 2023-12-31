import {FuzzyMatch, FuzzySuggestModal, Notice, TFile} from 'obsidian';
import Enchiridion from '../main';
import {getTracked} from './files';

export default class Search extends FuzzySuggestModal<TFile>{
	plugin: Enchiridion;
	constructor(plugin: Enchiridion) {
		super(plugin.app);
		this.plugin = plugin;
	}
	getItemText(item: TFile): string {
		return item.basename;
	}

	getItems(): Array<TFile> {
		return getTracked(this.plugin);
	}

	onChooseItem(item: TFile): void {
		new Notice(`Selected ${item.basename}`)
	}

	renderSuggestion(match: FuzzyMatch<TFile>, el: HTMLElement) {
		const cache = this.plugin.app.metadataCache.getFileCache(match.item) || {};
		el.createEl('div', {text: match.item.basename})
		// @ts-ignore
		el.createEl('small', {text: cache?.frontmatter.type})
	}
}
