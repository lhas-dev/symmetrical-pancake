import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SuccessStateModal } from "./SuccessStateModal";

export default {
  title: "Storybook/Templates/SuccessStateModal",
  component: SuccessStateModal,
  argTypes: {
    visible: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof SuccessStateModal>;

const Template: ComponentStory<typeof SuccessStateModal> = (args: any) => (
  <SuccessStateModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  visible: true,
};
