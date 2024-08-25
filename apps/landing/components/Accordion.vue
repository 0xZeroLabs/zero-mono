<script setup lang="ts">
const accordionOpen = ref<boolean>(false)

const props = defineProps<{
    title: string
    id: string
    active?: boolean,
    faq: any
}>()

const emit = defineEmits(['toggle'])
onMounted(() => {
    accordionOpen.value = props.active
})
const toggleAccordion = (index: string) => {
    //props.faq.forEach((__: any, id: string) => {
        // index == `faqs-${id}` ? accordionOpen.value = !accordionOpen.value : accordionOpen.value = false;
        // console.log(index == `faqs-${id}`)
        accordionOpen.value = !accordionOpen.value
        emit('toggle', props.id)
    //})
}

const closeAccordion = () => {
    accordionOpen.value = false
}

defineExpose({
    closeAccordion
})
</script>

<template>
    <div class="py-2">
        <h2>
            <button :id="`accordion-title-${id}`"
                class="flex items-center justify-between text-xl w-full md:text-2xl cursor-pointer py-2"
                @click.prevent="toggleAccordion(id)" :aria-expanded="accordionOpen"
                :aria-controls="`accordion-text-${id}`">
                <span>{{ title }}</span>
                <svg class="fill-black shrink-0 ml-8" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <rect y="7" width="16" height="2" rx="1"
                        class="transform origin-center transition duration-200 ease-out"
                        :class="{ '!rotate-180': accordionOpen }" />
                    <rect y="7" width="16" height="2" rx="1"
                        class="transform origin-center rotate-90 transition duration-200 ease-out"
                        :class="{ '!rotate-180': accordionOpen }" />
                </svg>
            </button>
        </h2>
        <div :id="`accordion-text-${id}`" role="region" :aria-labelledby="`accordion-title-${id}`"
            class="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
            :class="accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
            <div class="overflow-hidden">
                <p class="text-lg w-full md:text-xl">
                    <slot />
                </p>
            </div>
        </div>
    </div>
</template>