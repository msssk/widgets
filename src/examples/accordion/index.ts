import { WidgetBase, WidgetProperties } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { StatefulMixin } from '@dojo/widget-core/mixins/Stateful';
import Accordion from '../../components/accordion/Accordion';
import TitlePane from '../../components/titlePane/TitlePane';

export class App extends StatefulMixin(WidgetBase)<WidgetProperties> {
	render() {
		return [
			w(Accordion, {
				id: 'accordion'
			}, [
				w(TitlePane, {
					title: 'Pane One'
				}, [
					v('div', {
						innerHTML: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Quisque id purus ipsum. Aenean ac purus purus.
							Nam sollicitudin varius augue, sed lacinia felis tempor in.`
					})
				]),
				w(TitlePane, {
					title: 'Pane Two'
				}, [
					v('div', {
						innerHTML: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Quisque id purus ipsum. Aenean ac purus purus.
							Nam sollicitudin varius augue, sed lacinia felis tempor in.`
					})
				])
			])
		];
	}
}

const Projector = ProjectorMixin(App);
const projector = new Projector({});

projector.append();
