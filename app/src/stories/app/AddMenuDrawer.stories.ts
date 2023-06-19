import { Meta, StoryObj } from "@storybook/vue3";

import { userEvent, within } from '@storybook/testing-library';

import AddMenuDrawer from "../../components/AddMenuDrawer.vue";

import { storeToRefs } from 'pinia'
import { useModalStore } from "../../store/modal";

const meta: Meta<typeof AddMenuDrawer> = {
    title: "Components/AddMenuDrawer",
    component: AddMenuDrawer,
	args: {},
	decorators: [
		(args) => ({
			components: { AddMenuDrawer },
			setup() {
				const store = useModalStore(); // initialize store
				// const { toggleModal } = store
				const { isOpen } = storeToRefs(store);
				isOpen.value = true

				return { args };
			},
			template: `<AddMenuDrawer v-bind="args" />`,
		}),
	]
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const withFilledForm: Story = {
	play: async ({ canvasElement }) => { 
		const canvas = within(canvasElement)

		await userEvent.type(canvas.getByTestId('meal-name'), 'Meal name', { delay: 100 })
		await userEvent.type(canvas.getByTestId('meal-image'), 'Image URL', { delay: 100 })
		await userEvent.type(canvas.getByTestId('meal-description'), 'Meal description', { delay: 100 })
		await userEvent.type(canvas.getByTestId('meal-category'), 'main', { delay: 100 })
		await userEvent.type(canvas.getByTestId('meal-time'), 'breakfast', { delay: 100 })
		await userEvent.type(canvas.getByTestId('meal-price'), '30', { delay: 100 })
		await userEvent.type(canvas.getByTestId('meal-waitTime'), '20', { delay: 100 })

		await userEvent.type(canvas.getByRole('switch'), 'true', { delay: 100 })

		// submit form
		const submitButton = canvas.getByRole('button');
		await userEvent.click(submitButton)

	}
};
