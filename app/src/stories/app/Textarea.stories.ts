import { Meta, StoryObj, } from "@storybook/vue3";
import { ref } from 'vue'
import TextareaField from "../../components/base/TextareaField.vue";


const meta: Meta<typeof TextareaField> = {
    title: "Components/TextareaField",
	component: TextareaField,
	args: {
		modelValue: "",
		rows: "5"
	},
    argTypes: {
        rows: { control: "text" },
		cols: { control: "text" },
		required: { control: "boolean" },
        label: { control: "text" },
        name: { control: "text" },
        placeholder: { control: "text" },
        "onUpdate:modelValue": { action: "input" },
    },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { TextareaField },
		setup() {
			return { args };
		},
		template: `<TextareaField v-bind="args" />`,
	}),
    args: {
        label: "About meal",
        placeholder: "Write a short description your meal/menu",
    },
};
