import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SelectField } from "./SelectField";

export default {
  title: "Storybook/Molecules/SelectField",
  component: SelectField,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    icon: { control: "text" },
    loading: { control: "boolean" },
    error: { control: "text" },
  },
} as ComponentMeta<typeof SelectField>;

const Template: ComponentStory<typeof SelectField> = (args) => (
  <SelectField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Estado",
  placeholder: "Digite aqui",
  type: "text",
  loading: false,
  options: [
    {
      label: "Opção 1",
      value: 1,
    },
    {
      label: "Opção 2",
      value: 2,
    },
  ],
  error: "",
};
