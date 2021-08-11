import {createGlobalStyle} from 'styled-components';
const GlobalStyle = createGlobalStyle`
:root {
  --white-shade: #fafafa;
  --black: #000000;
  --black-shade: #313639;
  --white: #ffffff;
  --purple: #360ccc;
  --marvel-red: #ed1d24;
  
}
*, *::before, *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    
};
html {
  font-size: 62.5%;
}
body {
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  
}
`;
export default GlobalStyle;
