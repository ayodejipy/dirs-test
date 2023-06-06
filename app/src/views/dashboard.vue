<template>
    <TheHeader />

	<section aria-label="Orders list" class="w-full my-16">
		<div class="flex items-center mb-5">
			<h5 class="text-gray-700 font-bold text-2xl">Orders list</h5>
		</div>
		<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<li v-for="n in 3" :key="n" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
				<div class="flex w-full justify-between space-x-6 p-6">
					<div class="flex-1 truncate space-y-4">
						<div class="space-y-1">
							<h3 class="truncate text-sm font-medium text-gray-900">Pepperoni</h3>
							<span class="inline-flex py-0.5 text-xs font-medium text-gray-600"> Item 3 &bull; Table 10</span>
						</div>
						<span class="inline-flex flex-shrink-0 rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
							progress
						</span>
					</div>
					<!-- order id -->
					<span class="inline-flex flex-shrink-0 text-xs font-semibold text-gray-700">#40912</span>
				</div>
			</li>
		</ul>
	</section>

    <section aria-label="Menu items" class="w-full my-10">
        <div class="flex items-center justify-between">
            <h5 class="text-gray-800 font-bold text-2xl">Menu</h5>
            <p class="text-sm font-semibold text-gray-700" v-if="menus.length > 0">Showing 30 Items</p>
        </div>
        <div class="w-full max-w-full px-2 py-10 sm:px-0" v-if="menus.length > 0">
            <TabGroup>
                <TabList class="flex space-x-1 rounded-xl bg-gray-100 p-1">
                    <Tab v-for="category in Object.keys(sortedMenus)" as="template" :key="category" v-slot="{ selected }">
                        <button :class="['w-full rounded-lg py-2.5 text-sm font-medium capitalize leading-5 text-green-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2', selected ? 'bg-white shadow' : 'text-gray-700 hover:bg-gray-600/[0.12] hover:text-white']">
                            {{ category }}
                        </button>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <TabPanel v-for="(menus, idx) in Object.values(sortedMenus)" :key="idx" :class="['rounded-xl bg-gray-200 p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2']">
                        <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                            <MenuItem v-for="menu in menus" :key="menu.name" :menu="menu" />
                        </ul>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>

        <template v-else>
            <div class="flex items-center justify-center py-5">
                <h5 class="text-gray-800 font-semibold text-xl">No menu(s) found yet.</h5>
            </div>
        </template>

        <AddMenuDrawer v-if="isOpen" />
    </section>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import { storeToRefs } from 'pinia'
import { useModalStore } from '../store/modal';
import useApi from "../composables/api";
import { IMealDetails, MenusByCategory } from "../utils/types";

// components
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import TheHeader from "../components/TheHeader.vue";
import MenuItem from "../components/MenuItem.vue";
import AddMenuDrawer from "../components/AddMenuDrawer.vue";

const { getMenus } = useApi();
const store = useModalStore(); // initialize store
const { menus, isOpen } = storeToRefs(store); // initialize store
const { fetchMenus } = store

const sortedMenus = ref<MenusByCategory>();

// sort menus by category
const sortData = (data: IMealDetails[]) => {
    sortedMenus.value = data.reduce((result: MenusByCategory, item) => {
        // Check if the type exists as a key in the result object
        if (result[item.mealCategory]) {
            // If the key exists, push the item into the corresponding array
            result[item.mealCategory].push(item);
        } else {
            // If the key doesn't exist, create a new array with the item
            result[item.mealCategory] = [item];
        }
        return result;
    }, {});
};

// watch data on menus and sort menus based off category
watch(menus, (newValue) => sortData(newValue));

// fetch users menu on page mount
onMounted(() => fetchMenus());
</script>
