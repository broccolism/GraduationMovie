import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CenterLoading() {
  return (
    <CenterWrapper>
      <CircularProgress color="primary" />
    </CenterWrapper>
  );
}

const CenterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
