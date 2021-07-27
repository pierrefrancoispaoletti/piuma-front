import { faMinus, faPlus } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Container, Divider, Header } from "semantic-ui-react";
import {
  addToCart,
  calculateDate,
  findProductWithId,
  getCartAmount,
  removeFromCart,
} from "../../utils/functions";
import { collectHour } from "../../_const/_const";

import "./cart.css";

const Cart = ({ cart, setCart, order, setOrder, setOpenPaymentModal }) => {
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

  const setComplementaryInfos = (e) => {
    let foundProductObject = order.find((p) => p._id === e.target.name);
    foundProductObject["infos"] = e.target.value;

    let index = order.findIndex((i) => i._id === e.target.name);

    let newOrder = [...order];

    newOrder[index] = foundProductObject;

    setOrder([...newOrder]);
  };

  const getTheDay = () => {
    let date = new Date(calculateDate());

    let day = date.toLocaleString("fr-FR", { weekday: "long" });

    let dday = date.getDate();

    return (
      <span className="day">
        {day} {dday} à {collectHour}
      </span>
    );
  };
  return (
    <Container className="cart">
      <Header className="categories-header" style={{ color: "white" }} as="h2">
        <span style={{ textDecoration: "underline" }}>Votre Panier</span>
      </Header>
      <div className="cart-pickupdate">
        <p>Votre commande sera préte pour le {getTheDay()}</p>
      </div>

      <Divider />
      <div className="cart-description">
        <div className="cart-header">
          <div className="cart-total">
            <span>
              Total: {getCartAmount(cart).toFixed(2)} <small>€</small>
            </span>
          </div>
          <Button
            type="button"
            color="blue"
            size="large"
            disabled={
              getCartAmount(cart).toFixed(2) === "0.00" ||
              cart.some(
                (item) =>
                  item.region.toLowerCase() === "au kilo" && !item.weight
              )
            }
            onClick={() => setOpenPaymentModal(true)}
          >
            Commander
          </Button>
        </div>
        {r.map((p) => {
          const product = findProductWithId(cart, p.id);
          const { name, _id, price, description, region, weight, infos } =
            product;
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
                  <textarea
                    style={{ width: "100%" }}
                    cols="5"
                    rows="3"
                    name={p.id}
                    value={infos}
                    onChange={(e) => setComplementaryInfos(e)}
                    placeholder="Infos complémentaires Exemple: Cannistrellis sucrés noisette, ribella misticu..."
                  />
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
                    <label>Poids désiré </label>
                    <select
                      required
                      name={p.id}
                      value={"" || weight}
                      onChange={(e) => setProductWeight(e)}
                    >
                      <option value="">Selectionnez un poids</option>
                      <option value={300}>300</option>
                      <option value={350}>350</option>
                      <option value={400}>400</option>
                      <option value={450}>450</option>
                      <option value={500}>500</option>
                      <option value={550}>550</option>
                      <option value={600}>600</option>
                      <option value={650}>650</option>
                      <option value={700}>700</option>
                      <option value={750}>750</option>
                      <option value={800}>800</option>
                      <option value={850}>850</option>
                      <option value={900}>900</option>
                      <option value={950}>950</option>
                      <option value={1000}>1000</option>
                    </select>
                    grammes
                    {weight > 0 && (
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
        <div></div>
        <div className="cart-header">
          <div className="cart-total">
            <span>
              Total: {getCartAmount(cart).toFixed(2)} <small>€</small>
            </span>
          </div>
          <Button
            type="button"
            color="blue"
            size="large"
            disabled={
              getCartAmount(cart).toFixed(2) === "0.00" ||
              cart.some(
                (item) =>
                  item.region.toLowerCase() === "au kilo" && !item.weight
              )
            }
            onClick={() => setOpenPaymentModal(true)}
          >
            Commander
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
