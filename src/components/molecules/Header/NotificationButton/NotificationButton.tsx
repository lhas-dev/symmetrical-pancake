import styled from "styled-components";
import { Badge } from "components/atoms/Badge/Badge";
import { Icon } from "components/atoms/Icon/Icon";

const Wrapper = styled.button`
  background: transparent;
  border: none;
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  display: none;

  @media (min-width: 52em) {
    display: inline-flex;
  }

  &:hover {
    opacity: 0.5;
  }

  ${Badge} {
    position: absolute;
    right: 3px;
    top: 2px;
  }
`;

export const NotificationButton = () => (
  <Wrapper>
    <Badge />
    <Icon src="NotificationIcon" />
  </Wrapper>
);
