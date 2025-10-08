import { CurrentView, useCurrentViewStore } from "@/src/store/project/useCurrentViewStore";
import { JSX } from "react";
import LivePreview from "./LivePreview";

import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import('../code/CodeEditor'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p>Loading editor...</p>
    </div>
  )
});

export default function DashView(): JSX.Element {

    const { currentView } = useCurrentViewStore()

    function renderView() {
        switch (currentView) {
            case CurrentView.EDITOR:
                return <CodeEditor />
            case CurrentView.PREVIEW:
                return <LivePreview />
            default:
                return <div>Unknown view</div>
        }
    }

    return (
        <div className="border border-neutral-800 rounded-lg overflow-hidden">
            {renderView()}
        </div>
    )
}