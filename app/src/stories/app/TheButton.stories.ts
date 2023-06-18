import type { Meta, StoryObj } from '@storybook/vue3';

import TheButton from '../../components/base/TheButton.vue';
import PencilSquareIcon from '../../asset/PencilSquareIcon.vue';


const meta: Meta<typeof TheButton> = {
	title: 'Components/Button',
	component: TheButton,
	tags: ['autodocs'],
	argTypes: {
		text: { control: 'text' },
		onClick: { action: 'clicked'}
	},
}
export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
    render: (args) => ({
        components: { TheButton, PencilSquareIcon },
        setup() {
            return { args };
        },
		template: `<TheButton v-bind="args">
			<template v-slot:default>
				<PencilSquareIcon class="mr-2" />
			</template>
		</TheButton>`,
    }),
    args: {
		text: "Click me",
    },
};

export const NoIconButton: Story = {
	args: {
		text: "Button without any icon",
    },
}