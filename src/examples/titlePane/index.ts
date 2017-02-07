import createWidgetBase from '@dojo/widget-core/createWidgetBase';
import { w, v } from '@dojo/widget-core/d';
import { DNode, Widget, WidgetProperties } from '@dojo/widget-core/interfaces';
import createProjectorMixin from '@dojo/widget-core/mixins/createProjectorMixin';
import internalState, { InternalState } from '@dojo/widget-core/mixins/internalState';
import createTitlePane from '../../components/titlePane/createTitlePane';

type Root = Widget<WidgetProperties> & InternalState;

const createApp = createWidgetBase
.mixin(internalState)
.mixin({
	mixin: {
		getChildrenNodes: function(this: Root): DNode[] {
			return [
				w(createTitlePane, {
					id: 'titlePane1',
					title: 'Title Pane Widget With collapsible=false',
					collapsible: false,
					onRequestCollapse: () => {
						alert('onRequestCollapse should never get called');
					},
					onRequestExpand: () => {
						alert('onRequestExpand should never get called');
					}
				}, [
					v('div', {
						innerHTML: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Quisque id purus ipsum. Aenean ac purus purus.
							Nam sollicitudin varius augue, sed lacinia felis tempor in.`
					})
				]),
				w(createTitlePane, {
					id: 'titlePane2',
					title: 'Title Pane Widget (collapsible)',
					collapsed: <boolean> this.state['t2collapsed'],
					onRequestCollapse: () => {
						this.setState({ t2collapsed: true });
					},
					onRequestExpand: () => {
						this.setState({ t2collapsed: false });
					}
				}, [
					v('div', {
						innerHTML: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Quisque id purus ipsum. Aenean ac purus purus.
							Nam sollicitudin varius augue, sed lacinia felis tempor in.`
					})
				]),
				w(createTitlePane, {
					id: 'titlePane3',
					title: 'Title Pane Widget with collapsed=true',
					collapsed: <boolean> (this.state['t3collapsed'] === undefined ? true : this.state['t3collapsed']),
					onRequestCollapse: () => {
						this.setState({ t3collapsed: true });
					},
					onRequestExpand: () => {
						this.setState({ t3collapsed: false });
					}
				}, [
					v('div', {
						innerHTML: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Quisque id purus ipsum. Aenean ac purus purus.
							Nam sollicitudin varius augue, sed lacinia felis tempor in.`
					})
				])
			];
		},
		classes: [ 'main-app' ],
		tagName: 'main'
	}
});

createApp.mixin(createProjectorMixin)({
	cssTransitions: true
}).append().then(() => {
	console.log('projector is attached');
});