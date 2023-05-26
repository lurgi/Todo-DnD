import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { todoState } from "./atoms";
import Board from "./dnds/Board";

const Container = styled.div`
  display: flex;
`;

export default function Home() {
  const [todos, setTodos] = useRecoilState(todoState);
  const keys = Object.keys(todos);
  const onDragEnd = ({
    destination,
    source,
    draggableId,
    type,
  }: DropResult) => {
    console.log(type);

    if (typeof destination?.index !== "number") {
      return;
    }
    if (type === "item") {
      setTodos((oldTodos) => {
        const temp = JSON.parse(JSON.stringify(oldTodos));
        const sourceArr = [...oldTodos[source.droppableId].contents];
        sourceArr.splice(source.index, 1);
        if (destination.droppableId === source.droppableId) {
          sourceArr.splice(destination.index, 0, draggableId);
          temp[source.droppableId].contents = sourceArr;
          return temp;
        } else {
          const destiArr = [...oldTodos[destination.droppableId].contents];
          destiArr.splice(destination.index, 0, draggableId);
          temp[source.droppableId].contents = sourceArr;
          temp[destination.droppableId].contents = destiArr;
          return temp;
        }
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="group" type="group" direction="horizontal">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Container>
              {keys.map((key, i) => (
                <Draggable key={i} index={i} draggableId={`list${i}`}>
                  {(provided) => (
                    <span
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Board category={todos[key].contents} boardId={key} />
                    </span>
                  )}
                </Draggable>
              ))}
            </Container>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
