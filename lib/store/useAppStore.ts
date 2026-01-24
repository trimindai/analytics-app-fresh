import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, DataSource } from '@/types';

interface AppState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Current Profile
  currentProfileId: string;
  setCurrentProfileId: (id: string) => void;
  
  // Current Dashboard
  currentDashboardId: string;
  setCurrentDashboardId: (id: string) => void;
  
  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  
  // Data Sources
  dataSources: DataSource[];
  addDataSource: (source: DataSource) => void;
  removeDataSource: (id: string) => void;
  
  // Filters
  dateRange: string;
  setDateRange: (range: string) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      
      // Current Profile
      currentProfileId: 'A',
      setCurrentProfileId: (id) => set({ currentProfileId: id }),
      
      // Current Dashboard
      currentDashboardId: 'A1',
      setCurrentDashboardId: (id) => set({ currentDashboardId: id }),
      
      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      // Data Sources
      dataSources: [],
      addDataSource: (source) => set((state) => ({ 
        dataSources: [...state.dataSources, source] 
      })),
      removeDataSource: (id) => set((state) => ({ 
        dataSources: state.dataSources.filter(s => s.id !== id) 
      })),
      
      // Filters
      dateRange: 'today',
      setDateRange: (range) => set({ dateRange: range }),
      selectedBranch: 'all',
      setSelectedBranch: (branch) => set({ selectedBranch: branch }),
    }),
    {
      name: 'trimind-app-store',
      partialize: (state) => ({
        language: state.language,
        currentProfileId: state.currentProfileId,
        currentDashboardId: state.currentDashboardId,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
