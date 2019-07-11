import WidgetBase from '@dojo/framework/core/WidgetBase';
import {v, w} from '@dojo/framework/core/vdom';

import * as css from './App.m.css';
import watch from "@dojo/framework/core/decorators/watch";
import Button from "@dojo/widgets/button";
import Label from "@dojo/widgets/label";
import TextInput from "@dojo/widgets/text-input";

export default class App extends WidgetBase {
	@watch()
	private values = {
		required: 'Initial',
		validated: 'ABCD'
	};

	@watch()
	private valid: { [index: string]: { valid: boolean | undefined, message?: string } } = {
		required: { valid: true },
		validated: { valid: true }
	};
	@watch()
	private editedValues: undefined | { required: string, validated: string } = undefined;


	protected render() {
		return v('div', { classes: [css.root] }, [
			v('div', [
				w(Label, { forId: 'required' }, ['Required Input:']),
				w(TextInput, {
					widgetId: 'required',
					required: true,
					onInput: value => {
						this.editedValues = {
							...this.values,
							...this.editedValues,
							required: value as string
						};
					},
					value: this.editedValues ? this.editedValues.required : this.values.required,
					valid: this.valid.required,
					onValidate: (valid, message) => {
						this.valid = {
							...this.valid,
							required: {valid, message}
						};
					}
				})
			]),
			v('div', [
				w(Label, { forId: 'validated' }, ['Validated Input:']),
				w(TextInput, {
					widgetId: 'validated',
					customValidator: (value) =>
						value.length < 5 ? { valid: true } : { valid: false, message: 'Value must be fewer than five characters'},
					onInput: value => {
						this.editedValues = {
							...this.values,
							...this.editedValues,
							validated: value as string
						};
					},
					value: this.editedValues ? this.editedValues.validated : this.values.validated,
					valid: this.valid.validated,
					onValidate: (valid, message) => {
						this.valid = {
							...this.valid,
							validated: {valid, message}
						};
					}
				})
			]),
			w(Button, {
				onClick: () => {
					this.editedValues = undefined;
				}
			}, ['Restore values'])
		]);
	}
}
