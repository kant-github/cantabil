import { JSX } from "react";
import ChatBoard from "./ChatBoard";
import DashView from "./DashView";

export default function Dashboard(): JSX.Element {
    return (
        <div className="w-full flex-1 grid grid-cols-[30%_70%] bg-dark-base pb-4 px-4">
            <ChatBoard />
            <DashView />
        </div>
    )
}