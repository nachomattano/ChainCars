'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChainCarsContract } from "@/utils/contracts"
import { Center, Spinner } from "@chakra-ui/react"
import Image from "next/image"
import { useActiveAccount, useReadContract } from "thirdweb/react"
import { Button } from "../ui/button"
import YARIS from "@/assets/yaris.jpeg"
import VENTO from "@/assets/vento.jpg"
import { Badge } from "../ui/badge"

export default function MisNFTs() {
    const address = useActiveAccount()

    const { data: carsBalance, isPending: isPendingBalance } = useReadContract({
        contract: ChainCarsContract,
        method: "getCarsOwnedByWallet",
        params: [address ? address.address : "0x0000000000000000000000000000000000000000"]
    })

    const { data: allCars, isPending: isPendingCars } = useReadContract({
        contract: ChainCarsContract,
        method: "getAllCars",
        params: []
    })

    const images = [
        YARIS,
        VENTO
    ]

    const categories = [
        "Estándar",
        "Clásico",
        "Deportivo",
        "Lujoso"
    ]

    console.log(allCars)

    return (
        <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {carsBalance?.map((c, index) => {
                    const carIndex = Number(c) - 1;
                    const car = allCars?.[carIndex];

                    if (!car) {
                        // Manejar el caso donde 'car' es undefined
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
                                <Button className="w-full mt-3">Stakear</Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
