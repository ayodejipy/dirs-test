<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="toggleModal" class="relative z-30">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 translate-x-full" enter-to="opacity-100 translate-x-0" leave="duration-200 ease-in" leave-from="opacity-100 translate-x-0" leave-to="opacity-0 translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md overflow-hidden">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="py-6 px-2 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <!-- <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"> Payment successful </DialogTitle> -->
                                            <slot name="title" />
                                            <div className="flex h-7 items-center">
                                                <button type="button" className="text-gray-800 hover:text-gray-500" @click="toggleModal">
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon class="h-6 w-6 text-gray-800" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <slot />
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia'
import { useModalStore } from "../../store/modal";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";

const store = useModalStore(); // initialize store
const { toggleModal } = store
const { isOpen } = storeToRefs(store); // destructure reactive state


</script>
