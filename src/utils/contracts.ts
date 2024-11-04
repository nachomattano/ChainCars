import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { ChainCarsABI } from "./ChainCarsABI";
import { StakingABI } from "./StakingABI";

export const ChainCarsAddress = "0xcD4C26f72D5E9f1ffDfb8ff5cB50cD11F01CEfB2"

export const StakingAddress = "0x5Fe445Cc75416BA948C252A0aED9AD688af04e2B"

export const ChainCarsContract = getContract({
    client: client,
    address: ChainCarsAddress,
    chain: chain,
    abi: ChainCarsABI
})

export const StakingContract = getContract({
    client: client,
    address: StakingAddress,
    chain: chain,
    abi: StakingABI
})

export const USDTContract = getContract({
    client: client,
    address: "0x53b230827dfe118591138A90d5A20301AE6756a9",
    chain: chain
})