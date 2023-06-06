<template>
    <li class="col-span-1 flex flex-col rounded-md bg-white shadow-sm p-3">
        <div class="w-full flex gap-4">
            <div class="flex w-28 h-28 flex-shrink-0 rounded-md">
                <img :src="menu.imageUrl" class="object-cover w-full h-full rounded-md" :alt="menu.name" />
            </div>
            <div class="flex-1">
                <h5 class="font-semibold text-xl text-gray-900 hover:text-gray-600">{{ menu.name }}</h5>
                <p class="text-gray-500 text-xs mt-2 truncate-text">{{ menu.description }}</p>
                <div class="mt-4">
                    <h5 class="text-gray-800 text-2xl font-bold">
                        <span class="text-base font-semibold text-gray-600">$</span>
                        {{ menu.price }}
                    </h5>
                </div>
            </div>
        </div>

        <div class="flex justify-between mt-5 py-2">
            <div>
                <SwitchGroup as="div" class="flex items-center">
                    <Switch v-model="isEnabled" :class="[isEnabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                        <span aria-hidden="true" :class="[isEnabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                    </Switch>
                    <SwitchLabel as="span" class="ml-3 text-sm">
                        <span class="font-medium text-gray-900">Mark as unavailable </span>
                    </SwitchLabel>
                </SwitchGroup>
            </div>
            <div class="flex gap-3 divide-x divide-gray-400">
                <button type="button" class="border-none text-sm text-gray-600 flex items-center">
                    <PencilSquareIcon class="w-5 h-6 text-blue-500" />
                    Edit
                </button>
                <span></span>
                <button type="button" class="border-none text-sm text-gray-600 flex items-center">
                    <TrashIcon class="w-5 h-6 text-red-500" />
                    Delete
                </button>
            </div>
        </div>
    </li>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import PencilSquareIcon from "../asset/PencilSquareIcon.vue";
import TrashIcon from "../asset/TrashIcon.vue";
// import { TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";

import { IMealDetails } from "../utils/types";

const isEnabled = ref(false);

const props = defineProps<{
    menu: IMealDetails;
}>();

</script>
