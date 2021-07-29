import React from "react";
import { Button } from "semantic-ui-react";

const AdminCrudButtons = ({
  loading,
  visible,
  _id,
  choice,
  showInShop,
  product,
  handleDeleteProduct,
  handleChangeChoice,
  handleChangeVisibility,
  handleChangeShoppable,
  setSelectedProduct,
  setOpenEditProductModal,
  setOpenUpdateImageModal,
}) => {
  return (
    <div className="adminbuttons">
      <Button
        disabled={loading}
        loading={loading}
        circular
        icon="remove"
        size="large"
        color="red"
        onClick={() => handleDeleteProduct(_id)}
      />
      <Button
        disabled={loading}
        loading={loading}
        circular
        icon="edit"
        size="large"
        color="purple"
        onClick={() => {
          setSelectedProduct(product);
          setOpenEditProductModal(true);
        }}
      />
      <Button
        disabled={loading}
        loading={loading}
        circular
        icon="shopping basket"
        size="large"
        color={showInShop ? "orange" : "grey"}
        onClick={() => handleChangeShoppable(product)}
      />
      <Button
        disabled={loading}
        loading={loading}
        circular
        icon={visible ? "hide" : "unhide"}
        size="large"
        onClick={() => handleChangeVisibility(product)}
      />
      <Button
        disabled={loading}
        loading={loading}
        circular
        icon="heart"
        size="large"
        color={choice ? "red" : "grey"}
        onClick={() => handleChangeChoice(product)}
      />
      <Button
        disabled={loading}
        loading={loading}
        circular
        icon="image"
        size="large"
        color="yellow"
        onClick={() => {
          setSelectedProduct(product);
          setOpenUpdateImageModal(true);
        }}
      />
    </div>
  );
};

export default AdminCrudButtons;
