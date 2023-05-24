import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DraggableBoard from "./DraggableBorad";

const Container = styled.ul`
  width: 250px;
  background-color: gray;
  padding: 15px;
  border-radius: 5px;
  height: 50vh;
`;
const Title = styled.h2`
  font-weight: 600;
  color: rgb(5, 5, 5);
  margin-bottom: 10px;
`;

function Board({ category, boardId }: { category: string[]; boardId: string }) {
  return (
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
          {magic.placeholder}
        </Container>
      )}
    </Droppable>
  );
}

export default Board;
