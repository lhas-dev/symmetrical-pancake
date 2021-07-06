import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Badge } from "./Badge";

export default {
  title: "Storybook/Atoms/Badge",
  component: Badge,
  argTypes: {},
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {};
