import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { todoState } from "./atoms";
import Board from "./Board";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
`;

export default function Home() {
  const [todos, setTodos] = useRecoilState(todoState);
  const keys = Object.keys(todos);
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    console.log(destination, source, draggableId);

    if (typeof destination?.index !== "number") {
      return;
    }
    setTodos((oldTodos) => {
      const temp = JSON.parse(JSON.stringify(oldTodos));
      console.log(temp);
      const sourceArr = [...oldTodos[source.droppableId]];
      sourceArr.splice(source.index, 1);
      if (destination.droppableId === source.droppableId) {
        sourceArr.splice(destination.index, 0, draggableId);
        temp[source.droppableId] = sourceArr;
        return temp;
      } else {
        const destiArr = [...oldTodos[destination.droppableId]];
        destiArr.splice(destination.index, 0, draggableId);
        temp[source.droppableId] = sourceArr;
        temp[destination.droppableId] = destiArr;
        return temp;
      }
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {keys.map((key, i) => (
          <Board key={i} category={todos[key]} boardId={key} />
        ))}
      </Container>
    </DragDropContext>
  );
}
