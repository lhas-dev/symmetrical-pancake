import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NotificationButton } from "./NotificationButton";

export default {
  title: "Storybook/Molecules/Header/NotificationButton",
  component: NotificationButton,
  argTypes: {},
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
  <NotificationButton {...args} />
);

export const Default = Template.bind({});
Default.args = {};
