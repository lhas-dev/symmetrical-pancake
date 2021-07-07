import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "./Modal";

export default {
  title: "Storybook/Organisms/Modal",
  component: Modal,
  argTypes: {
    visible: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args: any) => (
  <Modal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  visible: true,
};
