import type { Meta, StoryObj } from "@storybook/vue3";

import MenuItem from "../../components/MenuItem.vue";

const meta: Meta = {
	title: "Components/MenuItem",
	component: MenuItem,
	tags: ["autodocs"],
}

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        menu: {
			name: "Meal 29",
			imageUrl: "https://www.freepnglogos.com/uploads/food-png/food-grass-fed-beef-foodservice-products-grass-run-farms-4.png",
			description: "If it's a pedantic javascript object that doesn't make sense to create type definitions per field for, and doesn't make sense as a class definition, you can type the object with any and typescript will let you index however you want.",
			mealCategory: "main",
			mealTime: "Breakfast",
			price: "20",
			waitingTime: "15",
			isAvailable: true,
			_id: "902eb808-9728-446b-9c21-cf82a62a3d67",
			_Created: "2023-06-15T09:56:43.925Z",
			_Changed: "2023-06-15T11:16:56.916Z",
		},
    },
};

export const OutOfStock: Story = {
	args: {
		menu: {
			...Default?.args?.menu,
			isAvailable: false,
		}
	}
}