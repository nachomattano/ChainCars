'use client'

import HERO from "@/assets/hero.jpg"
import { Button } from "../ui/button";


export default function Hero() {
    const scrollDown = () => {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      };

    return (
      <div className="relative h-[60vh] overflow-hidden my-2 min-h-[85vh]">
        <img
          src={HERO.src}
          alt="ChainCars"
          className="w-full h-full object-cover brightness-[0.3] rounded-lg"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h1 className="text-4xl font-bold">Invierte en nuestros mejores autos.</h1>
            <p className="text-xl">Obten rendimientos en unos simples pasos.</p>
            <Button 
            onClick={scrollDown}
            className="ml-4 mt-3 bg-[#a6c36f] text-black font-bold hover:text-white">
                Mas información
            </Button>
        </div>
      </div>
    );
}
  