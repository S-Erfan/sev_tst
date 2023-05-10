import styled from "styled-components";

export const GroundSectionTag = styled.section`
  overflow: hidden;
  width: 80%;
  /* for amendment */
  /* height: 85vh; */
  margin: 1rem auto;
  display: flex;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;

  /* .first{
    width: 400px !important;
    height: 400px !important;
  } */
  .image_holder {
    width: 400px;
    height: auto;
    display: grid;
    place-items: center;
    span {
      height: 100% !important;
      width: 100% !important;
      img {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }

  @media (max-width: 883px) {
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 530px) {
    width: 100%;
    height: auto ;
    min-height: 70vh;
    margin-top: 80px;
    .image_holder {
      width: 80vw !important;
      height: auto !important;
      display: grid;
      place-items: center;
      img {
        width: 100% !important;
        height: 100% !important;
      }
      span {
        height: 100% !important;
        width: 100% !important;
      }
    }
  }
`;
