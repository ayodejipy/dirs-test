<template>
    <AppDrawer>
        <template #title>
            <DialogTitle v-if="action == 'add'" as="h3" class="text-lg font-medium leading-6 text-gray-900">Add Menu Information</DialogTitle>
            <DialogTitle v-if="action == 'edit'" as="h3" class="text-lg font-medium leading-6 text-gray-900">Edit Menu Information</DialogTitle>
        </template>

        <div v-if="request.isSuccess" class="bg-green-500 text-white mx-4 p-2">Menu successfully added/updated.</div>
        <div v-if="request.isError" class="bg-red-400 text-white mx-4 p-2">{{ request.error ?? "Menu could not be created. Contact website admininstrator." }}.</div>

        <template v-if="action == 'delete'">
            <div class="flex flex-col py-8 px-3">
                <h5 class="font-light text-gray-700">Are you sure you want to erase {{ form.name }} from your menu list?</h5>

                <div class="mt-10">
                    <button type="button" @click="submitForm" class="bg-red-700 text-white hover:bg-red-700 border-none rounded-none py-3 text-center w-full" :disabled="request.loading">
                        {{ request.loading ? "loading..." : buttonText }}
                    </button>
                    <button type="button" @click="store.toggleModal" class="w-full border-none rounded-none py-3 text-center text-sm text-gray-500 font-medium" :disabled="request.loading">Cancel</button>
                </div>
            </div>
        </template>

        <template v-else>
            <form @submit.prevent="submitForm" class="mt-10 flex flex-col gap-4 px-4">
                <InputField v-model="form.name" type="text" placeholder="meal name" label="Meal name" />
                <InputField v-model="form.imageUrl" type="text" placeholder="meal image" label="Meal image" />
                <TextareaField v-model="form.description" placeholder="some description about meal" label="Description" />
                <SelectField v-model="form.mealCategory" name="meal-category" placeholder="select meal category" label="Select meal category">
                    <option v-for="category in categories" :key="category.sub" :value="category.sub">
                        {{ category.title }}
                    </option>
                </SelectField>
                <SelectField v-model="form.mealTime" name="meal-time" placeholder="select meal time" label="Select meal time">
                    <option v-for="mealtime in mealtimes" :key="mealtime" :value="mealtime">
                        {{ mealtime }}
                    </option>
                </SelectField>

                <div class="flex gap-4">
                    <InputField v-model="form.waitingTime" type="text" placeholder="approx waiting period" label="Processing time (Mins)" />
                    <InputField v-model="form.price" type="text" placeholder="price" label="Price" />
                </div>

                <div class="mt-10">
                    <button type="submit" class="bg-blue-600 text-white hover:bg-blue-700 border-none rounded-none py-3 text-center w-full" :disabled="request.loading">
                        {{ request.loading ? "loading..." : buttonText }}
                    </button>
                </div>
            </form>
        </template>
    </AppDrawer>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onUnmounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "../store/modal";

import { DialogTitle } from "@headlessui/vue";
import AppDrawer from "./base/AppDrawer.vue";
import InputField from "./base/InputField.vue";
import TextareaField from "./base/TextareaField.vue";
import SelectField from "./base/SelectField.vue";

import { IMealDetails } from "../utils/types";

// import api hook/composable
import useApi from "../composables/api";

const categories: Record<string, string>[] = [
    { title: "Starter", sub: "starter" },
    { title: "Main course", sub: "main" },
    { title: "dessert", sub: "dessert" },
    { title: "Beverage", sub: "beverage" },
    { title: "Other", sub: "other" },
];
const mealtimes = ["Breakfast", "Lunch", "Dinner", "Weekdays", "Weekends"];

const { updateMenu, deleteMenu } = useApi();
const store = useModalStore(); // initialize store
const { action } = storeToRefs(store);
// const { clearForm } = store
const { form } = store;

const request = reactive({
    loading: false,
    isSuccess: false,
    isError: false,
    error: null,
});

const buttonText = computed(() => (action.value == "add" ? "Create menu" : action.value == "edit" ? "Edit menu" : "Delete menu"));

async function submitForm() {
    try {
        request.loading = true;
        const result = action.value == "delete" ? await deleteMenu(form._id!, form) : await updateMenu(form);
		if (result.status == 200) return (request.isSuccess = true);
		
		store.toggleModal() // close modal
    } catch (error: any) {
        request.isError = true;
        request.error = error?.message;
    } finally {
        request.loading = false;
    }
}

onMounted(() => {
	// reset error and success messages
	request.isError = false
	request.isSuccess = false
})
</script>
