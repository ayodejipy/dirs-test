<template>
    <AppDrawer>
        <template #title>
            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Add Menu Information</DialogTitle>
        </template>

        <form @submit.prevent="" class="mt-10 flex flex-col gap-4 px-4">
            <InputField v-model="form.name" type="text" placeholder="meal name" label="Meal name" />
            <InputField v-model="form.imageUrl" type="text" placeholder="meal image" label="Meal image" />
            <TextareaField v-model="form.description" placeholder="some description about meal" label="Description" />
            <SelectField v-model="form.mealCategory" name="meal-category" placeholder="select meal category" label="Select meal category">
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
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
                <button type="submit" class="bg-blue-600 text-white hover:bg-blue-700 border-none rounded-none py-3 text-center w-full">Create menu</button>
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

const categories = ["Starter", "Main course", "dessert", "Beverage", "Other"];
const mealtimes = ["Breakfast", "Lunch", "Dinner", "Weekdays", "Weekends"];
</script>
