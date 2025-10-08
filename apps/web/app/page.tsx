'use client'
import DemoIdeas from "@/src/components/base/DemoIdeas"
import TextEditor from "@/src/components/base/TextEditor"
import Navbar from "@/src/components/navbars/Navbar"
import Heading from "@/src/components/texts/Heading"
import SubHeading from "@/src/components/texts/SubHeading"
import Beams from "@/src/components/tickers/Beams"
import GradientTickers from "@/src/components/tickers/GradientTickers"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"


export default function Page() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
      >
        <Image
          src={'/images/gradient.png'}
          alt="gradient"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>


      <Navbar />

      <div className="relative flex flex-col gap-y-8 items-center justify-center mt-40 max-w-3xl mx-auto">
        <GradientTickers />
        <Heading />
        <SubHeading />
      </div>

      <div className="absolute bottom-[1rem] left-[50%] -translate-x-[50%] w-7xl">
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-y-4">
          <DemoIdeas />
          <TextEditor isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
      </div>

      <Beams className="absolute left-[25%] -translate-x-40 top-[30%]" />
      <Beams className="absolute right-[25%] translate-x-40 top-[30%] rotate-y-180" />
    </div>
  )
}
