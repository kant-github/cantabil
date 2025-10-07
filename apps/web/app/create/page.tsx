'use client'

import TextEditor from "@/src/components/base/TextEditor"
import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

export default function Page() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <div className="h-screen w-screen relative overflow-hidden">
            <Image
                src={'/images/gradient.png'}
                alt="gradient"
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 right-0 bottom-0 z-0"
            />
            <AnimatePresence>
            </AnimatePresence>
            <TextEditor isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
    )
}
