import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faHeart,
  faPhone,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Divider, Header } from "semantic-ui-react";

import "./copyright.css";
const Copyright = ({
  facebookUrl,
  instagramUrl,
  email,
  phoneNumber,
  backgroundColor,
  productBackgroundColor,
  textColor,
  titleColor,
}) => {
  return (
    <div className="footer">
      <div>
        <Header as="h3">Retrouvez nous sur : </Header>
      </div>
      <div>
        <Header as="h3">Ritruvate noi annanta : </Header>
      </div>
      <div className="footer__icons">
        <a target="_blank" href="fb://profile/104822281341917" rel="noreferrer">
          <FontAwesomeIcon
            style={{
              color: "#3B5998",
              background: "white",
              borderRadius: "100%",
            }}
            size="3x"
            icon={faFacebook}
            pull="left"
          />
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com/a_piuma_/?hl=fr"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            style={{ color: "#3F729B", borderRadius: "100%" }}
            size="3x"
            icon={faInstagram}
            pull="right"
          />
        </a>
      </div>
      <Divider />
      <div>
        <Header as="h3">Contactez nous ! </Header>
      </div>
      <div>
        <Header as="h3">Cunttate Noi !</Header>
      </div>
      <div className="footer__icons">
        <a href={`mailto:cafe-rotisserie@piuma.corsica`}>
          <FontAwesomeIcon
            style={{
              "--fa-primary-color": "white",
              "--fa-secondary-color": "black",
              "--fa-secondary-opacity": 0.8,
            }}
            size="3x"
            icon={faEnvelope}
            pull="left"
          />
        </a>
        <a href={`tel:06 23 47 66 66`}>
          <FontAwesomeIcon
            style={{
              "--fa-primary-color": "firebrick",
              "--fa-secondary-color": "black",
              "--fa-primary-opacity": 1,
              "--fa-secondary-opacity": 1,
            }}
            size="3x"
            icon={faPhone}
            pull="right"
          />
        </a>
      </div>
      <Divider />
      <div className="footer__copyright" style={{ color: "black" }}>
        {"Copyright © "}
        <a style={{ color: "black" }} href="https://piuma.corsica">
          <span>Piuma &nbsp;</span>
        </a>
        <span>{` ${new Date().getFullYear()}. `}</span>
      </div>
      <div className="footer__alvp">
        <a
          style={{ color: "black", fontSize: "1em" }}
          href="mailto:pef@alvp-developments.com"
        >
          Made with
          <FontAwesomeIcon
            className="alvp__icon"
            color="darkred"
            icon={faHeart}
            size="2x"
          />
          by ALVP-Developments Ajaccio
        </a>
      </div>
    </div>
  );
};

export default Copyright;
