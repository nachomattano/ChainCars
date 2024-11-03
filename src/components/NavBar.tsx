"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LOGO from "@/assets/logonegro.png"
import { ConnectButton, darkTheme, lightTheme, useActiveAccount } from "thirdweb/react"
import { client } from "@/app/client"

export default function Navbar() {
  const address = useActiveAccount()
  
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { href: "/", label: "Inicio" },
    { href: "/invertir", label: "Invertir" },
    { href: "/rendimientos", label: "Rendimientos" },
  ]

  if (address) {
    menuItems.push({ href: "/misinversiones", label: "Mis Inversiones" });
  }

  return (
    <nav>
      <div className="w-full">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <img className="h-20 w-auto" src={LOGO.src} alt="ChainCars" />
            </Link>
          </div>

          <div className="hidden sm:ml-auto sm:flex sm:items-center">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-bold text-black hover:text-gray-900 hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
            <ConnectButton
              client={client}
              theme={lightTheme({
                colors: { 
                  primaryButtonBg: "#a6c36f",
                  primaryButtonText: "black"
                }
              })}
              connectButton={{ label: "Iniciar sesión" }}
              connectModal={{
                size: "compact",
                showThirdwebBranding: false,
              }}
            />
          </div>
          <div className="sm:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <ConnectButton
                    client={client}
                    theme={lightTheme({
                      colors: { 
                        primaryButtonBg: "#a6c36f",
                        primaryButtonText: "black"
                      }
                    })}
                    connectButton={{ label: "Iniciar sesión" }}
                    connectModal={{
                      size: "compact",
                      showThirdwebBranding: false,
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
