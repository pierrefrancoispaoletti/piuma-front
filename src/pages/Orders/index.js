import axios from "axios";
import React, { useEffect, useState } from "react";
import { Label, Table, TableCell } from "semantic-ui-react";
import { $SERVER, tokenName } from "../../_const/_const";

const Orders = ({ socket }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getOrders();
    socket.on("sendOrder", (newOrder) => {
      if (allOrders) {
        setAllOrders((allOrders) => [newOrder, ...allOrders]);
      }
    });
  }, []);

  const renderTableRows = () =>
    allOrders
      ?.sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((order, index) => {
        const { _id, name, date, amount, transaction } = order;
        return (
          <Table.Row>
            <TableCell>{_id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>
              {amount?.toFixed(2)} <small>€</small>
            </TableCell>
            <TableCell>{transaction.paymentIntent.id}</TableCell>
          </Table.Row>
        );
      });
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Nom</Table.HeaderCell>
          <Table.HeaderCell>date</Table.HeaderCell>
          <Table.HeaderCell>Montant</Table.HeaderCell>
          <Table.HeaderCell>Id de Transaction</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{renderTableRows()}</Table.Body>
      {/* {allOrders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((order) => (
          <p>{order.name}</p>
        ))} */}
    </Table>
  );
};

export default Orders;
