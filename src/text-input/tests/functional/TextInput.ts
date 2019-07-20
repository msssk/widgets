const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

import { Remote } from 'intern/lib/executors/Node';
import { services } from '@theintern/a11y';
import pollUntilTruthy from '@theintern/leadfoot/helpers/pollUntilTruthy';
import * as css from '../../../theme/text-input.m.css';
import * as baseCss from '../../../common/styles/base.m.css';
import { uuid } from '@dojo/framework/core/util';

const axe = services.axe;
const CLICK_WAIT_TIMEOUT = 500;

function getPage(remote: Remote) {
	return remote
		.get(`http://localhost:9000/dist/dev/src/common/example/?id=${uuid()}#text-input`)
		.setFindTimeout(5000);
}

registerSuite('TextInput', {
	'TextInput should be visible'() {
		return getPage(this.remote)
			.findByCssSelector(`#example-text .${css.root}`)
			.isDisplayed()
			.findByCssSelector(`.${css.input}`)
			.getSize()
			.then(({ height, width }) => {
				assert.isAbove(height, 0, 'The height of the input should be greater than zero.');
				assert.isAbove(width, 0, 'The width of the input should be greater than zero.');
			});
	},

	'TextInput label should be as defined'() {
		return getPage(this.remote)
			.findByCssSelector(`#example-text .${css.root}`)
			.getVisibleText()
			.then((text) => {
				assert.strictEqual(text, 'Name');
			});
	},

	'TextInput should gain focus when clicking on the label'() {
		const {
			remote: {
				session: {
					capabilities: { browserName }
				}
			}
		} = this;

		return getPage(this.remote)
			.findByCssSelector(`#example-text .${css.root} label`)
			.then((element) => {
				if (browserName === 'firefox') {
					return this.remote.moveMouseTo(element, 5, 5).clickMouseButton(0);
				} else {
					return element.click();
				}
			})
			.then(
				pollUntilTruthy(
					function(rootClass, inputClass) {
						const inputNode = document.querySelector(
							'#example-text .' + rootClass + ' .' + inputClass
						);

						return document.activeElement === inputNode ? true : null;
					},
					[css.root, css.input],
					CLICK_WAIT_TIMEOUT,
					20
				)
			)
			.then((isEqual) => {
				assert.isTrue(isEqual);
			});
	},

	'TextInput should allow input to be typed'() {
		const testInput = 'test text';
		return getPage(this.remote)
			.findByCssSelector(`#example-validated .${css.input}`)
			.type(testInput)
			.getProperty('value')
			.then((value: string) => {
				assert.strictEqual(value, testInput);
			});
	},

	'Hidden label should not be displayed'() {
		return getPage(this.remote)
			.findByCssSelector(`#example-hidden-label .${css.root}`)
			.getVisibleText()
			.then((text) => {
				assert.isTrue(text && text.length > 0);
			})
			.findByCssSelector(`.${baseCss.visuallyHidden}`)
			.then((element) => {
				assert(element, 'element with specified class "visuallyHidden" should exist.`');
			});
	},

	'Disabled TextInput should not allow input to be typed'() {
		const initValue = 'Initial value';
		return getPage(this.remote)
			.findByCssSelector(`#example-disabled .${css.root} .${css.input}`)
			.click()
			.then(null, () => {})
			.type('text')
			.then(null, () => {})
			.getProperty('value')
			.then((value: string) => {
				assert.strictEqual(value, initValue);
			});
	},

	'Validated TextInput should update style based on validity'() {
		const validText = 'foo';
		const invalidText = 'foobar';

		return getPage(this.remote)
			.findByCssSelector(`#example-validated .${css.root}`)
			.getAttribute('class')
			.then((className: string) => {
				assert.notInclude(className, css.invalid);
				assert.notInclude(className, css.valid);
			})
			.findByCssSelector(`.${css.input}`)
			.click()
			.type(validText)
			.end()
			.findByCssSelector(`.${css.valid}`)
			.getAttribute('class')
			.then((className: string) => {
				assert.notInclude(className, css.invalid);
			})
			.findByCssSelector(`.${css.input}`)
			.type(invalidText)
			.end()
			.findByCssSelector(`.${css.invalid}`)
			.getAttribute('class')
			.then((className: string) => {
				assert.notInclude(className, css.valid);
			});
	},

	'check accessibility'() {
		return getPage(this.remote).then(axe.createChecker());
	}
});
