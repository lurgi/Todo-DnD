import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DraggableBoard from "./DraggableBorad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { watch } from "fs";

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

function Board({
  contents,
  boardId,
  category,
}: {
  contents: string[];
  boardId: string;
  category: string;
}) {
  const [isAddBox, setIsAddBox] = useState(false);
  const handleAdd = () => {
    setIsAddBox(true);
    console.log(isAddBox);
  };
  const handleBlur = () => {
    // setIsAddBox(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef) {
      inputRef?.current?.focus();
    }
  }, [isAddBox]);

  const { register, handleSubmit, watch } = useForm();
  const onValid = (data: any) => {
    console.log("앋놰");
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
            ></DraggableBoard>
          ))}
          <form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("newContent", {
                required: true,
                ref: { inputRef },
              })}
              placeholder="Write..."
              // ref={inputRef}
              onBlur={handleBlur}
            />
          </form>
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
