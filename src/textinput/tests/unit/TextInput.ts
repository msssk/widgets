import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import * as Test from 'intern/lib/Test';

import has from '@dojo/has/has';
import harness, { Harness } from '@dojo/test-extras/harness';
import { v } from '@dojo/widget-core/d';

import TextInput, { TextInputProperties } from '../../TextInput';
import * as css from '../../styles/textinput.m.css';

let widget: Harness<TextInputProperties, typeof TextInput>;

registerSuite({
	name: 'TextInput',

	beforeEach() {
		widget = harness(TextInput);
	},

	afterEach() {
		widget.destroy();
	},

	simple() {
		widget.expectRender(v('div', {
			classes: widget.classes(css.root)
		}, [
			v('div', { classes: widget.classes(css.inputWrapper) }, [
				v('input', {
					'aria-controls': undefined,
					'aria-describedby': undefined,
					'aria-invalid': null,
					'aria-readonly': null,
					bind: true,
					classes: widget.classes(css.input),
					disabled: undefined,
					maxlength: null,
					minlength: null,
					name: undefined,
					placeholder: undefined,
					readOnly: undefined,
					required: undefined,
					type: 'text',
					value: undefined,
					onblur: widget.listener,
					onchange: widget.listener,
					onclick: widget.listener,
					onfocus: widget.listener,
					oninput: widget.listener,
					onkeydown: widget.listener,
					onkeypress: widget.listener,
					onkeyup: widget.listener,
					onmousedown: widget.listener,
					onmouseup: widget.listener,
					ontouchstart: widget.listener,
					ontouchend: widget.listener,
					ontouchcancel: widget.listener
				})
			])
		]));
	},

	'properties and attributes'() {
		const properties = {
			controls: 'foo',
			describedBy: 'bar',
			disabled: true,
			formId: 'baz',
			invalid: true,
			maxLength: 10,
			minLength: 5,
			name: 'qux',
			placeholder: 'xyx',
			readOnly: true,
			required: true,
			type: 'email',
			value: 'zxz'
		};
		const expected = v('div', {
			classes: widget.classes(css.root, css.disabled, css.invalid, css.readonly, css.required)
		}, [
			v('div', { classes: widget.classes(css.inputWrapper) }, [
				v('input', {
					'aria-controls': properties.controls,
					'aria-describedby': properties.describedBy,
					'aria-invalid': 'true',
					'aria-readonly': 'true',
					bind: true,
					classes: widget.classes(css.input),
					disabled: properties.disabled,
					maxlength: String(properties.maxLength),
					minlength: String(properties.minLength),
					name: properties.name,
					placeholder: properties.placeholder,
					readOnly: properties.readOnly,
					required: properties.required,
					type: properties.type,
					value: properties.value,
					onblur: widget.listener,
					onchange: widget.listener,
					onclick: widget.listener,
					onfocus: widget.listener,
					oninput: widget.listener,
					onkeydown: widget.listener,
					onkeypress: widget.listener,
					onkeyup: widget.listener,
					onmousedown: widget.listener,
					onmouseup: widget.listener,
					ontouchstart: widget.listener,
					ontouchend: widget.listener,
					ontouchcancel: widget.listener
				})
			])
		]);

		widget.setProperties(<any> properties);
		widget.expectRender(expected);
	}/*,

	'correct node attributes'() {
		const textinput = new TextInput();
		textinput.__setProperties__({
			describedBy: 'id1',
			disabled: true,
			formId: 'id2',
			invalid: true,
			label: 'foo',
			maxLength: 50,
			minLength: 5,
			name: 'bar',
			placeholder: 'baz',
			readOnly: true,
			required: true,
			type: 'number',
			value: 'qux'
		});
		const vnode = <VNode> textinput.__render__();
		const labelNode = vnode.children![0];
		const inputNode = vnode.children![1].children![0];

		assert.strictEqual(inputNode.properties!['aria-describedby'], 'id1');
		assert.isTrue(inputNode.properties!.disabled);
		assert.strictEqual(inputNode.properties!['aria-invalid'], 'true');
		assert.strictEqual(inputNode.properties!.maxlength, '50');
		assert.strictEqual(inputNode.properties!.minlength, '5');
		assert.strictEqual(inputNode.properties!.name, 'bar');
		assert.strictEqual(inputNode.properties!.placeholder, 'baz');
		assert.isTrue(inputNode.properties!.readOnly);
		assert.strictEqual(inputNode.properties!['aria-readonly'], 'true');
		assert.isTrue(inputNode.properties!.required);
		assert.strictEqual(inputNode.properties!.type, 'number');
		assert.strictEqual(inputNode.properties!.value, 'qux');

		assert.strictEqual(vnode.properties!['form'], 'id2');
		assert.strictEqual(labelNode.properties!.innerHTML, 'foo');
	},

	'invalid state'() {
		const textinput = new TextInput();
		textinput.__setProperties__({
			label: 'foo',
			invalid: true
		});
		let vnode = <VNode> textinput.__render__();

		assert.isTrue(vnode.properties!.classes![css.invalid]);

		textinput.__setProperties__({
			label: 'foo',
			invalid: false
		});
		vnode = <VNode> textinput.__render__();
		assert.isTrue(vnode.properties!.classes![css.valid]);
		assert.isFalse(vnode.properties!.classes![css.invalid]);

		textinput.__setProperties__({
			label: 'foo',
			invalid: undefined
		});
		vnode = <VNode> textinput.__render__();
		assert.isFalse(vnode.properties!.classes![css.valid]);
		assert.isFalse(vnode.properties!.classes![css.invalid]);
	}*/,

	events() {
		let blurred = false;
		let changed = false;
		let clicked = false;
		let focused = false;
		let input = false;
		let keydown = false;
		let keypress = false;
		let keyup = false;
		let mousedown = false;
		let mouseup = false;

		widget.setProperties({
			onBlur: () => { blurred = true; },
			onChange: () => { changed = true; },
			onClick: () => { clicked = true; },
			onFocus: () => { focused = true; },
			onInput: () => { input = true; },
			onKeyDown: () => { keydown = true; },
			onKeyPress: () => { keypress = true; },
			onKeyUp: () => { keyup = true; },
			onMouseDown: () => { mousedown = true; },
			onMouseUp: () => { mouseup = true; }
		});

		widget.sendEvent('blur', { selector: 'input' });
		assert.isTrue(blurred, 'blur event should be handled');
		widget.sendEvent('change', { selector: 'input' });
		assert.isTrue(changed, 'change event should be handled');
		widget.sendEvent('click', { selector: 'input' });
		assert.isTrue(clicked, 'click event should be handled');
		widget.sendEvent('focus', { selector: 'input' });
		assert.isTrue(focused, 'focus event should be handled');
		widget.sendEvent('input', { selector: 'input' });
		assert.isTrue(input, 'input event should be handled');
		widget.sendEvent('keydown', { selector: 'input' });
		assert.isTrue(keydown, 'keydown event should be handled');
		widget.sendEvent('keypress', { selector: 'input' });
		assert.isTrue(keypress, 'keypress event should be handled');
		widget.sendEvent('keyup', { selector: 'input' });
		assert.isTrue(keyup, 'keyup event should be handled');
		widget.sendEvent('mousedown', { selector: 'input' });
		assert.isTrue(mousedown, 'mousedown event should be handled');
		widget.sendEvent('mouseup', { selector: 'input' });
		assert.isTrue(mouseup, 'mouseup event should be handled');
	},

	'touch events'(this: Test) {
		// TODO: this should be centralized & standardized somewhere
		const hasTouch = has('host-node') || 'ontouchstart' in document ||
			('onpointerdown' in document && navigator.maxTouchPoints > 0);

		if (!hasTouch) {
			this.skip('Touch events not supported');
		}

		let touchstart = false;
		let touchend = false;
		let touchcancel = false;

		widget.setProperties({
			onTouchStart: () => { touchstart = true; },
			onTouchEnd: () => { touchend = true; },
			onTouchCancel: () => { touchcancel = true; }
		});

		widget.sendEvent('touchcancel', { selector: 'input' });
		assert.isTrue(touchcancel);
		widget.sendEvent('touchend', { selector: 'input' });
		assert.isTrue(touchend);
		widget.sendEvent('touchstart', { selector: 'input' });
		assert.isTrue(touchstart);
	}
});
