import MisNFTs from "@/components/MisInversiones/MisNFTs"
import MisRendimientos from "@/components/MisInversiones/MisRendimientos"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MisInversiones() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Mis Inversiones</h1>
            <Tabs defaultValue="nfts" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black text-white">
                    <TabsTrigger value="nfts">Mis NFTs</TabsTrigger>
                    <TabsTrigger value="rendimientos">Mis Rendimientos</TabsTrigger>
                </TabsList>
                <TabsContent value="nfts">
                    <MisNFTs />
                </TabsContent>
                <TabsContent value="rendimientos">
                    <MisRendimientos />
                </TabsContent>
            </Tabs>
        </div>
    )
}