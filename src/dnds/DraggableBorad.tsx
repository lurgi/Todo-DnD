import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { todoState } from "../atoms";

const Item = styled.li<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "rgb(39, 39, 39)" : props.theme.cardBgColorLight};
  color: ${(props) => (props.isDragging ? "whitesmoke" : "rgb(5, 5, 5)")};
  padding: 5px;
  margin-top: 5px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 18px;
  transition: all 0.2s ease-in-out;
`;

const IconContainer = styled.div`
  opacity: 0.2;
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 1;
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;

interface IDraggableBoard {
  todo: string;
  index: number;
  category: string;
}

function DraggableBoard({ todo, index, category }: IDraggableBoard) {
  const setState = useSetRecoilState(todoState);
  const handleDelete = () => {
    setState((oldTodos) => {
      const newTodos = JSON.parse(JSON.stringify(oldTodos));
      for (let newTodo of newTodos) {
        if (newTodo.category === category) {
          newTodo.contents.splice(index, 1);
        }
      }
      return newTodos;
    });
  };
  return (
    <Draggable draggableId={todo} index={index} key={todo}>
      {(magic, snapshot) => (
        <Item
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todo}
          <IconContainer onClick={handleDelete}>
            <FontAwesomeIcon
              style={{ width: 20 }}
              icon={icon({ name: "square-minus", style: "regular" })}
            ></FontAwesomeIcon>
          </IconContainer>
        </Item>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableBoard);
