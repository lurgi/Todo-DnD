import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";

const Item = styled.li<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "rgb(39, 39, 39)" : "whitesmoke"};
  color: ${(props) => (props.isDragging ? "whitesmoke" : "rgb(5, 5, 5)")};
  padding: 5px;
  margin-top: 5px;
  border-radius: 3px;
`;

interface IDraggableBoard {
  todo: string;
  index: number;
}

function DraggableBoard({ todo, index }: IDraggableBoard) {
  console.log(todo);
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
        </Item>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableBoard);
