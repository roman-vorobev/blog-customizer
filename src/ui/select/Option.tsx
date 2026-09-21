import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
	disabled?: boolean;
	selected?: boolean;
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className },
		onClick,
		disabled = false,
		selected = false,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			if (disabled) return;
			onClick(clickedValue);
		};

	useEnterOptionSubmit({
		optionRef,
		value,

		onClick: disabled ? () => {} : onClick,
	});

	return (
		<li
			className={clsx(styles.option, styles[optionClassName || ''], {
				[styles.disabled]: disabled,
			})}
			value={value}
			onClick={handleClick(value)}
			tabIndex={disabled ? -1 : 0}
			data-testid={`select-option-${value}`}
			data-selected={selected ? 'true' : 'false'}
			aria-selected={selected}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};
