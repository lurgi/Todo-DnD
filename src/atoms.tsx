import { atom } from "recoil";

interface ITodoDetail {
  contents: string[];
  isAddBox: boolean;
}

interface ITodoState {
  [key: string]: ITodoDetail;
}

export const todoState = atom<ITodoState>({
  key: "todos",
  default: {
    to_do: { contents: ["a", "b", "c"], isAddBox: false },
    doing: { contents: ["d", "e", "f"], isAddBox: false },
    done: { contents: ["h", "i", "j"], isAddBox: false },
  },
});
