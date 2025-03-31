import React, { createContext, useContext, useState } from 'react';

// Create the context
const SelectedItemContext = createContext<{
  selectedItem: string;
  setSelectedItem: (item: string) => void;
} | null>(null);

// Provider component
export const SelectedItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState('Home'); // Shared state

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SelectedItemContext.Provider>
  );
};

// Custom hook to use the context
export const useSelectedItem = () => {
  const context = useContext(SelectedItemContext);
  if (!context) {
    throw new Error('useSelectedItem must be used within a SelectedItemProvider');
  }
  return context;
};