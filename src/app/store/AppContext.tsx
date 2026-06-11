import React, { createContext, useContext, useState, ReactNode } from 'react';

type Option = 'A' | 'B' | null;

interface AppState {
  votedOption: Option;
  setVotedOption: (opt: Option) => void;
  userTag: string | null;
  setUserTag: (tag: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [votedOption, setVotedOption] = useState<Option>(null);
  const [userTag, setUserTag] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ votedOption, setVotedOption, userTag, setUserTag, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
