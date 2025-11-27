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

type TaskType = {
  id: number;
  name: string;
  description: string;
  isFinished: boolean;
  listId: number;
};

type DataContextType = {
  boards: BoardType[];
  setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
  lists: ListType[];
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
  currListsInBoard: ListType[];
  setCurrListsInBoard: React.Dispatch<React.SetStateAction<ListType[]>>;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  deleteList: (listId: number) => void;
  isMove: boolean;
  setIsMove: React.Dispatch<React.SetStateAction<boolean>>;
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [boards, setBoards] = useState<BoardType[]>(data.boards);
  const [lists, setLists] = useState<ListType[]>(data.lists);
  const [currListsInBoard, setCurrListsInBoard] = useState<ListType[]>(
    data.lists
  );
  const [tasks, setTasks] = useState<TaskType[]>(data.tasks);
  const [isMove, setIsMove] = useState(false);

  const deleteList = (listId: number) => {
    setLists((prev) => prev.filter((list) => list.id !== listId));
    setTasks((prev) => prev.filter((task) => task.listId !== listId));
  };

  return (
    <DataContext.Provider
      value={{
        boards,
        setBoards,
        lists,
        setLists,
        currListsInBoard,
        setCurrListsInBoard,
        tasks,
        setTasks,
        deleteList,
        isMove,
        setIsMove,
      }}
    >
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
