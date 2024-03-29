/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Header, Icon, Modal, Radio } from "semantic-ui-react";
import categories from "../../../../datas/categories";
import { $SERVER, tokenName } from "../../../../_const/_const";

const EditProductModal = ({
  product,
  setOpenEditProductModal,
  openEditProductModal,
  setOpenLoginModal,
  setAppMessage,
  setProducts,
}) => {
  const { image, ...p } = product;

  const [editedProduct, setEditedProduct] = useState({
    name: p.name,
    nameCorsican: p.nameCorsican,
    region: p.region,
    description: p.description,
    descriptionCorsican: p.descriptionCorsican,
    price: p.price,
    type: p.type,
    category: p.category,
    subCategory: p.subCategory,
    choice: p.choice,
    visible: p.visible,
    showInShop: p.showInShop,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditedProduct({ ...p });
  }, [product]);

  const changeProduct = (e) => {
    let updatedValue = {};
    updatedValue[e.target.name] = e.target.value;
    setEditedProduct({ ...editedProduct, ...updatedValue });
  };

  const token = localStorage.getItem(`token-${tokenName}`);

  const onChangeTypeRadio = (value) => {
    let selectedCheckboxes = editedProduct.type;

    selectedCheckboxes = value;

    setEditedProduct({ ...editedProduct, type: selectedCheckboxes });
  };

  const onChangeCategoryRadio = (value) => {
    let selectedCheckboxes = editedProduct.category;

    selectedCheckboxes = value;

    setEditedProduct({ ...editedProduct, category: selectedCheckboxes });
  };

  useEffect(() => {
    if (
      editedProduct.category !== "rouges" ||
      editedProduct.category !== "blancs"
    ) {
      setEditedProduct({ ...editedProduct, subCategory: "" });
    }
  }, [editedProduct.category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      setLoading(true);
      axios({
        method: "post",
        url: `${$SERVER}/api/products/updateProduct`,
        data: {
          update: editedProduct,
          productId: p._id,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (response && response.data.status === 200) {
            setProducts(response.data.data);
          }
          setAppMessage({
            success: response.data.status === 200 ? true : false,
            message: response.data.message,
          });
        })
        .catch((error) => {
          setAppMessage({
            success: false,
            message: "Il y a eu un probleme, veuillez reessayer",
          });
        })
        .finally(() => {
          setLoading(false);
          setOpenEditProductModal(false);
        });
    } else {
      setOpenEditProductModal(false);
      setOpenLoginModal(true);
    }
  };

  return (
    <Modal
      onClose={() => setOpenEditProductModal(false)}
      onOpen={() => setOpenEditProductModal(true)}
      open={openEditProductModal}
      size="small"
    >
      <Header icon>
        <Icon name="edit" />
        Editer {p.name}
      </Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit} id="editProduct-form">
          <Form.Field required error={!editedProduct.name}>
            <label>Nom du Produit</label>
            <input
              value={editedProduct.name}
              name="name"
              type="text"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Nom du Produit en Corse</label>
            <input
              value={editedProduct.nameCorsican}
              name="nameCorsican"
              type="text"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <textarea
              value={editedProduct.description}
              name="description"
              rows="5"
              cols="33"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description en Corse</label>
            <textarea
              value={editedProduct.descriptionCorsican}
              name="descriptionCorsican"
              rows="5"
              cols="33"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Région</label>
            <input
              value={editedProduct.region}
              name="region"
              type="text"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field required error={!editedProduct.price}>
            <label>Prix</label>
            <input
              min={1}
              step={0.1}
              value={editedProduct.price}
              name="price"
              type="number"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field required error={!editedProduct.type}>
            <label>Type de Produit</label>
            {categories.map(
              (cat) =>
                cat.slug && (
                  <Radio
                    style={{ padding: 5 }}
                    key={cat.slug}
                    label={cat.name}
                    name={cat.slug}
                    value={cat.slug}
                    onChange={() => onChangeTypeRadio(cat.slug)}
                    checked={editedProduct.type === cat.slug}
                  />
                )
            )}
          </Form.Field>
          {(editedProduct.type === "cave" ||
            editedProduct.type === "spuntinu" ||
            product.type === "epicerie") && (
            <Form.Field required error={!editedProduct.category}>
              <label>Categorie de Produit</label>
              {categories.map(
                (cat) =>
                  cat["slug"] === editedProduct.type &&
                  cat.subCategories?.map((subC) => (
                    <Radio
                      style={{ padding: 5 }}
                      key={subC.slug}
                      label={subC.name}
                      name={subC.slug}
                      value={subC.slug}
                      onChange={() => onChangeCategoryRadio(subC.slug)}
                      checked={editedProduct.category === subC.slug}
                    />
                  ))
              )}
            </Form.Field>
          )}
          <Form.Field>
            <label>Choix du Patron ?</label>
            <Radio
              toggle
              checked={editedProduct.choice}
              onChange={() =>
                setEditedProduct({
                  ...editedProduct,
                  choice: !editedProduct.choice,
                })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Shoppable ?</label>
            <Radio
              toggle
              checked={editedProduct.showInShop}
              onChange={() =>
                setEditedProduct({
                  ...editedProduct,
                  showInShop: !editedProduct.showInShop,
                })
              }
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={
            loading ||
            !editedProduct.name ||
            !editedProduct.price ||
            !editedProduct.type ||
            ((editedProduct.type === "cave" ||
              editedProduct.type === "spuntinu" ||
              product.type === "epicerie") &&
              !editedProduct.category)
          }
          loading={loading}
          color="purple"
          type="submit"
          form="editProduct-form"
          inverted
        >
          <Icon name="edit" /> Editer
        </Button>
        <Button
          disabled={loading}
          loading={loading}
          color="red"
          type="submit"
          form="editProduct-form"
          inverted
          onClick={() => setOpenEditProductModal(false)}
        >
          <Icon name="remove" /> Annuler
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditProductModal;
