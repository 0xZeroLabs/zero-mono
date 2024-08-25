<template>
    <div class="w-full flex justify-center">
        <div
            class="relative w-[94%] lg:w-[80%] in1 rounded-md flex min-h-fit justify-center items-center bg-white bg-cover bg-center bg-no-repeat bg-none">
            <div
                class="min-w-full max-w-[1536px] text-left py-4 min-h-[calc(52vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-6">
                <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-left text-black">
                    <span class="negative">FAQs</span>
                </h1>
                <div
                    class="w-full font-SpaceGrotesk negative font-normal text-[19px] md:text-[24px] text-left md:text-left max-w-[1536px] text-black">
                    <div class="accordion-items w-full" ref="accordionItems">
                        <div v-for="(item, index) in faq" :key="index" class="mb-5 w-full">
                            <Accordion :title="item.title" :id="`faqs-${index}`" :active="item.active" :faq="faq">
                                <div v-html="item.text"></div>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const accordionItems = ref();

const open = ref("");

const faq = ref([
    {
        title: 'What is ZERO Protocol?',
        text: 'ZERO Protocol is a decentralized identity solution developed by ZERO Labs. It empowers individuals with secure, privacy-preserving digital identities and data verification methods. The protocol utilizes advanced cryptographic techniques, particularly zero-knowledge proofs (ZKPs), to ensure privacy and security in digital interactions.',
        active: false
    },
    {
        title: 'How does ZERO Protocol ensure privacy and security?',
        text: 'The protocol employs zero-knowledge proofs (ZKPs) to enable verification of claims without disclosing sensitive personal data, thus maintaining privacy and security in digital interactions.',
        active: false
    },
    {
        title: 'What makes ZERO different from other identity solutions?',
        text: 'ZERO Protocol distinguishes itself by offering dynamic credentials proofs that can be updated in real-time, along with interoperable identities that function seamlessly across multiple blockchains, all while ensuring preserved privacy through zero-knowledge.'
    },
    {
        title: 'Why is ZK important for your identity?',
        text: 'Zero-knowledge proofs (ZKPs) are essential for digital identity because they enable users to verify their identity attributes without revealing sensitive personal information, enhancing privacy, reducing data breach risks, and allowing for selective disclosure while maintaining compliance with privacy regulations.',
        active: false
    },
    {
        title: 'What are the main use cases for ZERO Protocol?',
        text: 'ZERO Protocol is applicable in various sectors, including decentralized finance (DeFi) for lending and credit scoring, tokenized assets for fractional ownership, and decentralized job markets for skills verification. It also supports privacy-preserving KYC/AML processes, supply chain management for product authenticity, secure healthcare data sharing, and decentralized identities in gaming and social media.',
        active: false
    },
    {
        title: 'Is personal data stored on the blockchain?',
        text: 'No, ZERO Protocol is designed to minimize data storage onchain. Only merkle roots and attestations are stored on-chain, not the underlying personal data itself.',
        active: false
    },
    {
        title: 'Is ZERO compliant with data protection regulations?',
        text: 'Yes, by enabling verification without storing or processing raw personal data directly, ZERO Protocol helps organizations comply with regulations like GDPR while still providing necessary identity services.',
        active: false
    },
    {
        title: 'Who is developing ZERO Protocol?',
        text: `ZERO Protocol is developed by ZERO Labs, a company focused on creating secure digital identities and data verification solutions. The leadership team includes the CEO Ewanretor Giwa-Okugbe and CTO, Oluwatobiloba Uche Chukwuemeka. We're currently raising funds: <a href="https://docsend.com/view/y8k5hceupcprkbws" class="text-gray-800 underline">Check out our Deck</a>.`,
        active: false
    }
]);
</script>

<style scoped>
@keyframes scale-height {
    from {
        height: 0;
        opacity: 0;
    }

    to {
        height: 100%;
        opacity: 1;
    }
}

.accordion-content {
    overflow: hidden;
    opacity: 1;
    height: 0;
}

.accordion-content.open {
    animation: scale-height 0.5s ease-out forwards;
}
</style>