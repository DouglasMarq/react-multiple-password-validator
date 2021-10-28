import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { ReactPasswordChecklistProps, RuleProps, RuleNames } from './constant';

const ReactPasswordProps: React.FC<ReactPasswordChecklistProps> = ({
	className,
	style,
	rules,
	value,
	valueAgain,
	minLength,
	maxLength,
    specialCharLength,
    numberLength,
    capitalLength,
    lowerCaseLength,
    rtl,
	onChange,
	messages = {},
	...remainingProps
}) => {
	const [isValid, setIsValid] = useState(false);
	const ruleDefinitions: {
		[key in RuleNames]: { valid: boolean; message: string, length?: number | null }
	} = {
		minLength: {
			valid: value.length >= (minLength || 100),
			message: messages.minLength || `Password has more than ${minLength} characters.`,
		},
		specialChar: {
			valid: (value.length - value.replace(/[~`!#$%\^&*@+=\-\[\]\\';,/{}|\\":<>\?\.]/g, '').length) >= (specialCharLength || 100),
			message: messages.specialChar || `Password has more than ${specialCharLength} special characters.`,
            length: specialCharLength || null,
        },
		number: {
			valid: (value.length - value.replace(/\d/g, '').length) >= (numberLength || 100),
			message: messages.number || `Password has more than ${numberLength || 0} numbers.`,
            length: numberLength || null,
        },
		capital: {
			valid: (() => {
				if (value.length === 0) return false

				if ((value.length - value.replace(/[A-Z]/g, '').length) >= (capitalLength || 0)) return true;

				return false
			})(),
			message: messages.capital || `Password has more than ${capitalLength} capital letters.`,
            length: capitalLength || null,
		},
		match: {
			valid: value.length > 0 && value === valueAgain,
			message: messages.match || "Passwords match.",
		},
		lowercase: {
			valid: (() => {
				if (value.length === 0) return false

                if ((value.length - value.replace(/[a-z]/g, '').length) >= (lowerCaseLength || 0)) return true;

				return false
			})(),
			message: messages.lowercase || `Password has more than ${lowerCaseLength || 0} lowercase letters.`,
            length: lowerCaseLength || null,
        },
		maxLength: {
			valid: value.length <= (maxLength || 16),
			message: messages.maxLength || `Password has no more than ${maxLength} characters.`,
		},
		notEmpty: {
			valid: Boolean(value.length > 0 && valueAgain && valueAgain.length > 0),
			message: messages.notEmpty || "Password fields are not empty.",
		},
	}
	const enabledRules = rules.filter((rule: any) => Boolean(ruleDefinitions[rule]))
	useEffect(() => {
		if (enabledRules.every((rule: any) => ruleDefinitions[rule].valid)) {
			setIsValid(true)
		} else {
			setIsValid(false)
		}
	}, [value, valueAgain])
	useEffect(() => {
		if (typeof onChange === "function") {
			onChange(isValid)
		}
	}, [isValid])

    if (rtl){
        className = className ? className + ' rtl' : 'rtl';
    }

	return (
		<UL className={className} style={style}>
			{enabledRules.map((rule: any) => {
				const { message, valid, length } = ruleDefinitions[rule];
                if(length === null) return;
				return (
					<Rule key={rule} valid={valid} {...remainingProps}>
						{message}
					</Rule>
				)
			})}
		</UL>
	)
}


const Rule: React.FC<RuleProps> = ({
	valid,
	iconSize,
	validColor,
	invalidColor,
	iconComponents,
	children,
}) => {
	return (
		<LI className={valid ? "valid" : "invalid"}>
			{iconComponents ? (
				valid ? (
					iconComponents.ValidIcon
				) : (
					iconComponents.InvalidIcon
				)
			) : (
				<Svg
					className="checklist-icon"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					width={iconSize}
					height={iconSize}
					viewBox="0 0 512 512"
				>
					<path
						fill={valid ? validColor : invalidColor}
						d={
							valid
								? "M432 64l-240 240-112-112-80 80 192 192 320-320z"
								: "M507.331 411.33c-0.002-0.002-0.004-0.004-0.006-0.005l-155.322-155.325 155.322-155.325c0.002-0.002 0.004-0.003 0.006-0.005 1.672-1.673 2.881-3.627 3.656-5.708 2.123-5.688 0.912-12.341-3.662-16.915l-73.373-73.373c-4.574-4.573-11.225-5.783-16.914-3.66-2.080 0.775-4.035 1.984-5.709 3.655 0 0.002-0.002 0.003-0.004 0.005l-155.324 155.326-155.324-155.325c-0.002-0.002-0.003-0.003-0.005-0.005-1.673-1.671-3.627-2.88-5.707-3.655-5.69-2.124-12.341-0.913-16.915 3.66l-73.374 73.374c-4.574 4.574-5.784 11.226-3.661 16.914 0.776 2.080 1.985 4.036 3.656 5.708 0.002 0.001 0.003 0.003 0.005 0.005l155.325 155.324-155.325 155.326c-0.001 0.002-0.003 0.003-0.004 0.005-1.671 1.673-2.88 3.627-3.657 5.707-2.124 5.688-0.913 12.341 3.661 16.915l73.374 73.373c4.575 4.574 11.226 5.784 16.915 3.661 2.080-0.776 4.035-1.985 5.708-3.656 0.001-0.002 0.003-0.003 0.005-0.005l155.324-155.325 155.324 155.325c0.002 0.001 0.004 0.003 0.006 0.004 1.674 1.672 3.627 2.881 5.707 3.657 5.689 2.123 12.342 0.913 16.914-3.661l73.373-73.374c4.574-4.574 5.785-11.227 3.662-16.915-0.776-2.080-1.985-4.034-3.657-5.707z"
						}
					/>
				</Svg>
			)}
			<span>{children}</span>
		</LI>
	)
}

const UL = styled.ul`
	margin: 0;
	padding: 0;
    &.rtl svg {
        margin-left: 5px;
        margin-right: 0;
    }
`
const LI = styled.li`
	list-style-type: none;
	display: flex;
	align-items: center;
	margin: 2px 0;
	& > span {
		padding-top: 2px;
		opacity: ${(props) => (props.className === "valid" ? 1 : 0.5)};
	}
`
const Svg = styled.svg`
    margin-right: 5px;
`

ReactPasswordProps.defaultProps = {
	iconSize: 18,
	validColor: "#4BCA81",
	invalidColor: "#FF0033",
}

export default ReactPasswordProps
