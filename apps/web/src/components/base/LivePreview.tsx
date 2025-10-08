import { GiNinjaHead } from "react-icons/gi";
import { TextShimmer } from "../texts/ShimmerText";

export default function LivePreview() {
    return (
        <div className="w-full h-full bg-dark-base flex items-center justify-center text-xs text-light">
            <div className="flex flex-col items-center justify-center gap-y-4">
                <GiNinjaHead className='text-light/30 h-20 w-20' />
                <TextShimmer className="text-xl font-semibold text-light/10">Your preview will appear here</TextShimmer>
            </div>
        </div>
    )
}