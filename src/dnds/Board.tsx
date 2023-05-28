import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DraggableBoard from "./DraggableBorad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { watch } from "fs";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoState } from "../atoms";

const Container = styled.ul`
  width: 250px;
  background-color: gray;
  padding: 15px;
  border-radius: 5px;
  position: relative;
  padding-bottom: 70px;
`;
const Title = styled.h2`
  font-weight: 600;
  color: rgb(5, 5, 5);
  margin-bottom: 10px;
`;
const PlusIconContainer = styled.div`
  background-color: #e4a8a8;
  border-radius: 50px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #d89f9f;
    cursor: pointer;
  }
`;
const AddIconDiv = styled.div`
  transition: all 0.2s ease-in-out;
  position: absolute;
  bottom: 10px;
  right: 50%;
  transform: translateX(50%);
`;

const AddInput = styled.input`
  width: 100%;
  margin-top: 5px;
  height: 30px;
`;

function Board({
  contents,
  boardId,
  category,
}: {
  contents: string[];
  boardId: string;
  category: string;
}) {
  const setState = useSetRecoilState(todoState);
  const [isAddBox, setIsAddBox] = useState(false);
  const { register, handleSubmit, watch, setFocus, reset } = useForm();
  const handleAdd = async () => {
    await setIsAddBox(true);
    setFocus("newContent");
  };
  const handleBlur = () => {
    setIsAddBox(false);
    reset();
  };
  const onValid = (data: any) => {
    setState((oldTodos) => {
      const newTodos = JSON.parse(JSON.stringify(oldTodos));
      for (let newTodo of newTodos) {
        if (newTodo.category === category) {
          newTodo.contents.push(data.newContent);
        }
      }
      return newTodos;
    });
    reset();
  };
  return (
    <Droppable droppableId={boardId} type="item">
      {(magic, snapshot) => (
        <Container ref={magic.innerRef} {...magic.droppableProps}>
          <Title>{category}</Title>
          {contents.map((todo, index) => (
            <DraggableBoard
              key={index}
              index={index}
              todo={todo}
              category={category}
            ></DraggableBoard>
          ))}
          {isAddBox ? (
            <form onSubmit={handleSubmit(onValid)}>
              <AddInput
                {...register("newContent", {
                  required: true,
                })}
                placeholder="Write..."
                onBlur={handleBlur}
              />
            </form>
          ) : null}
          <AddIconDiv>
            <PlusIconContainer onClick={handleAdd}>
              <FontAwesomeIcon
                icon={icon({ name: "plus", style: "solid" })}
                style={{ height: 21, width: 21 }}
              />
            </PlusIconContainer>
          </AddIconDiv>
          {magic.placeholder}
        </Container>
      )}
    </Droppable>
  );
}

export default Board;
