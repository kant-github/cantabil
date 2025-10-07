import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { IoIosFlash } from "react-icons/io";

export default function GradientTickers() {
    return (
        <div className="flex justify-center text-center">
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-black text-neutral-300 flex items-center space-x-2"
            >
                <IoIosFlash />
                <span>build real-time apps</span>
            </HoverBorderGradient>
        </div>
    )
}