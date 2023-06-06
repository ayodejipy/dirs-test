<template>
	<header class="bg-white py-6 flex items-center justify-between px-2">
		<h5 class="uppercase text-sm font-semibold text-gray-800">DIRS-Restuarant Menu</h5>
		<div class="flex items-center gap-6 divide-r-2 divide-gray-700">
			<button class="px-6 py-2.5 border-none bg-green-600 text-white text-sm" @click="toggleModal">Add new menu</button>
			<div class="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-semibold">A</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModalStore } from '../store/modal';

const store = useModalStore(); // initialize store
const { isOpen } = storeToRefs(store); // destructure reactive state

function toggleModal() {
	isOpen.value = !isOpen.value
}
</script>