import { keyframes, styled } from "styled-components";
import { IAlert, alertState, todoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: 400px;
  height: 250px;
  background-color: ${(props) => props.theme.cardBgColorLight};
  color: ${(props) => props.theme.reverseTextColor};
  border-radius: 15px;
`;
const TextDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 600;
  span {
    margin-bottom: 5px;
  }
`;
const DeleteBtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
const DeleteBtn = styled.button`
  background: none;
  border-radius: 50px;
  outline: none;
  border: 2px solid ${(props) => props.theme.cardBgColor};
  padding: 5px;
  width: 80px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  height: 40px;
  &:hover {
    border-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
  }
`;
function DeleteAlert({ state }: { state: IAlert }) {
  const setAlertState = useSetRecoilState(alertState);
  const setTodoState = useSetRecoilState(todoState);
  const handleBack = () => {
    setAlertState({ category: null, boardId: null, show: false });
  };
  const handleBackStop = (event: any) => {
    event.stopPropagation();
  };
  const handleDelete = () => {
    setTodoState((oldTodos) => {
      const newTodos = [...oldTodos].filter(
        (todo) => todo.id !== +state.boardId!
      );
      return newTodos;
    });
    handleBack();
  };
  return (
    <Wrapper onClick={handleBack}>
      <Container onClick={handleBackStop}>
        <TextDiv>
          <span>{state.category}</span>
          <span> 항목을 삭제하시겠습니까?</span>
        </TextDiv>
        <DeleteBtnContainer>
          <DeleteBtn onClick={handleDelete}>삭제</DeleteBtn>
          <DeleteBtn onClick={handleBack}>돌아가기</DeleteBtn>
        </DeleteBtnContainer>
      </Container>
    </Wrapper>
  );
}

export default DeleteAlert;
