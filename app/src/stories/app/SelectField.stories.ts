import { Meta, StoryObj, } from "@storybook/vue3";
import { ref } from 'vue'
import SelectField from "../../components/base/SelectField.vue";


const meta: Meta<typeof SelectField> = {
    title: "Components/SelectField",
	component: SelectField,
	args: {
		modelValue: ""
	},
    argTypes: {
        name: { control: "text" },
        label: { control: "text" },
        placeholder: { control: "text" },
        "onUpdate:modelValue": { action: "select" },
    },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { SelectField },
		setup() {
			const selected = ref("")
			const items = ref([
				{ id: 0, value: "nigeria", label: "Nigeria" },
				{ id: 1, value: "germany", label: "Germany" },
				{ id: 2, value: "romania", label: "Romania" },
				{ id: 3, value: "greece", label: "Greece" },
				{ id: 4, value: "hungary", label: "Hungary" },
				{ id: 5, value: "portugal", label: "Portugal" },
				{ id: 6, value: "italy", label: "Italy" },
			]);
			return { args, items, selected };
		},
		template: `<SelectField v-bind="args" v-model="selected">
			<template v-slot:default>
				<option v-for="item in items" :key="item.value" :value="item.value">{{ item.label }}</option>
			</template>
		</SelectField>`,
	}),
    args: {
        name: "selectCountry",
        label: "Select Country",
        placeholder: "Select a country...",
    },
};
