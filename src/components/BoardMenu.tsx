import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import MenuContainer from "./MenuContainer";
import styled from "styled-components";

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
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setFocus: any;
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const boardMenuRef = useRef<HTMLDivElement>(null);
  const handleFix = async () => {
    await setState(true);
    setIsOpenMenu(false);
    setFocus("category");
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
          <span>전체삭제</span>
        </MenuContainer>
      ) : null}
    </Wrapper>
  );
}

export default BoardMenu;
