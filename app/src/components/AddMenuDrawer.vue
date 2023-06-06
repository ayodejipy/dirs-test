<template>
    <AppDrawer>
        <template #title>
            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Add Menu Information</DialogTitle>
        </template>

		<div v-if="request.isSuccess" class="bg-green-500 text-white mx-4 p-2">Menu successfully added/updated.</div>
		<div v-if="request.isError" class="bg-red-400 text-white mx-4 p-2">{{ request.error ?? 'Menu could not be created. Contact website admininstrator.'}}.</div>

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
					{{ request.loading ? 'loading...' : 'Create menu' }}
				</button>
            </div>
        </form>
    </AppDrawer>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { DialogTitle } from "@headlessui/vue";
import AppDrawer from "./base/AppDrawer.vue";
import InputField from "./base/InputField.vue";
import TextareaField from "./base/TextareaField.vue";
import SelectField from "./base/SelectField.vue";

import { IMealDetails } from '../utils/types'

// import api hook/composable
import useApi from '../composables/api'

const categories = [{ title: "Starter", sub: 'starter' }, { title: "Main course", sub: 'main'}, {title: "dessert", sub: 'dessert'}, {title: "Beverage", sub: 'beverage'}, {title: "Other", sub: 'other'}];
const mealtimes = ["Breakfast", "Lunch", "Dinner", "Weekdays", "Weekends"];

const { updateMenu } = useApi()

const request = reactive({
	loading: false,
	isSuccess: false,
	isError: false,
	error: null,
})

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


async function submitForm() {
	try {
    	request.loading = true
		const result = await updateMenu(form)
	 	 if (result.status == 200) return request.isSuccess = true
	} catch (error: any) {
		request.isError = true
		request.error = error?.message
	} finally {
		request.loading = false
	}
}
</script>
