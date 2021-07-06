import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Breadcrumb } from "./Breadcrumb";

export default {
  title: "Storybook/Molecules/Breadcrumb",
  component: Breadcrumb,
  argTypes: {
    src: { control: "text" },
  },
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      label: "Página",
    },
  ],
};
