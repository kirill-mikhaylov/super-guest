import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  mobileNavOpen: boolean;
  themeMode: 'light' | 'dark';
  setMobileNavOpen: (open: boolean) => void;
  toggleTheme: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      mobileNavOpen: false,
      themeMode: 'light',
      setMobileNavOpen: (open: boolean) => set({ mobileNavOpen: open }),
      toggleTheme: () => {
        const currentMode = get().themeMode;
        set({ themeMode: currentMode === 'light' ? 'dark' : 'light' });
      },
    }),
    {
      name: 'superguest-ui',
    }
  )
);