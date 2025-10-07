'use client'
import TextEditor from "@/src/components/base/TextEditor"
import Navbar from "@/src/components/navbars/Navbar"
import Heading from "@/src/components/texts/Heading"
import SubHeading from "@/src/components/texts/SubHeading"
import GradientTickers from "@/src/components/tickers/GradientTickers"
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
      <Navbar />
      <div className="relative flex flex-col gap-y-8 items-center justify-center mt-40 max-w-3xl mx-auto">
        <GradientTickers />
        <Heading />
        <SubHeading />
      </div>
      <AnimatePresence>
      </AnimatePresence>
      <TextEditor isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </div>
  )
}
