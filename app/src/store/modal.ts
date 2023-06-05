import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
	const isOpen = ref<boolean>(false)

	function toggleModal() {
    isOpen.value = !isOpen.value;
}

	return { isOpen, toggleModal }
})