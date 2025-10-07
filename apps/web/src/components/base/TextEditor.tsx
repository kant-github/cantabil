import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { FaChevronUp } from "react-icons/fa";
import { Button } from "../ui/button";
import { motion } from 'framer-motion'
import { Dispatch, useState } from "react";

interface TextEditorProps {
    isExpanded: boolean;
    setIsExpanded: Dispatch<React.SetStateAction<boolean>>;
}

export default function TextEditor({ isExpanded, setIsExpanded }: TextEditorProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const isDisabled = inputValue.trim() === '';

    function handleSubmit() {
        if (!isDisabled) {
            setIsExpanded(true)
        }
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <motion.div
            layout
            initial={false}
            animate={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                x: '-50%',
                width: '56rem',
                height: '12rem',
                maxWidth: 'calc(100% - 48px)',
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
            className="flex items-center justify-center absolute">
            <div className="relative z-10 h-full w-full flex items-center justify-center">
                <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Create a todo application.."
                    className={cn(
                        "h-full w-full border-2 border-neutral-700 py-5 px-7 rounded-4xl shadow-xl",
                        "bg-neutral-900",
                        "focus-visible:border-neutral-700 focus-visible:ring-0",
                        "outline-none transition-all duration-200",
                        "text-neutral-300 tracking-wider resize-none placeholder:text-md"
                    )}
                />
                <Button
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className={cn(
                        "absolute bottom-4 right-4 rounded-full w-8 h-8 flex items-center justify-center p-0",
                        "transition-all duration-200",
                        isDisabled 
                            ? "bg-neutral-700 cursor-not-allowed opacity-50 hover:bg-neutral-700" 
                            : "bg-primary hover:bg-primary/90 hover:scale-105"
                    )}>
                    <FaChevronUp className={cn(
                        "w-3 h-3 transition-colors duration-200",
                        isDisabled ? "text-neutral-500" : "text-white"
                    )} />
                </Button>
            </div>
        </motion.div>
    )
}