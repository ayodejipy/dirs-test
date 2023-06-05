import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
	const isOpen = ref<boolean>(false)

	return { isOpen }
})