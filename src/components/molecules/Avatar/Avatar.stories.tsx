import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Avatar } from "./Avatar";

export default {
  title: "Storybook/Molecules/Avatar",
  component: Avatar,
  argTypes: {
    src: { control: "text" },
    name: { control: "text" },
    hasNotification: { control: "boolean" },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "https://picsum.photos/200",
  name: "John Doe",
  hasNotification: false,
};
