import React, { useState } from "react";
import { useEffect } from "react";
import { Label, Table } from "semantic-ui-react";
import { List } from "semantic-ui-react";
import { TableCell } from "semantic-ui-react";

const Waiter = ({ socket, user }) => {
  const [newWaiter, setNewWaiter] = useState({});
  const [newOrders, setNewOrders] = useState([]);
  useEffect(() => {
    socket.on("waiterOrder", (response) => {
      if (response.waiter._id === user._id) {
        setNewWaiter(response.waiter);
        setNewOrders((newOrders) => [response.order, ...newOrders]);
      }
    });
  }, []);

  const renderTableRows = () =>
    newOrders.map((order, index) => {
      const { tableNumber, status, items } = order;
      return (
        <Table.Row positive={status === "PRÊTE"}>
          <Table.Cell>
            {status === "PAID" && (
              <Label ribbon color="green">
                New
              </Label>
            )}
          </Table.Cell>
          <TableCell>Table{tableNumber}</TableCell>
          <TableCell>
            <List style={{ background: "grey" }}>
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
                      <span
                        style={
                          category === "rouges"
                            ? { color: "darkred" }
                            : category === "roses"
                            ? { color: "#fec5d9" }
                            : category === "blancs"
                            ? { color: "#f1f285" }
                            : { color: "inherit" }
                        }
                      >
                        {" "}
                        {name}{" "}
                      </span>
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
        </Table.Row>
      );
    });
  return (
    <div>
      <p>Hello, {user.email}</p>
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nouvelle ?</Table.HeaderCell>
            <Table.HeaderCell>Table</Table.HeaderCell>
            <Table.HeaderCell>Commande</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderTableRows()}</Table.Body>
      </Table>
    </div>
  );
};

export default Waiter;
