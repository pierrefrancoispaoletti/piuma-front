import {
  faCartPlus,
  faHeartCircle,
  faSearch,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Translator, Translate } from "react-auto-translate";
import React, { useState } from "react";
import { Button, Header } from "semantic-ui-react";
import "./productitem.css";
import { GOOGLE_API_KEY, showShop } from "../../../_const/_const";
import { useHistory } from "react-router-dom";
import { addToCart } from "../../../utils/functions";
import Bandera from "./bandera.png";

const ProductItem = ({
  product,
  _id,
  name,
  nameCorsican,
  type,
  region,
  description,
  descriptionCorsican,
  price,
  category,
  choice,
  visible,
  image,
  showInShop,
  user,
  setOpenImageModal,
  setSelectedProduct,
  setCart,
  cart,
}) => {
  const history = useHistory();

  const userLang = navigator.language || navigator.userLanguage;

  const [isTranslatedInCorsican, setIsTranslatedInCorsican] = useState(false);

  const cacheProvider = {
    get: (language, key) =>
      ((JSON.parse(localStorage.getItem("translations")) || {})[key] || {})[
        language
      ],
    set: (language, key, value) => {
      const existing = JSON.parse(localStorage.getItem("translations")) || {
        [key]: {},
      };
      existing[key] = { ...existing[key], [language]: value };
      localStorage.setItem("translations", JSON.stringify(existing));
    },
  };
  return (
    <div
      id={_id}
      className="productitem"
      style={{
        display: visible ? "" : user === "isAdmin" ? "" : "none",
        border:
          decodeURI(history.location.hash.replace("#", "")) === _id
            ? "8px solid darkred"
            : "",
      }}
    >
      {(nameCorsican || descriptionCorsican) && (
        <Button
          icon
          circular
          size="large"
          style={{
            position: "absolute",
            top: "-42px",
            left: "-20px",
            padding: "6px",
          }}
          onClick={() => setIsTranslatedInCorsican(!isTranslatedInCorsican)}
        >
          <img
            src={Bandera}
            width="35px"
            alt="bouton de traduction"
            style={{ backgroundColor: "transparent" }}
          />
        </Button>
      )}
      <div className="productitem-header">
        <Header
          as="h3"
          style={
            type === "cave" && category === "rouges"
              ? { color: "darkred" }
              : type === "cave" && category === "roses"
              ? { color: "#fec5d9" }
              : type === "cave" && category === "blancs"
              ? { color: "#f1f285" }
              : { color: "" }
          }
        >
          {!visible ? "Caché : " : ""}
          {isTranslatedInCorsican && nameCorsican ? nameCorsican : name}
          {image && (
            <FontAwesomeIcon
              style={{ color: "white", marginLeft: 8 }}
              icon={faSearch}
              onClick={() => {
                setSelectedProduct(product);
                setOpenImageModal(true);
              }}
            />
          )}
          {choice && (
            <FontAwesomeIcon
              className="bosschoice alvp__icon"
              icon={faHeartCircle}
              style={{
                "--fa-primary-color": "darkred",
                "--fa-secondary-color": "transparent",
              }}
              size="2x"
            />
          )}
        </Header>
        {showShop && showInShop && (
          <Button
            className="addtocart"
            icon
            circular
            color="orange"
            onClick={() => addToCart(setCart, cart, product)}
          >
            <FontAwesomeIcon size="2x" icon={faCartPlus} />
            <span className="itemcounter">
              {cart.filter((p) => p._id === _id).length}
            </span>
          </Button>
        )}

        {/* {showShop && type === "spuntinu"  && user !== "isAdmin" && (
          <Button
            className="removefromcart"
            icon
            circular
            color="red"
            onClick={() => removeFromCart(setCart, cart, _id)}
          >
            <FontAwesomeIcon size="2x" icon={faCartArrowDown} />
          </Button>
        )} */}
        {type === "cave" && name.toLowerCase() !== "verre de vin" ? (
          <span className="price">
            {price.toFixed(2) - 10}
            <small>€</small>
          </span>
        ) : (
          <span className="price">
            {price.toFixed(2)}
            <small>€</small>
          </span>
        )}
      </div>
      {region && (
        <div className="region-wrapper">
          <div className="region">{region}</div>
          {type === "cave" && name.toLowerCase() !== "verre de vin" && (
            <span className="region">
              {`Sur place : ${price.toFixed(2)}`}
              <small>€</small>
            </span>
          )}
        </div>
      )}
      {description && (
        <Translator
          cacheProvider={cacheProvider}
          from="fr"
          to={userLang.substr(0, 2)}
          googleApiKey={GOOGLE_API_KEY}
        >
          {isTranslatedInCorsican && descriptionCorsican ? (
            <p className="description">{descriptionCorsican}</p>
          ) : (
            <p className="description">
              <Translate>{description}</Translate>
            </p>
          )}
        </Translator>
      )}
    </div>
  );
};

export default ProductItem;
