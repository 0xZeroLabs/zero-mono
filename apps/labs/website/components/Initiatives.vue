<template>
    <div class="initiatives gap-2 text-sm">
        <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
            <h3 class="font-bold negative">
                ZERO Protocol
            </h3>
            <p class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative">
                ZERO is the identity layer for the new web. It empowers users to prove information from verifiable
                credentials through ZKPs(zero-knowledge proofs), as well as privately-held dynamic data via Web proofs
                (zkTLS). It enables a frictionless web3 experience for users as well as easy, seamless, compliant user
                data verification for developers.
            </p>
            <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
                <ScrambleBtn content="Learn more" type="inverse-alt" />
                <a href="https://docs.0xzero.org/" class="negative text-sm">
                    <Scramble content="Documentation" />
                </a>
            </div>
        </div>

        <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
            <h3 class="font-bold negative">
                OMID Wallet
            </h3>
            <p class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative">
                OMID (omni-identity) wallet is an application that enables users interact with the ZERO Protocol. It
                gives them the ability to grant access to their provable (verifiable/dynamic) data, as well as permision
                the issuance of credentials. It serves as a way to provide users self-custody to their identities and
                let's them make the trust assumption for their data.
            </p>
            <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
                <ScrambleBtn content="Learn more" type="inverse-alt" />
                <a href="https://docs.0xzero.org/" class="negative text-sm">
                    <Scramble content="Install app" />
                </a>
            </div>
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

.initiatives {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, auto);
}

.column-ends {
    grid-column-end: span 4;
}

.row-ends {
    grid-row-end: span 2;
}

@media (min-width: 1024px) {
    .column-ends {
        grid-column-end: span calc(4/2);
    }

    .row-ends {
        grid-column-end: span calc(2);
    }
}
</style>