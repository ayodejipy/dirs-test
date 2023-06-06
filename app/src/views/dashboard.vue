<template>
    <TheHeader />

    <section aria-label="Menu items" class="w-full my-10">
        <div class="flex items-center justify-between">
            <h5 class="text-gray-800 font-bold text-2xl">Menu</h5>
            <p class="text-sm font-semibold text-gray-700">Showing 30 Items</p>
        </div>
        <div class="w-full max-w-full px-2 py-10 sm:px-0">
            <TabGroup>
                <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab v-for="category in Object.keys(categories)" as="template" :key="category" v-slot="{ selected }">
                        <button :class="['w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2', selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white']">
                            {{ category }}
                        </button>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <TabPanel v-for="(posts, idx) in Object.values(categories)" :key="idx" :class="['rounded-xl bg-gray-200 p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2']">
                        <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                            <MenuItem />
                        </ul>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>

		<AddMenuDrawer />
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import TheHeader from "../components/TheHeader.vue";
import MenuItem from "../components/MenuItem.vue";
import AddMenuDrawer from "../components/AddMenuDrawer.vue";

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
</script>
