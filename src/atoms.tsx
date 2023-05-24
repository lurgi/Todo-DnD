import { atom } from "recoil";

interface ITodoState {
  [key: string]: string[];
}

export const todoState = atom<ITodoState>({
  key: "todos",
  default: {
    to_do: ["a", "b", "c"],
    doing: ["d", "e", "f"],
    done: ["h", "i", "j"],
  },
});
