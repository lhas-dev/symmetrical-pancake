import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TextField } from "./TextField";

export default {
  title: "Storybook/Molecules/TextField",
  component: TextField,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    type: { control: "text" },
    icon: { control: "text" },
    loading: { control: "boolean" },
    error: { control: "text" },
  },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Informe um CEP",
  placeholder: "Digite aqui",
  type: "text",
  icon: "SearchIcon",
  loading: false,
  error: "",
};
