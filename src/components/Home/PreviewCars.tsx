'use client'

import { ChainCarsContract } from "@/utils/contracts"
import { useReadContract } from "thirdweb/react"
import YARIS from "@/assets/yaris.jpeg"
import VENTO from "@/assets/vento.jpg"
import { Card, CardContent, CardFooter } from "../ui/card"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import Link from "next/link"

export default function PreviewCars() {
    
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
        "Clasico",
        "Deportivo",
        "Lujoso"
    ]
    
    return (
        <div className="mt-10">
            <h3 className="text-3xl font-bold mb-8 text-center">Nuestros autos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {allCars?.slice(0,3).map((c, index) => (
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
                            <Badge className="bg-[#a6c36f] text-black">{categories[Number(c.category)]}</Badge>
                            <h3 className="font-semibold text-lg text-black">{c.name}</h3>
                            <p className="text-gray300 text-sm">{c.description}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <Link href={'/invertir'}>
                    <Button>Ver más</Button>
                </Link>
            </div>
        </div>
    )
}