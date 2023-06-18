<template>
   <button type="button" class="border-none text-sm text-gray-600 flex items-center" @click="onClick($event)">
		<slot />
		{{ text }}
	</button>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
	(e: 'click', $event: Event): void
}>()

const props = defineProps<{
    text: string;
}>();

function onClick($event: Event) {
    emit('click', $event)
}
</script>
