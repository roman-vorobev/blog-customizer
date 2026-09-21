import React from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	OptionType,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	fontColors,
	contentWidthArr,
} from 'src/constants/articleProps';

interface FormProps {
	formState: ArticleStateType;
	setFormState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

const Form = ({ formState, setFormState }: FormProps) => {
	const handleChange = (key: keyof ArticleStateType) => (value: OptionType) => {
		setFormState((prev) => ({
			...prev,
			[key]: value,
		}));
	};
	const disabledTextColors = [formState.backgroundColor.value];

	const disabledBgColors = [formState.fontColor.value];

	return (
		<>
			<Text size={31} weight={800} uppercase align='left'>
				Задайте параметры
			</Text>

			<Select
				title='Шрифт'
				options={fontFamilyOptions}
				selected={formState.fontFamilyOption}
				onChange={handleChange('fontFamilyOption')}
			/>

			<RadioGroup
				name='fontSize'
				title='Размер шрифта'
				options={fontSizeOptions}
				selected={formState.fontSizeOption}
				onChange={handleChange('fontSizeOption')}
			/>

			<Select
				title='Цвет шрифта'
				options={fontColors}
				selected={formState.fontColor}
				onChange={handleChange('fontColor')}
				disabledValues={disabledTextColors}
			/>

			<Separator />

			<Select
				title='Цвет фона'
				options={backgroundColors}
				selected={formState.backgroundColor}
				onChange={handleChange('backgroundColor')}
				disabledValues={disabledBgColors}
			/>

			<Select
				title='Ширина контента'
				options={contentWidthArr}
				selected={formState.contentWidth}
				onChange={handleChange('contentWidth')}
			/>
		</>
	);
};

export default Form;
