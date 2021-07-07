import styled from "styled-components";
import { Icon } from "components/atoms/Icon/Icon";
import {
  Breadcrumb,
  Wrapper as BreadcrumbWrapper,
} from "components/molecules/Breadcrumb/Breadcrumb";
import { Avatar } from "components/molecules/Avatar/Avatar";
import { LogoutButton } from "components/molecules/Header/LogoutButton/LogoutButton";
import { UserInfos } from "components/molecules/Header/UserInfos/UserInfos";
import { NotificationButton } from "components/molecules/Header/NotificationButton/NotificationButton";
import { useDevice } from "hooks/useDevice";
import { Container } from "components/atoms/Container/Container";

interface HeaderProps {}

const Wrapper = styled.header`
  width: 100%;
  min-height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  background: #ffffff;
  border-bottom: 1px solid #ddd;
  display: flex;

  ${Container} {
    align-items: center;
    justify-content: space-between;
  }

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

export const Header = (_props: HeaderProps) => {
  const device = useDevice();
  const breadcrumbItems = [
    {
      label: "Página",
    },
  ];

  return (
    <Wrapper>
      <Container>
        <Icon src="DashboardIcon" />
        <Breadcrumb items={breadcrumbItems} />
        <RightCol>
          {device.isDesktop() && <NotificationButton />}
          <Avatar
            src="https://picsum.photos/200"
            name="John Doe"
            hasNotification
          />
          {device.isDesktop() && (
            <>
              <UserInfos name="Silvia Costa" points="4.200" />
              <LogoutButton />
            </>
          )}
        </RightCol>
      </Container>
    </Wrapper>
  );
};
