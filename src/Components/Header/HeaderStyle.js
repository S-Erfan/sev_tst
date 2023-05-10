import styled from "styled-components";

export const HeaderCustomTag = styled.header`
  width: 100%;
  height: 60px;
  padding: 1rem 3rem;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px #0002;
  background-color: #fff;
  z-index: 2;
  .contain_berger {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  @media (max-width: 550px) {
    padding: 1rem;
    .contain_berger {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;
    }
  }
`;

export const HumberGer = styled.div`
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: var(--transitionMain);
  div {
    transform-origin: 2px;
    width: 100%;
    height: 2px;
    background-color: #000;
    transition: var(--transitionMain);

    :nth-child(1) {
      transform: ${(props) => (props.active ? "rotateZ(45deg)" : "")};
      /* transform: ; */
    }
    :nth-child(2) {
      transform: ${(props) => (props.active ? "translateX(-100%)" : "")};
      opacity: ${(props) => (props.active ? "0" : "1")};
    }
    :nth-child(3) {
      transform: ${(props) => (props.active ? "rotateZ(-45deg)" : "")};
      /* transform: ; */
    }
  }
`;

export const AsideBar = styled.div`
  /* width:  ${props => props.active ? "100vw" : "0vw"}; */
  width: 100vw;
  direction: rtl;
  height: 100vh;
  min-height: 100svh;
  background: #70707088;
  transition: all .1s linear ${props => props.active ? "" : ".2s"};
  position: absolute;
  top: 0;
  right: 0;
  opacity: ${props => props.active ? "1" : "0"};
  visibility: ${props => props.active ? "visible" : "hidden"};
  z-index: 1;
  /* display: ${props => props.active ? "inline" : "none"}; */
  nav {
    position: fixed;
    height: 100vh;
    min-height: 100vh;
    overflow: scroll;
    top: 0;
    right: 0;
    width: 30%;
    background: #fff;
    max-width: 240px;
    min-width: 240px;
    box-shadow: 0 4px 12px #0004;
    /* pointer-events: none; */
    transition: all .4s cubic-bezier(0.49, 0.02, 0, 0.99) .1s;
    transform: ${(props) => (props.active ? "" : "translateX(200%)")};
    z-index: 3;
  }
`;
