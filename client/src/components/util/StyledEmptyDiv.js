import styled from "styled-components";

const StyledEmptyDiv = styled.div`
  width: ${(props) => props.width ?? "auto"};
  height: ${(props) => props.height ?? "auto"};
  display: flex;
`;

export default StyledEmptyDiv;
