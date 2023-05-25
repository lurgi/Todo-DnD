import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DraggableBoard from "./DraggableBorad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";

const Container = styled.ul`
  width: 250px;
  background-color: gray;
  padding: 15px;
  border-radius: 5px;
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
const FlexCenterDiv = styled.div`
  display: flex;
  justify-content: center;
  transition: all 0.2s ease-in-out;
`;

function Board({ category, boardId }: { category: string[]; boardId: string }) {
  const [isAddBox, setIsAddBox] = useState(false);
  const handleAdd = () => {
    setIsAddBox(true);
    console.log(isAddBox);
  };
  return (
    <>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Container ref={magic.innerRef} {...magic.droppableProps}>
            <Title>{boardId.toUpperCase().replaceAll("_", " ")}</Title>
            {category.map((todo, index) => (
              <DraggableBoard
                key={index}
                index={index}
                todo={todo}
              ></DraggableBoard>
            ))}
            <FlexCenterDiv>
              <PlusIconContainer onClick={handleAdd}>
                <FontAwesomeIcon
                  icon={icon({ name: "plus", style: "solid" })}
                  style={{ height: 21, width: 21 }}
                />
              </PlusIconContainer>
            </FlexCenterDiv>
            {magic.placeholder}
          </Container>
        )}
      </Droppable>
    </>
  );
}

export default Board;
