import { atom } from "recoil";

interface ITodoDetail {
  id: number;
  category: string;
  contents: string[];
  isAddBox: boolean;
}

export const todoState = atom<ITodoDetail[]>({
  key: "todos",
  default: [
    { id: 0, category: "To Do", contents: ["a", "b", "c"], isAddBox: false },
    { id: 1, category: "Doing", contents: ["d", "e", "f"], isAddBox: false },
    { id: 2, category: "Done", contents: ["h", "i", "j"], isAddBox: false },
  ],
});
