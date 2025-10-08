import { FaCheckCircle, FaPenFancy, FaComments, FaUserAstronaut, FaCode } from "react-icons/fa";
export const createIdeas = [
    {
        title: "Create a Todo App",
        description: "Organize your tasks efficiently with a minimal and intuitive interface.",
        logo: FaCheckCircle,
    },
    {
        title: "Create a Blog Platform",
        description: "Write, publish, and manage articles with markdown and rich-text support.",
        logo: FaPenFancy,
    },
    {
        title: "Create a Chat Application",
        description: "Build a real-time messaging app with user authentication and group chats.",
        logo: FaComments,
    },
    {
        title: "Create a Portfolio Website",
        logo: FaUserAstronaut,
    },
    {
        title: "Create a Code Snippet Manager",
        description: "Save, search, and share reusable code snippets in a clean, searchable dashboard.",
        logo: FaCode,
    },
]


export default function DemoIdeas() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-3 z-20">
            <div className="flex items-center justify-center gap-x-3">
                {createIdeas.slice(0, 3).map((idea, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-x-2 bg-[#171717] px-4 py-2 rounded-lg w-fit border-b border-neutral-500 hover:scale-105 transition-transform ease-in duration-200 cursor-pointer">
                        {idea.logo && <idea.logo className="w-3 h-3 text-light" />}
                        <span className="text-xs text-light">{idea.title}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-x-3">
                {createIdeas.slice(3, 5).map((idea, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-x-2 bg-[#171717] px-4 py-2 rounded-lg w-fit border-b border-neutral-500 hover:scale-105 transition-transform ease-in duration-200 cursor-pointer">
                        {idea.logo && <idea.logo className="w-3 h-3 text-light" />}
                        <span className="text-xs text-light">{idea.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
