import React, { ReactNode } from "react";

import Container from "../../view/shared/Container";
import VSeparator from "../../view/shared/VSeparator";

import Header from "./Header";
import Footer from "./Footer";

import { StyledTemplateWrapper } from "./styles";

export interface IPropsViewTemplate {
  children: ReactNode;
}

function ViewTemplate({ children }: IPropsViewTemplate) {
  return (
    <StyledTemplateWrapper>
      <Header />
      <Container>
        {children}
        <VSeparator height="4em" />
      </Container>
      <Footer />
    </StyledTemplateWrapper>
  );
}

export default ViewTemplate;
