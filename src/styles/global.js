import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * { 
    
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    background: ${p => p.theme.colors.background};
    color: ${p => p.theme.colors.foreground};
    font-family: ${p => p.theme.fontFamily};
    font-size: 1.8rem;
    line-height: 1.7;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin: 1em 0 0.5em 0;
  }
  a {
      color: ${p => p.theme.colors.primary};
      text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
