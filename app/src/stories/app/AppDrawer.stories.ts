import { Meta, StoryObj } from "@storybook/vue3";
import AppDrawer from "../../components/base/AppDrawer.vue";
import * as AddMenuDrawer from "./AddMenuDrawer.stories"

import { storeToRefs } from 'pinia'
import { useModalStore } from "../../store/modal";

const meta: Meta<typeof AppDrawer> = {
    title: "Components/AppDrawer",
    component: AppDrawer,
    args: {},
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { AppDrawer },
		setup() {
			const store = useModalStore(); // initialize store
			const { toggleModal } = store
			const { isOpen, form } = storeToRefs(store);
			isOpen.value = true

            return { args };
        },
        template: `<AppDrawer v-bind="args">
			<template v-slot:default>
				<AddMenuDrawer />
			</template>
		</AppDrawer>`,
	}),
};
