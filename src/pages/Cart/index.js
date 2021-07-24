import { faMinus, faPlus } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Container, Divider, Header } from "semantic-ui-react";
import {
  addToCart,
  findProductWithId,
  getCartAmount,
  removeFromCart,
} from "../../utils/functions";

import "./cart.css";

const Cart = ({ cart, setCart, order, setOrder }) => {
  const reducedCart = cart.reduce(
    (product, { _id }) => ((product[_id] = (product[_id] || 0) + 1), product),
    {}
  );
  const r = Object.keys(reducedCart).map((key) => ({
    id: key,
    count: reducedCart[key],
  }));

  useEffect(() => {
    setOrder([...cart]);
  }, [cart]);

  const setProductWeight = (e) => {
    let foundProductObject = order.find((p) => p._id === e.target.name);

    foundProductObject["weight"] = Number(e.target.value);

    let index = order.findIndex((i) => i._id === e.target.name);

    let newOrder = [...order];

    newOrder[index] = foundProductObject;

    setOrder([...newOrder]);
  };

  console.log(order);
  return (
    <Container className="cart">
      <Header className="categories-header" style={{ color: "white" }} as="h2">
        <span style={{ textDecoration: "underline" }}>Votre Panier</span>
      </Header>
      <Divider hidden />
      <div className="cart-description">
        <div className="cart-header">
          <div className="cart-total">
            <span>
              Total: {getCartAmount(cart).toFixed(2)} <small>€</small>
            </span>
          </div>
          <Button color="blue" size="huge">
            Commander
          </Button>
        </div>
        {r.map((p) => {
          const product = findProductWithId(cart, p.id);
          const { name, _id, price, description, region, weight } = product;
          return (
            <div className="cart-product">
              <div className="cart-product-title">{name}</div>
              <div className="cart-product-amount">
                <span>
                  <Button
                    icon
                    circular
                    size="mini"
                    onClick={() => removeFromCart(setCart, cart, _id)}
                  >
                    <FontAwesomeIcon size="2x" color="red" icon={faMinus} />
                  </Button>
                  <span className="counter">Quantité : {p.count}</span>
                  <Button
                    icon
                    circular
                    size="mini"
                    onClick={() => addToCart(setCart, cart, product)}
                  >
                    <FontAwesomeIcon size="2x" color="green" icon={faPlus} />
                  </Button>
                </span>
              </div>
              {description && (
                <div className="cart-product-description">
                  <p>{description}</p>
                </div>
              )}
              <div className="cart-product-unitprice">
                <p>
                  Prix unitaire: {price} <small>€</small> / {region}
                </p>
              </div>
              <div className="cart-product-subtotal">
                {region.toLowerCase() === "au kilo" ? (
                  <>
                    <label>
                      Poids désiré{" "}
                      <input
                        required
                        name={p.id}
                        onChange={(e) => setProductWeight(e)}
                        type="number"
                        step={50}
                        min={300}
                        max={1000}
                        value={findProductWithId(order, p.id)?.weight ||0}
                      />{" "}
                      grammes
                    </label>
                    {weight && (
                      <p>
                        Sous-Total :
                        {(price * (weight / 1000) * p.count).toFixed(2)}
                        <small>€</small>
                      </p>
                    )}
                  </>
                ) : (
                  <p>
                    Sous-Total :{(price * p.count).toFixed(2)}
                    <small>€</small>
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <div className="cart-header">
          <div className="cart-total">
            <span>
              Total: {getCartAmount(cart).toFixed(2)} <small>€</small>
            </span>
          </div>
          <Button color="blue" size="huge">
            Commander
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
