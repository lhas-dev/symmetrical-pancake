import styled from "styled-components";
import { Icon } from "components/atoms/Icon/Icon";
import {
  Breadcrumb,
  Wrapper as BreadcrumbWrapper,
} from "components/molecules/Breadcrumb/Breadcrumb";
import { Avatar } from "components/molecules/Avatar/Avatar";
import { useDevice } from "hooks/useDevice";
import { Badge } from "components/atoms/Badge/Badge";

interface HeaderProps {}

const Wrapper = styled.header`
  min-height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  background: #ffffff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${BreadcrumbWrapper} {
    margin-left: 20px;
    margin-right: auto;
  }

  @media (min-width: 992px) {
    background: #f5f5f5;
  }
`;

const RightCol = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfos = styled.div`
  height: 40px;
  border-right: 1px solid #dddddd;
  padding-right: 15px;
  font-family: "Open Sans";
  margin-left: 14px;

  h2 {
    font-size: 18px;
    line-height: 25px;
    color: #272727;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }

  p {
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: #00adef;
    margin: 0;
    padding: 0;
  }
`;

const NotificationButton = styled.button`
  background: transparent;
  border: none;
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  display: inline-flex;

  &:hover {
    opacity: 0.5;
  }

  ${Badge} {
    position: absolute;
    right: 3px;
    top: 2px;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  background: transparent;
  border: none;
  align-items: center;
  cursor: pointer;
  margin-left: 15px;
  padding: 0;
  transition: all 0.1s ease-in;

  &:hover {
    opacity: 0.5;
  }

  p {
    margin: 0;
    padding: 0;
    color: #bababa;
    letter-spacing: 1.5px;
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 11px;
    line-height: 15px;
    text-transform: uppercase;
    padding-left: 14px;
    padding-right: 14px;
  }
`;

export const Header = (_props: HeaderProps) => {
  const device = useDevice();
  const breadcrumbItems = [
    {
      label: "Página",
    },
  ];

  return (
    <Wrapper>
      <Icon src="DashboardIcon" />
      <Breadcrumb items={breadcrumbItems} />
      <RightCol>
        {device.isDesktop() && (
          <NotificationButton>
            <Badge />
            <Icon src="NotificationIcon" />
          </NotificationButton>
        )}
        <Avatar
          src="https://picsum.photos/200"
          name="John Doe"
          hasNotification
        />
        {device.isDesktop() && (
          <>
            <UserInfos>
              <h2>Silvia Costa</h2>
              <p>4.200 pontos</p>
            </UserInfos>
            <LogoutButton>
              <Icon src="ShutdownIcon" />
              <p>Sair</p>
            </LogoutButton>
          </>
        )}
      </RightCol>
    </Wrapper>
  );
};
