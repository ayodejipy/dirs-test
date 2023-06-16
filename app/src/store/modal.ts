import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import useApi from "../composables/api";

import { IMealDetails } from "../utils/types";

export const useModalStore = defineStore("modal", () => {
    const { getMenus } = useApi();
    const isOpen = ref<boolean>(false);
    const action = ref<string>("add");

    const menus = ref<IMealDetails[]>([]);
    const request = reactive({
        loading: false,
        isSuccess: false,
        isError: false,
        error: null,
    });

    const form = ref<Partial<IMealDetails>>({
        // _id: "",
        // _Changed: "",
        // _Created: "",
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
        form.value = { ...body };
    }

    async function fetchMenus(): Promise<void> {
        try {
            request.loading = true;
            const {
                data: { data: data },
            } = await getMenus();
            menus.value = data;
            request.error = null;
        } catch (error: any) {
            request.isError = true;
            request.error = error.message;
        } finally {
            request.loading = false;
        }
	}
	
	function clearForm() {
        const excludedKeys = ["_id", "_Changed", "_Created"]; // Keys to be excluded from clearing

        // Loop through each key in the form object
        for (const key in form.value) {
            if (!excludedKeys.includes(key)) {
                // Set empty string for non-excluded keys
                form.value[key] = "";
            }
        }

		form.value.isAvailable = false; // Set isAvailable to false
		
        // removed keys not needed
        for (const key of excludedKeys) {
            delete form.value[key];
        }
    }

    return { isOpen, action, request, form, menus, updateForm, clearForm, toggleModal, fetchMenus };
});
