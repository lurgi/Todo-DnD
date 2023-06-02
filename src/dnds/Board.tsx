import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DraggableBoard from "./DraggableBorad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { todoState } from "../atoms";
import BoardMenu from "../components/BoardMenu";

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 15px;
  border-radius: 5px;
  position: relative;
  transition: all 0.2s ease-in-out;
  padding-bottom: 50px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  position: relative;
`;
const Title = styled.h2`
  font-weight: 600;
  color: rgb(5, 5, 5);
  margin-bottom: 2px;
  margin-left: 2px;
`;
const AddIconDiv = styled.div`
  transition: all 0.2s ease-in-out;
  margin-top: 30px;
  font-weight: 500;
  position: absolute;
  bottom: 15px;
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
    cursor: pointer;
  }
`;
const TitleForm = styled.form`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleInput = styled.input`
  border: 2px solid ${(props) => props.theme.accentColor};
  border-radius: 5px;
  outline: none;
  background: none;
  padding: 3px;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
`;
const ChangeBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  color: ${(props) => props.theme.cardBgColorLight};
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
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
  const [isCategoryModify, setIsCategoryModify] = useState(false);
  const { register, handleSubmit, setFocus, reset } = useForm();
  const handleAdd = async () => {
    await setIsAddBox(true);
    setFocus("newContent");
    reset();
  };
  const handleBlur = () => {
    setIsAddBox(false);
    reset();
  };
  const handleCategoryBlur = () => {
    setIsCategoryModify(false);
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
  const onCategoryValid = (data: any) => {
    setState((oldTodos) => {
      const newTodos = JSON.parse(JSON.stringify(oldTodos));
      for (let newTodo of newTodos) {
        if (+newTodo.id === +boardId) {
          newTodo.category = data.category;
        }
      }
      return newTodos;
    });
    handleCategoryBlur();
  };

  return (
    <Droppable droppableId={boardId} type="item">
      {(magic, snapshot) => (
        <Container ref={magic.innerRef} {...magic.droppableProps}>
          <TitleContainer>
            {isCategoryModify ? (
              <TitleForm onSubmit={handleSubmit(onCategoryValid)}>
                <TitleInput
                  {...register("category", {
                    value: category,
                    required: true,
                    maxLength: 20,
                  })}
                  onBlur={handleCategoryBlur}
                />
                <ChangeBtn type="submit">
                  <FontAwesomeIcon
                    icon={icon({ name: "arrows-rotate", style: "solid" })}
                    style={{
                      height: 18,
                      width: 18,
                    }}
                  />
                </ChangeBtn>
              </TitleForm>
            ) : (
              <Title>{category}</Title>
            )}
            <BoardMenu
              boardId={boardId}
              category={category}
              setFocus={setFocus}
              setState={setIsCategoryModify}
            />
          </TitleContainer>
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
            {`${category} 추가하기`}
          </AddIconDiv>
          {magic.placeholder}
        </Container>
      )}
    </Droppable>
  );
}

export default Board;
