import { Shimmer } from "react-shimmer";
import styled from "styled-components";
import StyledEmptyDiv from "../util/StyledEmptyDiv";

function ShimmerLoading({ title }) {
  return (
    <Column>
      <div style={{ padding: "14px 20px 10px 20px" }}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <Shimmer width={"100%"} height={270}></Shimmer>
      <StyledEmptyDiv height="20px" />

      <Padding>
        <Title>{title}</Title>
        <StyledEmptyDiv height="20px" />
        <Shimmer width={"95%"} height={9}></Shimmer>
        <StyledEmptyDiv height={"15px"} />
        <Shimmer width={"100%"} height={9}></Shimmer>
        <StyledEmptyDiv height={"15px"} />
        <Shimmer width={"80%"} height={9}></Shimmer>
        <StyledEmptyDiv height={"15px"} />
        <Shimmer width={"65%"} height={9}></Shimmer>
        <StyledEmptyDiv height={"15px"} />
        <Shimmer width={"95%"} height={9}></Shimmer>
        <StyledEmptyDiv height={"15px"} />
        <Shimmer width={"100%"} height={9}></Shimmer>
        <StyledEmptyDiv height={"44px"} />

        <People>People</People>
        <StyledEmptyDiv height={"16px"} />
        <Shimmer width={"65%"} height={9}></Shimmer>
        <StyledEmptyDiv height={"15px"} />
        <Shimmer width={"95%"} height={9}></Shimmer>
        <StyledEmptyDiv height={"15px"} />
        <Shimmer width={"100%"} height={9}></Shimmer>
        <StyledEmptyDiv height={"15px"} />

        <div style={{ display: "flex", flexDirection: "row" }}>
          <Shimmer width={"100px"} height={"150px"}></Shimmer>
          <StyledEmptyDiv width={"7px"} />
          <Shimmer width={"100px"} height={"150px"}></Shimmer>
          <StyledEmptyDiv width={"7px"} />
          <Shimmer width={"100px"} height={"150px"}></Shimmer>
        </div>
        <StyledEmptyDiv height={"54px"} />
      </Padding>
    </Column>
  );
}

export default ShimmerLoading;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  opacity: 0.8;
`;

const Title = styled.div`
  font-size: 22px;
  color: white;
  font-weight: bold;
  text-align: start;
`;

const People = styled.div`
  font-size: 18px;
  color: white;
  font-weight: bold;
`;

const Padding = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0px 16px;
`;
