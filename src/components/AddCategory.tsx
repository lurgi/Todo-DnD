import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { keyframes, styled } from "styled-components";
import { todoState } from "../atoms";

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const IconBox = styled.div`
  color: ${(props) => props.theme.cardBgColor};
  padding: 5px;
  border-radius: 100%;
  border: 2px solid ${(props) => props.theme.cardBgColor};
  transition: all 0.2s ease-in-out;
  animation: ${fadeIn} 0.3s ease-in-out;
  &:hover {
    border-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 15px;
  border-radius: 5px;
  position: relative;
  transition: all 0.2s ease-in-out;
  margin-bottom: 15px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  position: relative;
`;

const TitleForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleInput = styled.input`
  border: 2px solid ${(props) => props.theme.accentColor};
  border-radius: 5px;
  outline: none;
  background: none;
  background-color: ${(props) => props.theme.cardBgColorLight};
  padding: 5px;
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

interface IAddCategroyForm {
  newCategory: string;
}

function AddCategroy() {
  const [addCateogry, setAddCategory] = useState(false);
  const { register, handleSubmit, setFocus, reset } =
    useForm<IAddCategroyForm>();
  const [state, setState] = useRecoilState(todoState);
  const handleInputBlur = (event: any) => {
    if (event.relatedTarget && event.relatedTarget.type === "submit") {
    } else {
      setAddCategory(false);
    }
  };
  const onValid = (form: IAddCategroyForm) => {
    const category = form.newCategory;
    setState((oldTodos) => {
      return [
        ...oldTodos,
        { id: oldTodos.length, category, contents: [], isAddBox: false },
      ];
    });
    reset();
    setAddCategory(false);
  };
  const onAddClick = async () => {
    await setAddCategory(true);
    setFocus("newCategory");
  };
  return (
    <Wrapper>
      {addCateogry ? (
        <Container>
          <TitleContainer>
            <TitleForm onSubmit={handleSubmit(onValid)}>
              <TitleInput
                {...register("newCategory", {
                  required: true,
                  maxLength: 20,
                })}
                onBlur={handleInputBlur}
                placeholder="제목을 입력하세요..."
              />
              <ChangeBtn type="submit">
                <FontAwesomeIcon
                  icon={icon({ name: "arrow-right", style: "solid" })}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </ChangeBtn>
            </TitleForm>
          </TitleContainer>
        </Container>
      ) : null}
      {state.length >= 5 ? null : addCateogry ? null : (
        <IconBox onClick={onAddClick}>
          <FontAwesomeIcon
            style={{ width: 30, height: 30 }}
            icon={icon({ name: "plus", style: "solid" })}
          ></FontAwesomeIcon>
        </IconBox>
      )}
    </Wrapper>
  );
}

export default AddCategroy;
