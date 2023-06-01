import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { todoState } from "../atoms";
import ItemFixForm from "../components/ItemFixForm";
import MenuContainer from "../components/MenuContainer";

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
              <MenuContainer containerRef={menuRef}>
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
