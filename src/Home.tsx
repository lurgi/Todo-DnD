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
import AddCategroy from "./components/AddCategory";
import { useEffect, useState } from "react";

const HomeContainer = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const getColumnTemplate = (todoCount: number) => {
  const columnCount = Math.min(todoCount + 1, 5);
  return `repeat(${columnCount}, 1fr)`;
};

const Container = styled.div<{ onVertical: boolean; todoCount: number }>`
  display: grid;
  align-items: start;
  padding: ${(props) => (props.onVertical ? "" : "0px 50px")};
  width: ${(props) => (props.onVertical ? "450px" : "100%")};
  grid-template-columns: ${(props) =>
    props.onVertical ? "1fr" : getColumnTemplate(props.todoCount)};
`;

const BoardContainer = styled.div<{ onVertical: boolean }>`
  max-width: 550px;
  margin: ${(props) =>
    props.onVertical ? "0px 0px 20px" : "0px 20px 0px 0px"};
`;

export default function Home() {
  const [todos, setTodos] = useRecoilState(todoState);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
  useEffect(() => {
    const handleWindowSizse = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowSizse);
    return () => {
      window.removeEventListener("resize", handleWindowSizse);
    };
  }, [windowWidth]);
  return (
    <HomeContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="group"
          type="group"
          direction={windowWidth < 1000 ? "vertical" : "horizontal"}
        >
          {(provided) => (
            <Container
              onVertical={windowWidth < 1000}
              todoCount={todos.length}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((value, index) => (
                <Draggable
                  key={value.id}
                  index={index}
                  draggableId={value.id + ""}
                >
                  {(provided) => (
                    <BoardContainer
                      onVertical={windowWidth < 1000}
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
              <AddCategroy />
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </HomeContainer>
  );
}
