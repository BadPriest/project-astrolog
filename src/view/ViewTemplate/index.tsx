import React, { ReactNode } from "react";

import Container from "../shared/Container";
import VSeparator from "../shared/VSeparator";

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
