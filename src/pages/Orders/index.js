import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Label, List, Table, TableCell } from "semantic-ui-react";
import { $SERVER, tokenName } from "../../_const/_const";

const Orders = ({ socket }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [barReady, setBarReady] = useState(false);
  const [cuisineReady, setCuisineReady] = useState(false);

  const token = localStorage.getItem(`token-${tokenName}`);

  const getOrders = async () => {
    setLoading(true);
    let response = await axios({
      method: "get",
      url: `${$SERVER}/api/orders/allOrders`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response && response.data.status === 200) {
      setAllOrders([...response.data.orders]);
      setLoading(false);
    }
  };

  const updateOrder = async (update, orderId) => {
    setLoading(true);
    let response = await axios({
      method: "post",
      url: `${$SERVER}/api/orders/updateOrder`,
      data: { update, orderId },
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response && response.data.status === 200) {
      setLoading(false);
      setBarReady(false);
      setCuisineReady(false);
      const { foundOrder } = response.data;
      socket.emit("sendOrderToWaiter", foundOrder);
    }
  };

  useEffect(() => {
    getOrders();
    socket.on("sendOrder", (newOrder) => {
      if (allOrders) {
        setAllOrders((allOrders) => [newOrder, ...allOrders]);
      }
    });
  }, []);

  const validateBarOrder = (order) => {
    let validatedOrder = { ...order };
    setBarReady(true);
    validatedOrder.status =
      checkIfOrderItemContainsType(validatedOrder.items, "aujourd'hui") &&
      !cuisineReady
        ? "ATTENTE CUISINE"
        : "PRÊTE";
    let index = allOrders.findIndex((o) => o._id === order._id);
    let newAllOrders = [...allOrders];
    newAllOrders[index] = validatedOrder;
    newAllOrders.splice(index, 1);
    setAllOrders([validatedOrder, ...newAllOrders]);
    if (validatedOrder.status === "PRÊTE") {
      updateOrder({ status: validatedOrder.status }, validatedOrder._id);
    }
  };

  const validateCuisineOrder = (order) => {
    let validatedOrder = { ...order };
    setCuisineReady(true);
    validatedOrder.status =
      checkIfOrderItemContainsType(validatedOrder.items, "cave") && !barReady
        ? "ATTENTE BAR"
        : "PRÊTE";
    let index = allOrders.findIndex((o) => o._id === order._id);
    let newAllOrders = [...allOrders];
    newAllOrders[index] = validatedOrder;
    newAllOrders.splice(index, 1);
    setAllOrders([validatedOrder, ...newAllOrders]);
    if (validatedOrder.status === "PRÊTE") {
      updateOrder({ status: validatedOrder.status }, validatedOrder._id);
    }
  };

  const checkIfOrderItemContainsType = (items, string) => {
    return !!items.find((item) => item.type === string);
  };

  const renderTableRows = () =>
    allOrders
      ?.sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((order, index) => {
        const { tableNumber, date, amount, transaction, status, items } = order;
        return (
          <>
            <Table.Row positive={status === "PRÊTE"}>
                <Table.Cell>
              {status === "PAID" && (
                  <Label ribbon color="green">
                    New
                  </Label>
              )}
                </Table.Cell>
              <TableCell>{tableNumber}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>
                {amount?.toFixed(2)} <small>€</small>
              </TableCell>
              <TableCell
                style={{
                  color:
                    status === "ATTENTE CUISINE"
                      ? "red"
                      : status === "ATTENTE BAR"
                      ? "blue"
                      : "lime",
                }}
              >
                {status}
              </TableCell>
              <TableCell>{transaction.paymentIntent.id}</TableCell>
              <TableCell>
                <List>
                  {items.map((item) => {
                    const { name, type, category, region, infos } = item;
                    return (
                      <List.Item>
                        <div
                          style={{
                            fontSize: "1.3em",
                            lineHeight: "1.3",
                            color: type === "aujourd'hui" ? "red" : "blue",
                          }}
                        >
                          <span> {name} </span>
                          <span>{category} </span>
                          <span>{region} </span>
                          <p
                            style={{
                              color: "green",
                              textTransform: "uppercase",
                            }}
                          >
                            {infos}{" "}
                          </p>
                        </div>
                      </List.Item>
                    );
                  })}
                </List>
              </TableCell>
              <TableCell textAlign="center">
                {items.find((item) => item.type === "cave") && (
                  <>
                    <Button
                      disabled={loading || status === "PRÊTE" || barReady}
                      loading={loading}
                      type="button"
                      color="blue"
                      content="Bar Prêt"
                      onClick={() => validateBarOrder(order)}
                    />
                  </>
                )}
                {items.find((item) => item.type === "aujourd'hui") && (
                  <Button
                    disabled={loading || status === "PRÊTE" || cuisineReady}
                    loading={loading}
                    type="button"
                    color="red"
                    content="Cuisine Prête"
                    onClick={() => validateCuisineOrder(order)}
                  />
                )}
              </TableCell>
            </Table.Row>
          </>
        );
      });
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell>New ?</Table.HeaderCell>
          <Table.HeaderCell>Table</Table.HeaderCell>
          <Table.HeaderCell>date</Table.HeaderCell>
          <Table.HeaderCell>Montant</Table.HeaderCell>
          <Table.HeaderCell>status</Table.HeaderCell>
          <Table.HeaderCell>Id de Transaction</Table.HeaderCell>
          <Table.HeaderCell>Commande</Table.HeaderCell>
          <Table.HeaderCell>Commande prète ?</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{renderTableRows()}</Table.Body>
    </Table>
  );
};

export default Orders;
