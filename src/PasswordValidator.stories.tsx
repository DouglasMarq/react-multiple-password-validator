import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions"
import PasswordValidator from "./index";
import { RuleNames } from "./constant";

import { withKnobs, text, number, array, boolean } from "@storybook/addon-knobs";
import { getDirection } from "@pxblue/storybook-rtl-addon";

storiesOf("PasswordValidator", module)
	.addDecorator(withKnobs)
	.add("Default", () => (
		<PasswordValidator
			value={text("Password", "")}
			valueAgain={text("Password Again", "")}
			minLength={number("Minimum Length", 8)}
			maxLength={number("Maximum Length", 16)}
			specialCharLength={number("Special Char Length", 2)}
			numberLength={number("number Length", 2)}
			capitalLength={number("capital Length", 2)}
			lowerCaseLength={number("lowercase Length", 2)}
			onChange={action("onChange")}
            rtl={boolean('rtl', getDirection() == 'rtl')}
			rules={
				array("Rules", [
					"minLength",
					"specialChar",
					"number",
					"capital",
					"match",
					"notEmpty",
					"maxLength",
					"lowercase",
				]) as Array<RuleNames>
			}
		/>
	))
	.add("Custom Messages", () => (
		<PasswordValidator
			value={text("Password", "")}
			valueAgain={text("Password Again", "")}
			minLength={number("Minimum Length", 8)}
			onChange={action("onChange")}
            rtl={boolean('rtl', getDirection() == 'rtl')}
			rules={
				array("Rules", [
					"minLength",
					"specialChar",
					"number",
					"capital",
					"match",
				]) as Array<RuleNames>
			}
			messages={{
				minLength: "La contraseña tiene más de 8 caracteres.",
				specialChar: "La contraseña tiene caracteres especiales.",
				number: "La contraseña tiene un número.",
				capital: "La contraseña tiene una letra mayúscula.",
				match: "Las contraseñas coinciden.",
			}}
		/>
	)).add("Custom Messages RTL (Persian)", () => (
		<PasswordValidator
			value={text("Password", "")}
			valueAgain={text("Password Again", "")}
			minLength={8}
			onChange={action("onChange")}
            rtl={true}
			rules={
				array("Rules", [
					"minLength",
					"specialChar",
					"number",
					"capital",
				]) as Array<RuleNames>
			}
			messages={{
				minLength: "رمز عبور باید حداقل ۸ کارکتر باشد.",
				specialChar: "رمز عبور باید شامل کاراکترهای خاص (نمادها) باشد",
				number: "رمز عبور باید شامل اعداد باشد ",
				capital: "رمز عبور باید ترکیبی از حروف کوچک و بزرگ باشد.",
			}}
		/>
	))
