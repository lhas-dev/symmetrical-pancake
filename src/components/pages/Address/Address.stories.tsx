import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Address } from "./Address";

export default {
  title: "Storybook/Pages/Address",
  component: Address,
  argTypes: {},
} as ComponentMeta<typeof Address>;

const Template: ComponentStory<typeof Address> = (args: any) => (
  <Address {...args} />
);

export const Default = Template.bind({});
Default.args = {};
