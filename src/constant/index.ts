export interface CustomIconComponents {
	ValidIcon: React.ReactNode
	InvalidIcon: React.ReactNode
}

export interface PasswordProps {
	value: string
	valueAgain?: string
	minLength?: number
	maxLength?: number
    specialCharLength?: number
    numberLength?: number
	capitalLength?: number
	lowerCaseLength?: number
	iconSize?: number
	validColor?: string
	invalidColor?: string
	onChange?: (isValid: boolean) => any
	messages?: {
		[key in RuleNames]?: string
	}
	iconComponents?: CustomIconComponents
}

export interface ReactPasswordChecklistProps extends PasswordProps {
	className?: string
	style?: React.CSSProperties
	rules: Array<RuleNames>
    rtl?: boolean
}

export interface RuleProps {
	valid: boolean
	iconSize?: number
	iconComponents?: CustomIconComponents
	validColor?: string
	invalidColor?: string
}

export type RuleNames =
| "minLength"
| "maxLength"
| "specialChar"
| "number"
| "capital"
| "match"
| "lowercase"
| "notEmpty"
