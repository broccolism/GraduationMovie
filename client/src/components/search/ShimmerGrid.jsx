import { Shimmer } from "react-shimmer";
import styled from "styled-components";
import StyledEmptyDiv from "../util/StyledEmptyDiv";

function ShimmerGird() {
  return (
    <>
      {" "}
      <Row>
        <Shimmer width={100} height={150}></Shimmer>
        <StyledEmptyDiv width={7} />
        <Shimmer width={100} height={150}></Shimmer>
        <StyledEmptyDiv width={7} />
        <Shimmer width={100} height={150}></Shimmer>
      </Row>
      <Row>
        <Shimmer width={100} height={150}></Shimmer>
        <StyledEmptyDiv width={7} />
        <Shimmer width={100} height={150}></Shimmer>
        <StyledEmptyDiv width={7} />
        <Shimmer width={100} height={150}></Shimmer>
      </Row>{" "}
      <Row>
        <Shimmer width={100} height={150}></Shimmer>
        <StyledEmptyDiv width={7} />
        <Shimmer width={100} height={150}></Shimmer>
        <StyledEmptyDiv width={7} />
        <Shimmer width={100} height={150}></Shimmer>
      </Row>{" "}
      <Row>
        <Shimmer width={100} height={150}></Shimmer>
        <StyledEmptyDiv width={7} />
        <Shimmer width={100} height={150}></Shimmer>
        <StyledEmptyDiv width={7} />
        <Shimmer width={100} height={150}></Shimmer>
      </Row>
    </>
  );
}

export default ShimmerGird;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  opacity: 0.8;
  text-align: center;
  padding-bottom: 35px;
`;
