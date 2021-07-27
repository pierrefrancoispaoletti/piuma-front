import {
  faBars,
  faShoppingBasket,
  faUser,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "semantic-ui-react";
import { getCartAmount } from "../../../utils/functions";
import { showShop } from "../../../_const/_const";
import "./topappbar.css";

const TopAppBar = ({
  setSelectedCategory,
  setSidebarVisible,
  setOpenLoginModal,
  user,
  loading,
  cart,
  isAProductShoppable
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="topappbar">
      <Link to="/" onClick={() => setSelectedCategory({})}>
        <div className="topappbar-image">
          <img width="100px" src="./assets/images/logo.png" alt="logo piuma" />
        </div>
      </Link>
      <div className="topappbar-icons">
        <Button
          disabled={loading}
          loading={loading}
          icon
          circular
          color={user ? "green" : "grey"}
          onClick={() => setOpenLoginModal(true)}
        >
          <FontAwesomeIcon size="2x" icon={faUser} />
        </Button>
        <Button
          disabled={loading}
          loading={loading}
          icon
          circular
          onClick={() => setSidebarVisible(true)}
        >
          <FontAwesomeIcon size="2x" icon={faBars} />
        </Button>
        {showShop && isAProductShoppable  && (
          <Link to="/panier">
            <Button
              disabled={loading}
              loading={loading}
              color={"orange"}
              icon
              circular
              onClick={() => console.log("cart clicked")}
            >
              <span
                style={{ position: "relative" }}
                className="fa-layers fa-2x fa-fw"
              >
                <FontAwesomeIcon icon={faShoppingBasket} />
                <span
                  style={{ position: "absolute", top: "-23px", right: "-12px" }}
                  className="fa-layers-top-right fa-layers-counter fa-2x"
                >
                  {cart.length}
                </span>
              </span>
            </Button>
          </Link>
        )}
      </div>
      {showShop && getCartAmount(cart) !== 0 && (
        <span className="cartamount">
          Montant dans votre panier : {getCartAmount(cart).toFixed(2)}
          <small>€</small>
        </span>
      )}
    </div>
  );
};

export default TopAppBar;
