<template>
    <TheHeader />

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

        <AddMenuDrawer />
    </section>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import TheHeader from "../components/TheHeader.vue";
import MenuItem from "../components/MenuItem.vue";
import AddMenuDrawer from "../components/AddMenuDrawer.vue";
import useApi from "../composables/api";
import { IMealDetails, MenusByCategory } from "../utils/types";

const { getMenus } = useApi();
const isLoading = ref<boolean>(false);
const menus = ref<IMealDetails[]>([]);
const sortedMenus = ref<MenusByCategory>();

const categories = ref({
    Recent: [
        {
            id: 1,
            title: "Does drinking coffee make you smarter?",
            date: "5h ago",
            commentCount: 5,
            shareCount: 2,
        },
        {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: "2h ago",
            commentCount: 3,
            shareCount: 2,
        },
    ],
    Popular: [
        {
            id: 1,
            title: "Is tech making coffee better or worse?",
            date: "Jan 7",
            commentCount: 29,
            shareCount: 16,
        },
        {
            id: 2,
            title: "The most innovative things happening in coffee",
            date: "Mar 19",
            commentCount: 24,
            shareCount: 12,
        },
    ],
    Trending: [
        {
            id: 1,
            title: "Ask Me Anything: 10 answers to your questions about coffee",
            date: "2d ago",
            commentCount: 9,
            shareCount: 5,
        },
        {
            id: 2,
            title: "The worst advice we've ever heard about coffee",
            date: "4d ago",
            commentCount: 1,
            shareCount: 2,
        },
    ],
});

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

    console.log(sortedMenus.value);
};

async function fetchMenus(): Promise<void> {
	try {
		isLoading.value = true;
        const {
            data: { data: data },
        } = await getMenus();
        console.log(data);
        menus.value = data;
    } catch (error) {
		throw new Error("Error: " + error);
    } finally {
		isLoading.value = false;
    }
}


// watch data on menus and sort menus based off category
watch(menus, (newValue) => sortData(newValue));

// fetch users menu on page mount
onMounted(() => fetchMenus());
</script>
