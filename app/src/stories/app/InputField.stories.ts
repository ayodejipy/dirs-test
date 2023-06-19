import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";

import InputField from "../../components/base/InputField.vue";

const meta: Meta<typeof InputField> = {
    title: "Components/InputField",
    component: InputField,
    //👇 Enables auto-generated documentation for the component story
    tags: ["autodocs"],
    args: {
        type: "text",
        required: false,
        placeholder: "Provide an input here",
    },
    argTypes: {
        name: { control: 'text'},
        type: { control: 'text'},
        required: { control: 'boolean' },
        placeholder: { control: 'text' }
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        required: true,
        label: "Username",
        placeholder: "Enter your username",
    },
};

export const TextInputField: Story = {
    render: (args) => ({
        components: { InputField },
        setup() {
            const model = ref<string>("");
            const updateInput = (event: string) => (model.value = event);

            return { args, model, updateInput };
        },
        template: '<InputField v-bind="args" :modelValue="model" @update:modelValue="updateInput" />',
    }),
    args: {
        ...Default.args,
        name: 'username',
        placeholder: "Enter your username",
    },
};

export const NumberInputField: Story = {
    args: {
        ...Default.args,
        name: 'phone-number',
        type: "number",
        label: "Phone Number",
        placeholder: "Enter your phone number",
    },
};

export const EmailInputField: Story = {
    args: {
        ...Default.args,
        name: 'user-email',
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
    },
};
