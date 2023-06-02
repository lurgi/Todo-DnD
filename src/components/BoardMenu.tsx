import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import MenuContainer from "./MenuContainer";
import styled from "styled-components";
import DeleteAlert from "./DeleteAlert";

const Wrapper = styled.div`
  position: relative;
`;

const TitleIcon = styled.div`
  transition: all 0.2s ease-in-out;
  padding: 2px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

function BoardMenu({
  setState,
  setFocus,
  boardId,
  category,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setFocus: any;
  boardId: string;
  category: string;
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const boardMenuRef = useRef<HTMLDivElement>(null);
  const handleFix = async () => {
    await setState(true);
    setIsOpenMenu(false);
    setFocus("category");
  };
  const handleDelete = () => {
    setIsOpenAlert(true);
  };
  useEffect(() => {
    const handleIsOpen = (event: MouseEvent) => {
      if (
        boardMenuRef.current &&
        !boardMenuRef.current?.contains(event.target as Node)
      ) {
        setIsOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleIsOpen);
    return () => {
      document.removeEventListener("mousedown", handleIsOpen);
    };
  }, []);
  return (
    <Wrapper>
      <TitleIcon
        onClick={() => {
          setIsOpenMenu(true);
        }}
      >
        <FontAwesomeIcon
          style={{ width: 22, height: 22 }}
          icon={icon({ name: "bars", style: "solid" })}
        ></FontAwesomeIcon>
      </TitleIcon>
      {isOpenMenu ? (
        <MenuContainer containerRef={boardMenuRef}>
          <span onClick={handleFix}>이름수정</span>
          <span onClick={handleDelete}>전체삭제</span>
        </MenuContainer>
      ) : null}
      {isOpenAlert ? (
        <DeleteAlert boardId={boardId} category={category}></DeleteAlert>
      ) : null}
    </Wrapper>
  );
}

export default BoardMenu;
