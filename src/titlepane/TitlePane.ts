import uuid from '@dojo/core/uuid';
import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';

import * as css from './styles/titlePane.css';

/**
 * @type TitlePaneProperties
 *
 * Properties that can be set on a TitlePane component
 *
 * @property closeable          If false the pane will not collapse in response to clicking the title
 * @property headingLevel       'aria-heading-level' for the title's DOM node
 * @property open               If true the pane is opened and content is visible
 * @property title              Title to display above the content
 * @property onRequestClos      Called when the title of an open pane is clicked
 * @property onRequestOpen      Called when the title of a closed pane is clicked
 */
export interface TitlePaneProperties extends ThemeableProperties {
	closeable?: boolean;
	headingLevel?: number;
	open?: boolean;
	title: string;
	onRequestClose?(titlePane: TitlePane): void;
	onRequestOpen?(titlePane: TitlePane): void;
};

export const TitlePaneBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class TitlePane extends TitlePaneBase<TitlePaneProperties> {
	private _afterRender(element: HTMLElement) {
		// Conditionally adjust top margin. Done manually instead of through Maquette
		// so the underlying DOM is accessible, as we need to know the content height.
		// Put in a timeout to push this operation to the next tick, otherwise
		// element.offsetHeight below can be incorrect (e.g. before styling is applied)
		setTimeout(() => {
			const { open = true } = this.properties;
			const height = element.offsetHeight;
			element.style.marginTop = open ? '0px' : `-${ height }px`;
		}, 0);
	}

	private _onTitleClick() {
		this._toggle();
	}

	private _onTitleKeyUp(event: KeyboardEvent) {
		if (event.keyCode === /* enter */ 13 ||
			event.keyCode === /* space */ 32) {
				this._toggle();
		}
	}

	private _toggle() {
		const {
			open = true,
			onRequestClose,
			onRequestOpen
		} = this.properties;

		if (open) {
			onRequestClose && onRequestClose(this);
		}
		else {
			onRequestOpen && onRequestOpen(this);
		}
	}

	protected onElementCreated(element: HTMLElement, key: string) {
		key === 'content' && this._afterRender(element);
	}

	protected onElementUpdated(element: HTMLElement, key: string) {
		key === 'content' && this._afterRender(element);
	}

	render(): DNode {
		const {
			headingLevel,
			closeable = true,
			open = true,
			title
		} = this.properties;

		const contentId = uuid();
		const titleId = uuid();

		return v('div', {
			classes: this.classes(css.main)
		}, [
			v('div', {
				'aria-level': headingLevel ? String(headingLevel) : '',
				classes: this.classes(css.title, closeable ? css.closeable : null),
				onclick: closeable ? this._onTitleClick : undefined,
				onkeyup: closeable ? this._onTitleKeyUp : undefined,
				role: 'heading'
			}, [
				v('div', {
					'aria-controls': contentId,
					'aria-disabled': String(!closeable),
					'aria-expanded': String(open),
					id: titleId,
					role: 'button',
					tabIndex: closeable ? 0 : -1
				}, [ title ])
			]),
			v('div', {
				'aria-labelledby': titleId,
				classes: this.classes(css.content),
				id: contentId,
				key: 'content'
			}, this.children)
		]);
	}
}
