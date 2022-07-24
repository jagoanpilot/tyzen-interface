import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Comic Neue', cursive;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    background-image: url('/images/main-bg.jpg');
    background-repeat: repeat;

    img {
      height: auto;
      max-width: 100%;
    }
  }

  ul {
    list-style: none; 
  }

  li {
    display: flex;
    align-items: center;
  }

  li::before {
    content: "•";
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 8px;
  }
`

export default GlobalStyle
