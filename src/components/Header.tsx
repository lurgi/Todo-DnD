import { styled } from "styled-components";

const MainHeader = styled.header`
  height: 30px;
  background-color: white;
  margin-bottom: 10px;
  color: rgb(5, 5, 5);
`;

function Header() {
  return <MainHeader>header</MainHeader>;
}

export default Header;
