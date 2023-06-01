import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const Div = styled.div`
  position: absolute;
  width: 75px;
  z-index: 999;
  font-size: 13px;
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

function MenuContainer({
  children,
  containerRef,
}: {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  return <Div ref={containerRef}>{children}</Div>;
}
export default MenuContainer;
