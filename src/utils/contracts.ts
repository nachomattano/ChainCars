import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { ChainCarsABI } from "./ChainCarsABI";
import { StakingABI } from "./StakingABI";

export const ChainCarsAddress = "0xe37722F3c1B081Cae349c842b665E45d2dd0AD9A"

export const StakingAddress = "0xc5c5E0549Fe9Ee5a0a378C5f1f35E50a3608463C"

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