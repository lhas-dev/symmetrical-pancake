import React from "react";
import styled from "styled-components";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const Wrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const decorators = [
  (Story) => (
    <Wrapper>
      <Story />
    </Wrapper>
  ),
];
