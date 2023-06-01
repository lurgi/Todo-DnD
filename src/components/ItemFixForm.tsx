import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "../atoms";

interface IFixFormProps {
  value: string;
  index: number;
  onBlur: any;
  category: string;
}

const AddForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColorLight};
  border-radius: 5px;
  position: relative;
`;

const AddInput = styled.input`
  display: flex;
  font-size: 18px;
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
  position: absolute;
  right: 0;
  bottom: 5px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;

interface IForm {
  fixItem: string;
}

function ItemFixForm({ value, index, onBlur, category }: IFixFormProps) {
  const { register, handleSubmit, setFocus } = useForm<IForm>();
  const setState = useSetRecoilState(todoState);
  const onValid = ({ fixItem }: IForm) => {
    onBlur();
    setState((oldTodos) => {
      const newTodos = JSON.parse(JSON.stringify(oldTodos));
      for (let newTodo of newTodos) {
        if (newTodo.category === category) {
          newTodo.contents[index] = fixItem;
        }
      }
      return newTodos;
    });
  };
  useEffect(() => {
    setFocus("fixItem");
  }, [setFocus]);
  return (
    <AddForm onSubmit={handleSubmit(onValid)} onBlur={onBlur}>
      <AddInput
        {...register("fixItem", {
          required: true,
          value,
          maxLength: 24,
        })}
        placeholder="Write..."
      />
      <AddBtn type="submit">
        <FontAwesomeIcon
          icon={icon({ name: "arrows-rotate", style: "solid" })}
          style={{ height: 16, width: 16 }}
        />
      </AddBtn>
    </AddForm>
  );
}
export default ItemFixForm;
