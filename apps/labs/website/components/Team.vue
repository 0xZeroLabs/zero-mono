<template>
    <div class="initiatives gap-2 text-sm">
        <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
            <h3 class="font-bold negative">
                Ewan
            </h3>
            <p class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative">
                S3N is the identity layer for the new web. It is a decentralised self-sovereign identity solution that
                enables permissionless issuance, verifiable provenance, and trustless verification of credentials. It
                integrates a trusted notaries AVS (Core) on  <a href="https://eigenlayer.xyz" class="negative underline">EigenLayer</a> through the <a href="https://othentic.xyz" class="negative underline">Othentic Stack</a>, as a secure replacement for signing
                credentials, thereby enabling an open ecosystem for secure identity.
            </p>
            <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
                <ScrambleBtn to="https://s3n.xyz/" content="Learn more" type="inverse-alt" />
                <Scramble to="https://docs.0xzero.org/" content="Documentation" />
            </div>
        </div>

        <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
            <h3 class="font-bold negative">
                OMID Wallet
            </h3>
            <p class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative">
                OMID (omni-identity) wallet is an application that enables users interact with the S3N Core. It
                gives them the ability to grant access to their provable (verifiable/dynamic) data, as well as permision
                the issuance of credentials. It serves as a way to provide users self-custody to their identities and
                let's them make the trust assumption for their data.
            </p>
            <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
                <ScrambleBtn content="Learn more" type="inverse-alt" />
                <Scramble to="https://docs.0xzero.org/" content="Install app" />
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