import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ErrorStateModal } from "./ErrorStateModal";

export default {
  title: "Storybook/Templates/ErrorStateModal",
  component: ErrorStateModal,
  argTypes: {
    visible: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof ErrorStateModal>;

const Template: ComponentStory<typeof ErrorStateModal> = (args: any) => (
  <ErrorStateModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  visible: true,
};
