import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
`;

function DeleteAlert({
  boardId,
  category,
}: {
  boardId: string;
  category: string;
}) {
  return <Wrapper>hi</Wrapper>;
}

export default DeleteAlert;
