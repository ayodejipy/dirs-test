import { Meta, StoryObj } from "@storybook/vue3";

import { userEvent, within, screen } from '@storybook/testing-library';

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
	play: async ({ canvasElement}) => { 
		const selectCategory = screen.getByTestId('meal-category')
		const selectMealTime = screen.getByTestId('meal-time')

		await userEvent.type(screen.getByTestId('meal-name'), 'Noodles', { delay: 100 })
		await userEvent.type(screen.getByTestId('meal-image'), 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80', { delay: 100 })
		await userEvent.type(screen.getByTestId('meal-description'), 'Meal description', { delay: 100 })
		userEvent.selectOptions(selectCategory, ['main'])
		userEvent.selectOptions(selectMealTime, ['Breakfast'])
		await userEvent.type(screen.getByTestId('meal-price'), '30', { delay: 100 })
		await userEvent.type(screen.getByTestId('meal-waitTime'), '20', { delay: 100 })

		// await userEvent.type(canvas.getByRole('switch'), 'true', { delay: 100 })

		// submit form
		const submitButton = await screen.getByRole('submit');
		await userEvent.click(submitButton)

	}
};
