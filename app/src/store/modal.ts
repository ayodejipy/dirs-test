import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { IMealDetails } from '../utils/types';

export const useModalStore = defineStore('modal', () => {
	const isOpen = ref<boolean>(false)
	const action = ref<string>('add')
	const form: IMealDetails = reactive({
		name: "",
		imageUrl: "",
		description: "",
		mealCategory: "",
		mealTime: "",
		price: "",
		waitingTime: "",
		isAvailable: true,
	});

	function toggleModal() {
    	isOpen.value = !isOpen.value;
	}

	function updateForm(body: IMealDetails) {
		form.name = body.name,
		form.imageUrl = body.imageUrl,
		form.description = body.description,
		form.mealCategory =  body.mealCategory
		form.mealTime = body.mealTime
		form.price = body.price
		form.waitingTime = body.waitingTime
		form.isAvailable = body.isAvailable
		form._id = body._id
		form._Changed = body._Changed
		form._Created = body._Created
	}

	function clearForm() {
		// for (let key in form) {
		// 	if(key == 'isAvailable') return form[key] = false
		// 	form[key] = "";
		// }
	}

	return { isOpen, action, form, updateForm, toggleModal }
})