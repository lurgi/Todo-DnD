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

const BoardContainer = styled.div<{ onVertical: boolean; snapshot: boolean }>`
  max-width: 550px;
  margin: ${(props) =>
    props.onVertical ? "0px 0px 20px" : "0px 20px 0px 0px"};
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: ${(props) =>
    props.snapshot
      ? "0px 2px 15px 1px rgba(5,5,5,0.2)"
      : "0px 1px 3px 0px rgba(5,5,5,0.2)"};
`;

export default function Home() {
  const [todos, setTodos] = useRecoilState(todoState);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const onDragEnd = ({ destination, source, type }: DropResult) => {
    if (destination && type === "item") {
      if (destination.droppableId === source.droppableId) {
        setTodos((oldTodos) => {
          const returnTodos = [];
          for (let oldTodo of oldTodos) {
            if (oldTodo.id + "" === destination.droppableId) {
              const newTodo = JSON.parse(JSON.stringify(oldTodo));
              const temp = newTodo.contents.splice(source.index, 1)[0];
              newTodo.contents.splice(destination.index, 0, temp);
              returnTodos.push(newTodo);
            } else {
              returnTodos.push(oldTodo);
            }
          }
          return returnTodos;
        });
      } else {
        setTodos((oldTodos) => {
          const newTodos = JSON.parse(JSON.stringify(oldTodos));
          let temp = newTodos
            .find((v: any) => v.id + "" === source.droppableId)
            .contents.splice(source.index, 1)[0];
          newTodos
            .find((v: any) => v.id + "" === destination.droppableId)
            .contents.splice(destination.index, 0, temp);
          return newTodos;
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
                  {(provided, snapshot) => (
                    <BoardContainer
                      snapshot={snapshot.isDropAnimating}
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
