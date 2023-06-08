import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import Home from "./Home";
import { useRecoilValue } from "recoil";
import { alertState, todoState } from "./atoms";
import DeleteAlert from "./components/DeleteAlert";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Roboto:wght@400;500;700;900&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  height: 100vh;
  width: 100vw;
  color: ${(props) => props.theme.textColor};
  background: linear-gradient(135deg,#686de0,#95afc0);
  line-height: 1.2;
  font-family: 'Roboto', sans-serif;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  overflow-x: hidden;
}
a {
  text-decoration:none;
  color:inherit;
}

`;

function App() {
  const alertValue = useRecoilValue(alertState);
  const todos = useRecoilValue(todoState);
  useEffect(() => {
    localStorage.setItem("todo-state", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <GlobalStyle />
      {alertValue.show ? <DeleteAlert state={alertValue} /> : null}
      <Home />
    </>
  );
}

export default App;
