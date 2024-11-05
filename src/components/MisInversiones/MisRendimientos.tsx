'use client';

import { StakingContract } from "@/utils/contracts";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import ESTANDAR from "@/assets/estandar.webp";
import CLASICO from "@/assets/clasico.webp";
import DEPORTIVO from "@/assets/deportivo.webp";
import LUJOSO from "@/assets/lujoso.webp";
import { Button } from "../ui/button";
import { prepareContractCall, sendTransaction, toEther, waitForReceipt } from "thirdweb";
import { client } from "@/app/client";
import { chain } from "@/app/chain";

export default function MisRendimientos() {
    const address = useActiveAccount();

    const { data: stakingData, isPending: isPendingStakingData } = useReadContract({
        contract: StakingContract,
        method: "getStakingsPerAddress",
        params: [address ? address.address : "0x0000000000000000000000000000000000000000"]
    });

    const categories = [
        "Estándar",
        "Clásico",
        "Deportivo",
        "Lujoso"
    ];

    const images = [
        ESTANDAR,
        CLASICO,
        DEPORTIVO,
        LUJOSO
    ];

    const apyToIndex: Record<number, number> = {
        6: 0,
        8: 2,
        10: 1,
        12: 3
    };

    const handleClaimRewards = async (index: number) => {
        if (address) {
            try {
                const transaction = prepareContractCall({
                    contract: StakingContract,
                    method: "claimRewards",
                    params: [BigInt(index)]
                });

                const { transactionHash } = await sendTransaction({
                    transaction,
                    account: address
                });

                const claimReceipt = await waitForReceipt({
                    client: client,
                    chain: chain,
                    transactionHash
                });

                console.log(claimReceipt);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleUnstake = async (index: number) => {
        if (address) {
            try {
                const transaction = prepareContractCall({
                    contract: StakingContract,
                    method: "unstake",
                    params: [BigInt(index)]
                });

                const { transactionHash } = await sendTransaction({
                    transaction,
                    account: address
                });

                const unstakeReceipt = await waitForReceipt({
                    client: client,
                    chain: chain,
                    transactionHash
                });

                console.log(unstakeReceipt);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stakingData?.map((s, index) => {

                    return (
                        <Card className="overflow-hidden" key={index}>
                            <CardContent className="p-0">
                                <Image
                                    src={images[apyToIndex[Number(s.apy)]]}
                                    alt={"ChainCars Staking"}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                            </CardContent>
                            <CardFooter className="flex flex-col items-start gap-2 p-4">
                                <h3 className="font-semibold text-lg text-black">
                                    {categories[apyToIndex[Number(s.apy)]]}
                                </h3>
                                <Badge className="bg-[#a6c36f] text-black">
                                    APY {Number(s.apy)}%
                                </Badge>
                                <Badge>
                                    {s.unstaked ? "Finalizado" : "En Progreso"}
                                </Badge>
                                <h3 className="font-semibold text-lg text-black">
                                    {parseFloat(toEther(s.rewards)).toFixed(4)} USDT
                                </h3>
                                <div className="flex w-full gap-3">
                                    <Button onClick={() => handleClaimRewards(index)} className="w-full">
                                        Reclamar recompensas
                                    </Button>
                                    <Button onClick={() => handleUnstake(index)} className="w-full">
                                        Unstake
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
