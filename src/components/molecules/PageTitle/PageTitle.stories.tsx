import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PageTitle } from "./PageTitle";

export default {
  title: "Storybook/Molecules/PageTitle",
  component: PageTitle,
  argTypes: {
    title: "text",
    description: "text",
    icon: "text",
  },
} as ComponentMeta<typeof PageTitle>;

const Template: ComponentStory<typeof PageTitle> = (args) => (
  <PageTitle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Qual o seu endereço?",
  description:
    "Informe um CEP válido para buscarmos seu endereço, ou adicione-o manualmente.",
  icon: "QuestionIcon",
};
