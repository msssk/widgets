import { v, w } from '@dojo/widget-core/d';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { StatefulMixin } from '@dojo/widget-core/mixins/Stateful';
import Accordion from '../../accordion/Accordion';
import TitlePane from '../../titlePane/TitlePane';

export class App extends StatefulMixin(WidgetBase)<WidgetProperties> {
	render() {
		return v('div', {
			styles: {
				margin: '20px',
				width: '500px'
			}
		}, [
			w(Accordion, {
				exclusive: true
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
				v('div', {
					innerHTML: 'I will be ignored because I am not a TitlePane'
				}),
				w(TitlePane, {
					title: 'Pane Two'
				}, [
					v('div', {
						innerHTML: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Quisque id purus ipsum. Aenean ac purus purus.
							Nam sollicitudin varius augue, sed lacinia felis tempor in.`
					})
				]),
				w(TitlePane, {
					title: 'Pane Three'
				}, [
					v('div', {
						innerHTML: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Quisque id purus ipsum. Aenean ac purus purus.
							Nam sollicitudin varius augue, sed lacinia felis tempor in.`
					})
				]),
				w(TitlePane, {
					title: 'Pane Four'
				}, [
					v('div', {
						innerHTML: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Quisque id purus ipsum. Aenean ac purus purus.
							Nam sollicitudin varius augue, sed lacinia felis tempor in.`
					})
				])
			])
		]);
	}
}

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append();
