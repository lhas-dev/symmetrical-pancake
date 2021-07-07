import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "Storybook/Atoms/Button",
  component: Button,
  argTypes: {
    label: { control: "text" },
    icon: { control: "text" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Adicionar manualmente",
  icon: "AddMoreIcon",
};
