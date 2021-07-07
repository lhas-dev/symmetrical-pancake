import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ContainedButton } from "./ContainedButton";

export default {
  title: "Storybook/Atoms/ContainedButton",
  component: ContainedButton,
  argTypes: {
    label: { control: "text" },
    icon: { control: "text" },
    variant: { control: "text" },
    disabled: { control: "boolean" },
  },
} as ComponentMeta<typeof ContainedButton>;

const Template: ComponentStory<typeof ContainedButton> = (args) => (
  <ContainedButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Adicionar manualmente",
  icon: "",
  variant: "secondary",
  disabled: false,
};
