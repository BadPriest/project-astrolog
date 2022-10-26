import React from "react";
import VSeparator from "../../../view/shared/VSeparator";

import { StyledFooter, StyledInfo, StyledInfoHero, StyledLink } from "./styles";

function Footer() {
  return (
    <StyledFooter>
      <StyledInfoHero>PROJECT Astrolog | be excellent</StyledInfoHero>
      <VSeparator height="0.2em" />
      <StyledInfo>Made with care, built to last.</StyledInfo>
      <VSeparator height="0.6em" />
      <StyledInfo>
        <StyledLink
          href="https://www.linkedin.com/in/bruno-vergatti/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <b>Bruno Vinicius Vergatti, 2022</b>
        </StyledLink>
      </StyledInfo>
    </StyledFooter>
  );
}

export default Footer;
