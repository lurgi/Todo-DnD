import { atom } from "recoil";

interface IContents {
  id: number;
  content: string;
}

interface ITodoDetail {
  id: number;
  category: string;
  contents: IContents[];
  isAddBox: boolean;
}

export const todoState = atom<ITodoDetail[]>({
  key: "todos",
  default: localStorage.getItem("todo-state")
    ? JSON.parse(localStorage.getItem("todo-state")!)
    : [],
});

export interface IAlert {
  category: string | null;
  show: boolean;
  boardId: string | null;
}
export const alertState = atom<IAlert>({
  key: "alert",
  default: {
    category: null,
    show: false,
    boardId: null,
  },
});
