import { styled } from "styled-components";

const MainHeader = styled.header`
  height: 30px;
  background-color: white;
  color: rgb(5, 5, 5);
  position: absolute;
  top: 0;
  width: 100%;
`;

function Header() {
  return <MainHeader>header</MainHeader>;
}

export default Header;
