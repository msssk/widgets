import uuid from '@dojo/core/uuid';
import { v } from '@dojo/widget-core/d';
import { DNode, WNode } from '@dojo/widget-core/interfaces';
import WidgetBase from '@dojo/widget-core/WidgetBase';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';

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
		});

		return v('div', {
			classes: this.classes(css.root)
		}, children);
	}

	_handleChildClose() {
		console.dir(arguments);
	}
}
