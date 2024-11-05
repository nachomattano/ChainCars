'use client'

import { ChainCarsAddress, ChainCarsContract, USDTContract } from "@/utils/contracts"
import { useActiveAccount, useReadContract } from "thirdweb/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import YARIS from "@/assets/yaris.jpeg"
import VENTO from "@/assets/vento.jpg"
import MUSTANG from "@/assets/mustang.webp"
import ROLSSROYCE from "@/assets/rollsroyce.jpg"
import { Badge } from "@/components/ui/badge"
import { approve } from "thirdweb/extensions/erc20";
import { prepareContractCall, sendTransaction, toEther, waitForReceipt } from "thirdweb"
import { client } from "../client"
import { chain } from "../chain"
import { Progress } from "@/components/ui/progress"

export default function Invertir() {
    const address = useActiveAccount()

    const { data: allCars, isPending: isPendingCars } = useReadContract({
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

    const handleTransaction = async (price: string | undefined, index: number) => {
        if (address) {
            try {
                const formatedPrice = Number(price)

                const app = await approve({
                    contract: USDTContract,
                    spender: ChainCarsAddress,
                    amount: price ? formatedPrice : "0"
                })

                const { transactionHash: approveHash } = await sendTransaction({
                    transaction: app,
                    account: address
                })

                const approveReceipt = await waitForReceipt({
                    client: client,
                    chain: chain,
                    transactionHash: approveHash
                })

                console.log(approveReceipt)

                const transaction = prepareContractCall({
                    contract: ChainCarsContract,
                    method: "mintCar",
                    params: [BigInt(index), BigInt(1)]
                })

                const { transactionHash: mintHash } = await sendTransaction({
                    transaction,
                    account: address
                })

                const mintReceipt = await waitForReceipt({
                    client: client,
                    chain: chain,
                    transactionHash: mintHash
                })

                console.log(mintReceipt)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allCars?.map((c, index) => (
                <Card className="overflow-hidden" key={index}>
                    <CardContent className="p-0">
                        <Image
                            src={images[index]}
                            alt={c.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                        />
                        </CardContent>
                    <CardFooter className="flex flex-col items-start gap-2 p-4">
                        <Badge className="bg-[#a6c36f] text-black">{categories[Number(c.category) - 1]}</Badge>
                        <h3 className="font-semibold text-lg text-black">{c.name}</h3>
                        <p className="text-gray300 text-sm">{c.description}</p>
                        <Button onClick={() => handleTransaction(toEther(c.price), index + 1)} className="w-full mt-3">Comprar - {toEther(c.price)} USDT</Button>
                    </CardFooter>
                </Card>
            ))}
            </div>
        </div>
    )
}