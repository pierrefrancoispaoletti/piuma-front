import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Modal, Form, Button } from "semantic-ui-react";
import { getCartAmount } from "../../../../utils/functions";
import { $SERVER } from "../../../../_const/_const";

import "./paymentModal.css";

const PaymentModal = ({
  setOpenPaymentModal,
  openPaymentModal,
  setOrder,
  order,
  setCart,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [newOrder, setNewOrder] = useState({
    name: "",
    email: "",
    tel: "",
    date: "",
    items: [],
    status: "",
    transaction: {},
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  useEffect(() => {
    setLoading(true);
    if (openPaymentModal) {
      const fetchData = async () => {
        const response = await axios({
          method: "post",
          url: `${$SERVER}/api/orders/create-payment-intent`,
          data: { items: order },
        });

        if (response && response.data.status === 200) {
          setClientSecret(response.data.clientSecret);
          setLoading(false);
          setNewOrder({ ...newOrder, items: [...order] });
        } else {
          setError("Il y a eu un probléme veuillez recharger la page");
        }
      };
      fetchData();
      setError(null)
    }
  }, [openPaymentModal]);

  const changeOrder = (e) => {
    let updatedValue = {};
    updatedValue[e.target.name] = e.target.value;
    setNewOrder({ ...newOrder, ...updatedValue });
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setDisabled(true);
      return;
    }
    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: newOrder.email,
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: newOrder.email,
          name: newOrder.name,
          phone: newOrder.tel,
        },
      },
    });
    if (payload.error) {
      setError(
        `Le paiement à échoué pour la raison suivante : ${payload.error.message}`
      );
      setLoading(false);
    } else {
        setLoading(true)
        newOrder.status="ACCEPTED";
        newOrder.transaction= payload;
        setNewOrder({...newOrder})
      const createOrder = async () => {
        const response = await axios({
          method: "post",
          url: `${$SERVER}/api/orders/createOrder`,
          data: newOrder,
        });

        if (response && response.data.status === 200) {
          setLoading(false);
          setOrder([]);
          setNewOrder({});
          setCart([]);
        } else {
          setError("Il y a eu un probléme veuillez recharger la page");
        }
      };
      createOrder();
      setError(null);
      setLoading(false);
      setSucceeded(true);
    }
  };

  return (
    <Modal
      onClose={() => setOpenPaymentModal(false)}
      onOpen={() => setOpenPaymentModal(true)}
      open={openPaymentModal}
      size="small"
    >
      <Header icon>
        <Icon
          color={error ? "red" : succeeded ? "green" : "blue"}
          name={error ? "remove circle" : succeeded ? "check" : "dollar sign"}
        />
        <span style={{ color: error ? "red" : succeeded ? "green" : "blue" }}>
          {error
            ? "Paiement Échoué"
            : succeeded
            ? "Paiement Reussi"
            : loading
            ? "Paiement en Cours"
            : "Payer Votre Commande"}
        </span>
      </Header>
      {!succeeded && (
        <Modal.Content>
          <div className="cart-total">
            <span style={{ color: "black" }}>
              Total: {getCartAmount(order).toFixed(2)} <small>€</small>
            </span>
          </div>
          <Form onSubmit={handleSubmit} id="payment-form" loading={loading}>
            <Form.Field required>
              <label>Nom sur votre carte</label>
              <input
                value={newOrder.name}
                name="name"
                type="text"
                onChange={(e) => changeOrder(e)}
              />
            </Form.Field>
            <Form.Field required>
              <label>Votre Email</label>
              <input
                value={newOrder.email}
                name="email"
                type="email"
                onChange={(e) => changeOrder(e)}
              />
            </Form.Field>
            <Form.Field required>
              <label>Votre Telephone</label>
              <input
                value={newOrder.tel}
                name="tel"
                type="tel"
                onChange={(e) => changeOrder(e)}
              />
            </Form.Field>
            <Form.Field required>
              <label>Date de votre commande</label>
              <input
                value={newOrder.date}
                name="date"
                type="date"
                onChange={(e) => changeOrder(e)}
              />
            </Form.Field>
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
          </Form>
        </Modal.Content>
      )}
      <Modal.Actions>
        {!succeeded ? (
          <>
            <Button
              form="payment-form"
              type="submit"
              color="blue"
              size="massive"
              disabled={
                loading ||
                disabled ||
                succeeded ||
                !stripe ||
                !newOrder.name ||
                !newOrder.email ||
                !newOrder.items.length === 0 ||
                !newOrder.tel ||
                !newOrder.date
              }
              loading={loading}
            >
              Payer
            </Button>
            <Button
              type="button"
              color="orange"
              size="massive"
              onClick={() => setOpenPaymentModal(false)}
            >
              Retour au Panier
            </Button>
          </>
        ) : (
          <Link to="/categories/spuntinu">
            <Button type="button" color="green" size="massive">
              Retour à la boutique
            </Button>
          </Link>
        )}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Le paiement à réussi vous allez recevoir un email de confirmation
        </p>
      </Modal.Actions>
    </Modal>
  );
};

export default PaymentModal;
