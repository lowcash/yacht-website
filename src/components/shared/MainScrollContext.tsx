import { type ReactNode, createContext, useContext, useRef } from 'react'

type MainScrollContextValue = {
  mainRef: React.RefObject<HTMLElement | null>
}

const MainScrollContext = createContext<MainScrollContextValue | null>(null)

export function MainScrollProvider({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null)
  return <MainScrollContext.Provider value={{ mainRef }}>{children}</MainScrollContext.Provider>
}

export function useMainScrollRef() {
  const context = useContext(MainScrollContext)
  if (!context) {
    throw new Error('useMainScrollRef must be used within MainScrollProvider')
  }
  return context.mainRef
}
