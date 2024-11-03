'use client'

import { useActiveAccount } from "thirdweb/react"

export default function MisRendimientos() {
    const address = useActiveAccount()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        </div>
    )
}