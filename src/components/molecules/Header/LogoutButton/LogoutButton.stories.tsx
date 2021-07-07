import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LogoutButton } from "./LogoutButton";

export default {
  title: "Storybook/Molecules/Header/LogoutButton",
  component: LogoutButton,
  argTypes: {},
} as ComponentMeta<typeof LogoutButton>;

const Template: ComponentStory<typeof LogoutButton> = (args) => (
  <LogoutButton {...args} />
);

export const Default = Template.bind({});
Default.args = {};
