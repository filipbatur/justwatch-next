'use client';

import { Movies } from '@/types/global';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';

type GenericSetter<T> = React.Dispatch<React.SetStateAction<T>>;

interface LocalStorageContextType {
  watchlist: Movies;
  setWatchlist: GenericSetter<Movies>;
  recentSearches: string[];
  setRecentSearches: GenericSetter<string[]>;
}

// Create context with a default value
const LocalStorageContext = createContext<LocalStorageContextType | undefined>(
  undefined
);

// Define the provider component
interface LocalStorageProviderProps {
  children: ReactNode;
}

export const LocalStorageProvider: React.FC<LocalStorageProviderProps> = ({
  children
}) => {
  const [watchlist, setWatchlist] = useState<Movies>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const wl = localStorage.getItem('watchlist')
      ? JSON.parse(localStorage.getItem('watchlist') as string)
      : [];

    const rs = localStorage.getItem('recentSearches')
      ? JSON.parse(localStorage.getItem('recentSearches') as string)
      : [];

    setWatchlist(wl);
    setRecentSearches(rs);
  }, []);

  return (
    <LocalStorageContext.Provider
      value={{
        watchlist,
        setWatchlist,
        recentSearches,
        setRecentSearches
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

// Custom hook to use the context easily
export const useLocalStorageContext = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error('useLocalStorageContext must be used within a MyProvider');
  }
  return context;
};
