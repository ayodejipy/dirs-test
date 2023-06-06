import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import useApi from "../composables/api";

import { IMealDetails } from '../utils/types';

export const useModalStore = defineStore('modal', () => {
	const { getMenus } = useApi();
	const isOpen = ref<boolean>(false)
	const action = ref<string>('add')

	const menus = ref<IMealDetails[]>([]);
	const request = reactive({
		loading: false,
		isSuccess: false,
		isError: false,
		error: null,
	});

	const form: Partial<IMealDetails> = reactive({
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

	async function fetchMenus(): Promise<void> {
		try {
			request.loading = true
			const { data: { data: data } } = await getMenus();
			menus.value = data;
			request.error = null
		} catch (error: any) {
			request.isError = true
			request.error = error.message
		} finally {
			request.loading = false;
		}
			
	}

	function clearForm() {
		// for (let key in form) {
		// 	if(key == 'isAvailable') return form[key] = false
		// 	form[key as typeof form] = "";
		// }
	}

	return { isOpen, action, request, form, menus, updateForm, toggleModal, fetchMenus };
})