import { assign } from '@dojo/core/lang';
import uuid from '@dojo/core/uuid';
import { v } from '@dojo/widget-core/d';
import { DNode, WNode } from '@dojo/widget-core/interfaces';
import WidgetBase from '@dojo/widget-core/WidgetBase';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import TitlePane, { TitlePaneProperties } from '../titlepane/TitlePane';

import * as css from './styles/accordion.css';

export interface AccordionProperties extends ThemeableProperties {
	exclusive?: boolean;
};

export const AccordionBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class Accordion extends AccordionBase<AccordionProperties> {
	render(this: Accordion): DNode {
		const self = this;
		// TODO: how do you type check widgets?
		const children = this.children.filter(function (child: DNode) {
			return (<WNode> child).factory === 'TitlePane' ||
				((<any> child).factory && (<any> child).factory.name === 'TitlePane');
		});

		children.forEach(function (child: any) {
			if (!child.properties.key) {
				child.properties.key = uuid();
			}

			child.properties.onRequestClose = self._handleChildClose.bind(self);
			child.properties.onRequestOpen = self._handleChildOpen.bind(self);
		});

		return v('div', {
			classes: this.classes(css.root)
		}, children);
	}

	_handleChildClose(child: TitlePane) {
		const closedProperties: TitlePaneProperties = assign({}, child.properties);

		closedProperties.open = false;
		child.setProperties(closedProperties);
		this.invalidate();
	}

	_handleChildOpen(child: TitlePane) {
		const {
			exclusive = false
		} = this.properties;
		const closedProperties: TitlePaneProperties = assign({}, child.properties);
		const openProperties: TitlePaneProperties = assign({}, child.properties);

		closedProperties.open = false;
		openProperties.open = true;

		// TODO: how to enforce exclusive?
		/*if (exclusive) {
			this.children.forEach(function (currentChild: DNode) {
				if (currentChild !== child) {
					currentChild.setProperties(closedProperties);
				}
			});
		}*/

		child.setProperties(openProperties);
		this.invalidate();
	}
}
