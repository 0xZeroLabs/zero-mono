#!/bin/bash

source .env

if [ -z "$ALIGNED_SERVICE_MANAGER_ADDRESS" ]; then
    echo "ALIGNED_SERVICE_MANAGER_ADDRESS is not set. Please set it in .env"
    exit 1
fi

if [ -z "$BATCHER_PAYMENT_SERVICE_ADDRESS" ]; then
    echo "BATCHER_PAYMENT_SERVICE_ADDRESS is not set. Please set it in .env"
    exit 1
fi

if [ -z "$RPC" ]; then
    echo "RPC is not set. Please set it in .env"
    exit 1
fi

if [ -z "$PRIVATE_KEY" ]; then
    echo "PRIVATE_KEY is not set. Please set it in .env"
    exit 1
fi

forge install

forge script script/Deployer.s.sol \
    "$ALIGNED_SERVICE_MANAGER_ADDRESS" "$BATCHER_PAYMENT_SERVICE_ADDRESS" \
    --rpc-url "$RPC" \
    --private-key "$PRIVATE_KEY" \
    --broadcast \
    --sig "run(address _alignedServiceManager, address _paymentService)"