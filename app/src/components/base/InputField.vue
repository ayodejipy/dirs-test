<template>
    <div class="w-full relative">
        <label :for="label" class="block text-sm font-medium leading-6 text-gray-700">{{ label }}</label>
        <input :type="type" :value="modelValue" :required="required" :placeholder="placeholder" @input="onChange" class="relative w-full p-3 text-gray-800 border border-gray-400 outline-0 text-xs leading-normal font-normal placeholder:focus:text-transparent placeholder:text-gray-600 bg-transparent focus:border-gray-500" />
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    type: {
        type: String,
        default: "text",
        required: false,
    },
    label: {
        type: String,
        default: "text",
        required: false,
    },
    required: {
        type: Boolean,
        default: false,
        required: false,
    },
    placeholder: {
        type: String,
        default: "",
        required: false,
    },
    modelValue: {
        type: String,
        default: "",
        required: false,
    },
});

function onChange($event: Event) {
    emit("update:modelValue", ($event.target as HTMLSelectElement)?.value);
}
</script>
