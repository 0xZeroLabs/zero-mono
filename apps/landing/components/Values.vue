<template>
    <div class="body gap-2">
        <div class="bg-[#adff2f] rounded-3xl p-5 text-black w-full column-ends smallers">
            <h3 class="font-bold negative">
                Fail fast
            </h3>
            <p class="negative">Embracing setbacks as opportunities for growth, we foster a culture that values learning
                from failure.</p>
        </div>
        <div class="bg-[#ff2f2f] rounded-3xl p-5 text-black w-full column-ends smallers">
            <h3 class="font-bold negative">
                Integrity
            </h3>
            <p class="negative">We value openness and truthfulness, and we recognize honesty as the foundation of a
                resilient team.</p>
        </div>
        <div class="bg-[#2fd5ff] rounded-3xl p-5 text-black w-full column-ends row-ends">
            <h3 class="font-bold negative">
                Open source
            </h3>
            <p class="negative">As passionate advocates for open source principles, we harness the collective power of
                shared knowledge and collaboration.</p>
        </div>
        <div class="w-full bg-[#fffc2f] rounded-3xl p-5 text-black colu negativemn-ends row-ends">
            <h3 class="font-bold negative">
                Less is more
            </h3>
            <p class="negative">By embracing the simplicity principle, we ensure agility and effectiveness in our
                problem-solving approach.</p>
        </div>
    </div>
</template>

<style scoped>
a {
    @apply font-light;
}

h3 {
    @apply text-[19px] md:text-[24px];
}

p {
    @apply text-sm;
}

.body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, auto);
}

.column-ends {
    @apply min-h-full;
    grid-column-end: span calc(4/3);
}

.row-ends {
    grid-column-end: span calc(4/2);

}

.smallers {
    grid-row-end: span 2;
}

@media (max-width: 768px) {
    .column-ends {
        @apply min-h-full;
        grid-column-end: span 2;
    }

    .row-ends {
        grid-column-end: span 4;
    }
}
</style>