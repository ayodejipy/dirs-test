<template>
    <div class="w-full">
        <label :for="label" class="block text-sm font-medium leading-6 text-gray-700">{{ label }}</label>
        <textarea :data-testid="name" :name="name" :rows="rows" :cols="cols" :value="modelValue" :required="required" :placeholder="placeholder" @input="onChange" class="w-full text-gray-800 border border-gray-400 outline-0 p-2 text-xs font-normal placeholder placeholder:transition placeholder:duration-300 focus:border-gray-500 resize-none"></textarea>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    name: {
        type: String,
        default: "",
        required: true
    },
    rows: {
        type: String,
        default: "5",
        required: false,
    },
    cols: {
        type: String,
        default: "",
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
    label: {
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
