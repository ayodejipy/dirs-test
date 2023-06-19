<template>
   <button type="button" class="border-none text-sm text-gray-600 flex items-center" @click="onClick($event)">
		<slot />
		{{ text }}
	</button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const emit = defineEmits<{
	(e: 'click', $event: Event): void
}>()

const props = defineProps<{
	text: string;
	buttonStyle?: 'primary' | 'secondary' ;
}>();

// const customStyles = computed(() => ({
// 	'bg-black text-white': props.buttonStyle == 'primary',
// 	'bg-green-600 text-white': props.buttonStyle == 'secondary'
// }))

function onClick($event: Event) {
    emit('click', $event)
}
</script>
