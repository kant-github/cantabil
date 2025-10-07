'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import RadialGradient from '@/src/components/base/RadialGradient'
import { Textarea } from '@/src/components/ui/textarea'
import { FaCaretRight } from 'react-icons/fa'

export default function Page() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = () => {
        if (inputValue.trim()) {
            setIsExpanded(true)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="h-screen w-full max-w-full relative overflow-hidden">
            <RadialGradient />

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="relative z-10 h-full w-full flex"
                    >
                        {/* Left Section - Chat Area */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex-1 flex flex-col h-full"
                        >
                            {/* Chat Messages */}
                            <div className="flex-1 p-6 overflow-y-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 }}
                                    className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 mb-4"
                                >
                                    <p className="text-sm text-neutral-400 mb-1">You</p>
                                    <p className="text-neutral-200">{inputValue}</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.8 }}
                                    className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4"
                                >
                                    <p className="text-sm text-neutral-400 mb-1">Assistant</p>
                                    <p className="text-neutral-200">I'll help you create that application. Let me start building it...</p>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Section - Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="w-2/5 h-full border-l border-neutral-800 bg-neutral-950/50 p-6"
                        >
                            <div className="h-full rounded-lg border border-neutral-800 bg-neutral-900/30 flex items-center justify-center">
                                <p className="text-neutral-500">Preview Area</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Textarea - Animated */}
            <motion.div
                layout
                initial={false}
                animate={
                    isExpanded
                        ? {
                            position: 'absolute',
                            bottom: 24,
                            left: 24,
                            top: 'auto',
                            width: 'calc(60% - 48px)',
                            height: '120px',
                            maxWidth: '100%',
                        }
                        : {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            x: '-50%',
                            y: '-50%',
                            width: '56rem',
                            height: '18rem',
                            maxWidth: 'calc(100% - 48px)',
                        }
                }
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                }}
                className="z-20"
            >
                <div className="relative h-full w-full">
                    <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Create a todo application.."
                        className={cn(
                            'h-full w-full border border-neutral-800 p-5 resize-none',
                            'focus-visible:border-neutral-700 focus-visible:ring-0',
                            'outline-none transition-all duration-200',
                            'text-neutral-300 tracking-wider bg-neutral-950/80'
                        )}
                    />
                    <Button
                        onClick={handleSubmit}
                        className="absolute bottom-4 right-4 bg-primary rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        <FaCaretRight className="w-6 h-6" />
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}


