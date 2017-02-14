import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';

import * as css from './styles/accordion.css';

export interface AccordionProperties extends ThemeableProperties {
	// TODO: should accordion handle exclusive open state?
};

export const AccordionBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class Accordion extends AccordionBase<AccordionProperties> {
	render(): DNode {
		// TODO: should accordion assign keys to children, or should the already be assigned?
		return v('div', {
			classes: css.accordion
		}, this.children);
	}
}
