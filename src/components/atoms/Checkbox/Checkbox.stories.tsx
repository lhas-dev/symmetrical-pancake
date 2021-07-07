import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Checkbox } from "./Checkbox";

export default {
  title: "Storybook/Atoms/Checkbox",
  component: Checkbox,
  argTypes: {
    value: { control: "boolean" },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: true,
  label: "Aceito compartilhar meu endereço com empresas parceiras",
  onChange: () => {},
};
