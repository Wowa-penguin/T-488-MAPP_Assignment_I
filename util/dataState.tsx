import data from '@/data/data.json';
import React, { createContext, useContext, useState } from 'react';

type BoardType = {
  id: number;
  name: string;
  description: string;
  thumbnailPhoto: string;
};

type ListType = {
  id: number;
  name: string;
  color: string;
  boardId: number;
};

type DataContextType = {
  boards: BoardType[];
  setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
  lists: ListType[];
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [boards, setBoards] = useState<BoardType[]>(data.boards);
  const [lists, setLists] = useState<ListType[]>(data.lists);

  return (
    <DataContext.Provider value={{ boards, setBoards, lists, setLists }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used inside DataProvider');
  }
  return ctx;
};
