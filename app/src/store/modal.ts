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
        // get object keys
        const formKeys = Object.keys(form.value);

        // loop through form keys and set values as empty string
        for (const key of formKeys) {
            console.log(key);
            if (key == "isAvailable") form.value[key] = false;
            form.value[key] = "";
        }
        // removed keys not needed
        const { _id, _Changed, _Created, ..._oldForm } = form.value as unknown as IMealDetails;
        form.value = { ..._oldForm };
    }

    return { isOpen, action, request, form, menus, updateForm, clearForm, toggleModal, fetchMenus };
});
