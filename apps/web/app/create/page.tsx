'use client'
import Dashboard from "@/src/components/base/Dashboard"
import DashNav from "@/src/components/navbars/DashNav"

export default function Page() {

    return (
        <div className="h-screen w-screen relative overflow-hidden flex flex-col">
            <DashNav />
            <Dashboard />
        </div>
    )
}
