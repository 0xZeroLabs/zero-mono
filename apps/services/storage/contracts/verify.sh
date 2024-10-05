#!/bin/bash

source .env

if [ -z "$API_KEY" ]; then
    echo "CID is not set. Please set it in .env"
    exit 1
fi

if [ -z "$RPC" ]; then
    echo "RPC is not set. Please set it in .env"
    exit 1
fi

if [ -z "$API_URL" ]; then
    echo "API_URL is not set. Please set it in .env"
    exit 1
fi

forge install

forge verify-contract --rpc-url "$RPC" \
    0x008484085F02c25C8d82A5Db5aFBA6e1151e24f1 \
    ./src/OMID.sol:OMID \
    --verifier blockscout \
    --verifier-url "$API_URL" \
    --watch

forge verify-check 0x008484085F02c25C8d82A5Db5aFBA6e1151e24f1 \
    --chain 2810 \
    --verifier blockscout \
    --verifier-url "$API_URL"