'use client';

import { ChainCarsContract, StakingAddress, StakingContract } from "@/utils/contracts";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import ESTANDAR from "@/assets/estandar.webp";
import CLASICO from "@/assets/clasico.webp";
import DEPORTIVO from "@/assets/deportivo.webp";
import LUJOSO from "@/assets/lujoso.webp";
import { useState } from "react";
import { prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { client } from "../client";
import { chain } from "../chain";
import Link from "next/link";

export default function Rendimientos() {
    const [stakeAmounts, setStakeAmounts] = useState(Array(4).fill(1));

    const address = useActiveAccount()

    const handleSelectChange = (index: number, value: number) => {
        const newStakeAmounts = [...stakeAmounts];
        newStakeAmounts[index] = value;
        setStakeAmounts(newStakeAmounts);
    };

    const categories = [
        "Estándar",
        "Deportivo",
        "Clásico",
        "Lujoso"
    ];

    const images = [
        ESTANDAR,
        DEPORTIVO,
        CLASICO,
        LUJOSO
    ];

    const apy = [
        6,
        8,
        10,
        12
    ]

    const handleStaking = async (index: number) => {
        if (address) {
            try {
                const app = prepareContractCall({
                    contract: ChainCarsContract,
                    method: "setApprovalForAll",
                    params: [StakingAddress, true]
                })

                const { transactionHash: appHash } = await sendTransaction({
                    transaction: app,
                    account: address
                })

                const approveReceipt = await waitForReceipt({
                    client: client,
                    chain: chain,
                    transactionHash: appHash
                })

                console.log(approveReceipt)

                const transaction = prepareContractCall({
                    contract: StakingContract,
                    method: "stake",
                    params: [BigInt(index + 1), stakeAmounts[index]]
                })

                const { transactionHash: stakeHash } = await sendTransaction({
                    transaction,
                    account: address
                })

                const stakeReceipt = await waitForReceipt({
                    client: client,
                    chain: chain,
                    transactionHash: stakeHash
                })

                console.log(stakeReceipt)

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="mt-10 px-5">
            <h3 className="text-3xl font-bold">Obtené rendimientos</h3>
            <p>Stakea tus NFTs y generá recompensas en USDT mes a mes</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {categories.map((category, index) => (
                    <Card className="overflow-hidden" key={index}>
                        <CardContent className="p-0">
                            <Image
                                src={images[index]}
                                alt={`ChainCars ${category} Staking`}
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-2 p-4">
                            <h3 className="font-semibold text-lg text-black">
                                {category}
                            </h3>
                            <Badge className="bg-[#a6c36f] text-black">
                                APY {apy[index]}% 
                            </Badge>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <Link href={'/misinversiones'}>
                    <Button>Stakear</Button>
                </Link>
            </div>
        </div>
    );
}
