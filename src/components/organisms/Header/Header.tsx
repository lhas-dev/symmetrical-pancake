import styled from "styled-components";
import { Icon } from "components/atoms/Icon/Icon";
// import { useDevice } from "hooks/useDevice";

// interface HeaderProps {}

const Wrapper = styled.header`
  min-height: 56px;
  background: #ffffff;
  border-bottom: 1px solid #ddd;
`;

export const Header = () => {
  // const device = useDevice();
  return (
    <Wrapper>
      <Icon src="DashboardIcon" />
    </Wrapper>
  );
};
