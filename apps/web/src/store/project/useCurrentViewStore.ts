import { create } from 'zustand'

export enum CurrentView {
  PREVIEW = 'PREVIEW',
  EDITOR = 'EDITOR',
}

// Define the store interface
interface CurrentViewState {
  currentView: CurrentView
  setCurrentView: (view: CurrentView) => void
}

// Create the store
export const useCurrentViewStore = create<CurrentViewState>((set) => ({
  currentView: CurrentView.PREVIEW, // initial state
  setCurrentView: (view: CurrentView) => set({ currentView: view }),
}))
