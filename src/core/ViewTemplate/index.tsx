import React, { ReactNode } from "react";

import Header from "./Header";
import Container from "../../view/shared/components/Container";
import VSeparator from "../../view/shared/components/VSeparator";
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
