import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { keyframes, styled } from "styled-components";
import { todoState } from "../atoms";
import ItemFixForm from "../components/ItemFixForm";

const Item = styled.li`
  background-color: ${(props) => props.theme.cardBgColorLight};
  color: rgb(5, 5, 5);
  margin-top: 5px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  transition: all 0.2s ease-in-out;
  position: relative;
  min-height: 32px;
`;

const ItemText = styled.span`
  padding: 5px;
`;

const IconMenuContainer = styled.div`
  position: relative;
  transition: all 0.2 ease-in-out;
`;

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const IconContainer = styled.div<{ isOpenMenu: boolean }>`
  color: ${(props) => props.theme.cardBgColor};
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  margin-right: 3px;
  border-radius: 3px;
  &:hover {
    opacity: 1;
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
    background-color: ${(props) => props.theme.cardBgColor};
  }
`;
const MenuContainer = styled.div`
  position: absolute;
  z-index: 999;
  font-size: 13px;
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  right: 0;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.accentColor};
  animation: ${fadeIn} 0.2s ease-in-out;
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  & span {
    margin: 2px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface IDraggableBoard {
  todo: string;
  index: number;
  category: string;
}

function DraggableBoard({ todo, index, category }: IDraggableBoard) {
  const setState = useSetRecoilState(todoState);
  const [isopenmenu, setIsOpenMenu] = useState(false);
  const [isopeninput, setIsOpenInput] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
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
    setIsOpenMenu(false);
  };
  const onBlur = () => {
    setIsOpenInput(false);
  };
  const handleFix = () => {
    if (!isopeninput) {
      setIsOpenMenu(false);
      setIsOpenInput(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Draggable draggableId={todo} index={index} key={todo}>
      {(magic, snapshot) => (
        <Item
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {isopeninput ? (
            <ItemFixForm
              value={todo}
              index={index}
              onBlur={onBlur}
              category={category}
            />
          ) : (
            <ItemText>{todo}</ItemText>
          )}
          <IconMenuContainer>
            <IconContainer
              isOpenMenu={isopenmenu}
              onClick={() => setIsOpenMenu(!isopenmenu)}
            >
              <FontAwesomeIcon
                style={{ width: 20 }}
                icon={icon({ name: "ellipsis", style: "solid" })}
              ></FontAwesomeIcon>
            </IconContainer>
            {isopenmenu ? (
              <MenuContainer ref={menuRef}>
                <span onClick={handleFix}>수정하기</span>
                <span onClick={handleDelete}>삭제하기</span>
              </MenuContainer>
            ) : null}
          </IconMenuContainer>
        </Item>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableBoard);
