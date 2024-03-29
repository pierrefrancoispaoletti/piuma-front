/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Header, Icon, Modal, Radio } from "semantic-ui-react";
import categories from "../../../../datas/categories";
import Resizer from "react-image-file-resizer";
import { $SERVER, tokenName } from "../../../../_const/_const";

const AddProductModal = ({
  selectedCategory,
  setAppMessage,
  openAddProductModal,
  setOpenAddProductModal,
  setOpenLoginModal,
  setProducts,
}) => {
  const [product, setProduct] = useState({
    name: "",
    nameCorsican: "",
    region: "",
    description: "",
    descriptionCorsican: "",
    price: "",
    type: "",
    category: "",
    subCategory: "",
    choice: false,
    visible: true,
    image: "",
    showInShop: false,
  });

  const [loading, setLoading] = useState(false);
  const inputFile = useRef(null);

  useEffect(() => {
    setProduct({ ...product, type: selectedCategory.slug });
  }, [selectedCategory]);

  const changeProduct = (e) => {
    let updatedValue = {};
    updatedValue[e.target.name] = e.target.value;
    setProduct({ ...product, ...updatedValue });
  };

  const setImage = async (e) => {
    Resizer.imageFileResizer(
      e.target.files[0],
      400,
      400,
      "JPEG",
      100,
      0,
      (uri) => {
        setProduct({ ...product, image: uri });
      },
      "file"
    );
  };

  const token = localStorage.getItem(`token-${tokenName}`);

  const onChangeTypeRadio = (value) => {
    let selectedCheckboxes = product.type;

    selectedCheckboxes = value;

    setProduct({ ...product, type: selectedCheckboxes });
  };

  const onChangeCategoryRadio = (value) => {
    let selectedCheckboxes = product.category;

    selectedCheckboxes = value;

    setProduct({ ...product, category: selectedCheckboxes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description || "");
    formData.append("nameCorsican", product.nameCorsican);
    formData.append("descriptionCorsican", product.descriptionCorsican || "");
    formData.append("region", product.region || "");
    formData.append("price", product.price);
    formData.append("type", product.type);
    formData.append("category", product.category || "");
    formData.append("subCategory", product.subCategory || "");
    formData.append("choice", product.choice || false);
    formData.append("visible", product.visible || true);
    formData.append("image", product.image || "");
    formData.append("showInShop", product.showInShop || false);
    if (token) {
      setLoading(true);
      axios({
        method: "post",
        url: `${$SERVER}/api/products/createProduct`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (response && response.data.status === 200) {
            setProducts(response.data.data);
            setProduct({
              name: "",
              nameCorsican: "",
              region: "",
              description: "",
              descriptionCorsican: "",
              price: "",
              type: "",
              category: "",
              subCategory: "",
              choice: false,
              visible: true,
              image: "",
              showInShop: false,
            });
          }
          setAppMessage({
            success: response.data.status === 200 ? true : false,
            message: response.data.message,
          });
        })
        .then(() => {
          setOpenAddProductModal(false);
        })
        .catch((error) =>
          setAppMessage({
            success: false,
            message: "Il y a eu un probleme, veuillez reessayer",
          })
        )
        .finally(() => {
          setLoading(false);
        });
    } else {
      setOpenLoginModal(true);
    }
  };

  return (
    <Modal
      onClose={() => setOpenAddProductModal(false)}
      onOpen={() => setOpenAddProductModal(true)}
      open={openAddProductModal}
      size="small"
    >
      <Header icon>
        <Icon name="add" />
        Ajouter un Produit
      </Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit} id="addProduct-form">
          <Form.Field required error={!product.name}>
            <label>Nom du Produit</label>
            <input
              value={product.name}
              name="name"
              type="text"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Nom du Produit en Corse</label>
            <input
              value={product.nameCorsican}
              name="nameCorsican"
              type="text"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <textarea
              value={product.description}
              name="description"
              rows="5"
              cols="33"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description en Corse</label>
            <textarea
              value={product.descriptionCorsican}
              name="descriptionCorsican"
              rows="5"
              cols="33"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Région</label>
            <input
              value={product.region}
              name="region"
              type="text"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field required error={!product.price}>
            <label>Prix</label>
            <input
              min={1}
              step={0.1}
              value={product.price}
              name="price"
              type="number"
              onChange={(e) => changeProduct(e)}
            />
          </Form.Field>
          <Form.Field required error={!product.type}>
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
                    checked={product.type === cat.slug}
                  />
                )
            )}
          </Form.Field>
          {(product.type === "cave" ||
            product.type === "spuntinu" ||
            product.type === "epicerie") && (
            <Form.Field required error={!product.category}>
              <label>Categorie de Produit</label>
              {categories.map(
                (cat) =>
                  cat["slug"] === product.type &&
                  cat.subCategories?.map((subC) => (
                    <Radio
                      style={{ padding: 5 }}
                      key={subC.slug}
                      label={subC.name}
                      name={subC.slug}
                      value={subC.slug}
                      onChange={() => onChangeCategoryRadio(subC.slug)}
                      checked={product.category === subC.slug}
                    />
                  ))
              )}
            </Form.Field>
          )}
          <Form.Field>
            <label>Choix du Patron ?</label>
            <Radio
              toggle
              checked={product.choice}
              onChange={() =>
                setProduct({ ...product, choice: !product.choice })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Shoppable ?</label>
            <Radio
              toggle
              checked={product.showInShop}
              onChange={() =>
                setProduct({ ...product, showInShop: !product.showInShop })
              }
            />
          </Form.Field>
          <Form.Field>
            <input
              ref={inputFile}
              accept="image/*"
              id="addImage"
              files={product.image}
              type="file"
              hidden
              onChange={(e) => setImage(e)}
            />
            <Button
              disabled={loading}
              loading={loading}
              type="button"
              onClick={() => inputFile.current.click()}
              color="orange"
              inverted
            >
              Ajouter une image
            </Button>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={
            loading ||
            !product.name ||
            !product.price ||
            !product.type ||
            ((product.type === "cave" ||
              product.type === "spuntinu" ||
              product.type === "epicerie") &&
              !product.category)
          }
          loading={loading}
          color="green"
          type="submit"
          form="addProduct-form"
          inverted
        >
          <Icon name="add" /> Ajouter
        </Button>
        <Button
          disabled={loading}
          loading={loading}
          color="red"
          type="submit"
          form="addProduct-form"
          inverted
          onClick={() => setOpenAddProductModal(false)}
        >
          <Icon name="remove" /> Annuler
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddProductModal;
