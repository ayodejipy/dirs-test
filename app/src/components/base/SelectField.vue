<template>
    <fieldset class="flex flex-col w-full">
        <label v-if="label" :for="name" class="text-gray-700 text-sm font-medium leading-6">{{ label }}</label>

        <select :id="name" :name="name" :value="modelValue" @input="onChange" class="relative w-full px-4 border border-gray-400 appearance-none text-gray-800 text-xs h-12">
            <option value="" disabled selected>{{ placeholder }}</option>
            <slot></slot>
        </select>

        <!-- <span class="absolute w-fit h-fit right-2 bottom-6"><ChevronDownIcon class="h-6 w-6" /></span> -->
    </fieldset>
</template>

<script lang="ts" setup>
const props = defineProps<{
    name: string;
    label: string;
    placeholder: string;
    modelValue: string | undefined;
}>();

const emits = defineEmits(["update:modelValue"]);

function onChange(event: any) {
    emits("update:modelValue", event.target.value);
}
</script>
