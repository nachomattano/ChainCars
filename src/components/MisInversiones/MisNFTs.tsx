'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChainCarsContract, StakingAddress, StakingContract } from "@/utils/contracts"
import Image from "next/image"
import { useActiveAccount, useReadContract } from "thirdweb/react"
import { Button } from "../ui/button"
import YARIS from "@/assets/yaris.jpeg"
import VENTO from "@/assets/vento.jpg"
import MUSTANG from "@/assets/mustang.webp"
import ROLSSROYCE from "@/assets/rollsroyce.jpg"
import { Badge } from "../ui/badge"
import { client } from "@/app/client"
import { chain } from "@/app/chain"
import { prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb"

export default function MisNFTs() {
    const address = useActiveAccount()

    const { data: carsBalance } = useReadContract({
        contract: ChainCarsContract,
        method: "getCarsOwnedByWallet",
        params: [address ? address.address : "0x0000000000000000000000000000000000000000"]
    })

    const { data: allCars } = useReadContract({
        contract: ChainCarsContract,
        method: "getAllCars",
        params: []
    })

    const images = [
        VENTO,
        YARIS,
        MUSTANG,
        ROLSSROYCE
    ]

    const categories = [
        "Estándar",
        "Deportivo",
        "Clasico",
        "Lujoso"
    ]

    console.log(allCars)

    const handleStaking = async (id: number) => {
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
                    params: [BigInt(id), BigInt(1)]
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
        <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {carsBalance?.map((c, index) => {
                    const carIndex = Number(c) - 1;
                    const car = allCars?.[carIndex];

                    if (!car) {
                        return null;
                    }

                    return (
                        <Card className="overflow-hidden" key={index}>
                            <CardContent className="p-0">
                                <Image
                                    src={images[carIndex]}
                                    alt={car.name}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />    
                            </CardContent>
                            <CardFooter className="flex flex-col items-start gap-2 p-4">
                                <Badge className="bg-[#a6c36f] text-black">
                                    {categories[Number(car.category) - 1]}
                                </Badge>
                                <h3 className="font-semibold text-lg text-black">
                                    {car.name}
                                </h3>
                                <Button onClick={() => handleStaking(Number(c))} className="w-full">Stakear</Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
