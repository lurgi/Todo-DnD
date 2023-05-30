import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DraggableBoard from "./DraggableBorad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { todoState } from "../atoms";

const Container = styled.ul`
  width: 100%;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 15px;
  border-radius: 5px;
  position: relative;
  transition: all 0.2s ease-in-out;
  padding-bottom: 50px;
`;
const Title = styled.h2`
  font-weight: 600;
  color: rgb(5, 5, 5);
  margin-bottom: 10px;
`;
const AddIconDiv = styled.div`
  transition: all 0.2s ease-in-out;
  margin-top: 20px;
  font-weight: 500;
  position: absolute;
  bottom: 10px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;

const AddForm = styled.form`
  margin-top: 5px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColorLight};
  border-radius: 5px;
`;

const AddInput = styled.input`
  display: flex;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  padding-left: 5px;
  background-color: ${(props) => props.theme.cardBgColorLight};
  &:focus {
    border: 2px solid ${(props) => props.theme.accentColor};
    outline: none;
  }
`;

const AddBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  color: rgba(5, 5, 5, 0.2);
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
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
  const { register, handleSubmit, setFocus, reset } = useForm();
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
            <AddForm onSubmit={handleSubmit(onValid)}>
              <AddInput
                {...register("newContent", {
                  required: true,
                })}
                placeholder="Write..."
                onBlur={handleBlur}
              />
              <AddBtn type="submit">
                <FontAwesomeIcon
                  icon={icon({ name: "plus", style: "solid" })}
                  style={{ height: 16, width: 16 }}
                />
              </AddBtn>
            </AddForm>
          ) : null}
          <AddIconDiv onClick={handleAdd}>
            <FontAwesomeIcon
              icon={icon({ name: "plus", style: "solid" })}
              style={{ height: 16, width: 16, marginRight: 2 }}
            />
            {`Add New ${category}`}
          </AddIconDiv>
          {magic.placeholder}
        </Container>
      )}
    </Droppable>
  );
}

export default Board;
