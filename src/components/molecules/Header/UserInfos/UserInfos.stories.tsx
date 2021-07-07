import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserInfos } from "./UserInfos";

export default {
  title: "Storybook/Molecules/Header/UserInfos",
  component: UserInfos,
  argTypes: {},
} as ComponentMeta<typeof UserInfos>;

const Template: ComponentStory<typeof UserInfos> = (args) => (
  <UserInfos {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "John Doe",
  points: "4.200",
};
