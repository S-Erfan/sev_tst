import styled from "styled-components";

export const BoxFilterTag = styled.div`
  position: fixed;
  width: 100%;
  min-width: 200px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  height:  100vh;
  top: 0;
  right: 0;
  background-color: #f7f7f7;
  border-radius: 16px;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 5;
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
  display: grid;
  place-items: center;
  transform: ${(props) => (props.active ? "translateX(0)" : "translateX(150%)")} ;

  @media (max-width: 480px) {
    min-width: 100%;
    max-width: 100%;
  }

`;
