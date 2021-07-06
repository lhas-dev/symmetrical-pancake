import { Icon } from "../Icon/Icon";
import styled from "styled-components";
import { useDevice } from "../../hooks/useDevice";

interface ItemProps {
  label: string;
}

interface BreadcrumbProps {
  items: ItemProps[];
}

const Wrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  list-style-type: none;
`;

const Item = styled.li`
  display: flex;

  .ArrowRightIcon {
    margin-left: 14px;
    margin-right: 14px;
  }
`;

const Link = styled.a`
  margin: 0;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-decoration: none;
  color: #272727;
`;

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const device = useDevice();

  return (
    <Wrapper>
      <Item>
        <Link href="#">
          {device.isDesktop() && "Início"}
          {device.isMobile() && <Icon src="EtceteraIcon" />}
        </Link>
        <Icon src="ArrowRightIcon" />
      </Item>
      {items.map(({ label }) => (
        <Item key={label}>
          <Link href="#">{label}</Link>
        </Item>
      ))}
    </Wrapper>
  );
};
