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

const HomeContainer = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const BoardContainer = styled.div`
  width: 80vw;
  max-width: 600px;
  margin-bottom: 20px;
`;

export default function Home() {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = ({
    destination,
    source,
    draggableId,
    type,
  }: DropResult) => {
    if (destination && type === "item") {
      if (destination.droppableId === source.droppableId) {
        setTodos((oldTodos) => {
          const returnTodos = [];
          for (let oldTodo of oldTodos) {
            if (oldTodo.id + "" === destination.droppableId) {
              const newTodo = JSON.parse(JSON.stringify(oldTodo));
              newTodo.contents.splice(source.index, 1);
              newTodo.contents.splice(destination.index, 0, draggableId);
              returnTodos.push(newTodo);
            } else {
              returnTodos.push(oldTodo);
            }
          }
          return returnTodos;
        });
      } else {
        setTodos((oldTodos) => {
          const returnTodos = [];
          for (let oldTodo of oldTodos) {
            if (oldTodo.id + "" === destination.droppableId) {
              const newTodo = JSON.parse(JSON.stringify(oldTodo));
              newTodo.contents.splice(destination.index, 0, draggableId);
              returnTodos.push(newTodo);
            } else if (oldTodo.id + "" === source.droppableId) {
              const newTodo = JSON.parse(JSON.stringify(oldTodo));
              newTodo.contents.splice(source.index, 1);
              returnTodos.push(newTodo);
            } else {
              returnTodos.push(oldTodo);
            }
          }
          return returnTodos;
        });
      }
    } else if (destination && type === "group") {
      setTodos((oldTodos) => {
        const sourceObj = JSON.parse(JSON.stringify(oldTodos[source.index]));
        const newTodos = JSON.parse(JSON.stringify(oldTodos));
        newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, sourceObj);
        return newTodos;
      });
    }
  };
  return (
    <HomeContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="group" type="group" /*direction="horizontal"*/>
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((value, index) => (
                <Draggable
                  key={value.id}
                  index={index}
                  draggableId={value.id + ""}
                >
                  {(provided) => (
                    <BoardContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Board
                        contents={value.contents}
                        boardId={value.id + ""}
                        category={value.category}
                      />
                    </BoardContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </HomeContainer>
  );
}
