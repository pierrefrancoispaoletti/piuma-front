/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  faHeartCircle,
  faPlus,
  faThumbsUp,
  faTrashAlt,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Header } from "semantic-ui-react";
import { $SERVER, tokenName } from "../../_const/_const";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import categories from "../../datas/categories";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Home = ({
  user,
  event,
  setEvent,
  setOpenAddEventModal,
  setSelectedCategory,
  setActiveMenu,
  products,
  setOpenLoginModal,
}) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem(`token-${tokenName}`);
  const [like, setLike] = useState(0);

  const vote = localStorage.getItem(`${tokenName}-event`);
  useEffect(() => {
    setLike(event.like);
    if (vote && vote !== event._id && event._id) {
      localStorage.removeItem(`${tokenName}-event`);
    }
  }, [event]);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array.slice(0, 6);
  };

  const findProductsImages = () => {
    const productsWithImages = products?.filter((product) => product.image);

    return shuffle(productsWithImages);
  };

  const findCategory = (slug) => {
    const categoryToFind = categories.find(
      (category) => category.slug === slug
    );

    return categoryToFind;
  };

  const handleAddLike = () => {
    if (!vote) {
      localStorage.setItem(`${tokenName}-event`, event._id);
      axios({
        method: "post",
        url: `${$SERVER}/api/events/updateLikes`,
        data: { _id: event._id },
      });
      setLike(like + 1);
    }
  };
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const base64Flag = `data:${event.image?.contentType};base64,`;
  const imageStr = arrayBufferToBase64(event.image?.data?.data);

  const handleDeleteEvent = (eventId) => {
    if (token) {
      setLoading(true);
      axios({
        method: "delete",
        url: `${$SERVER}/api/events/deleteEvent`,
        data: {
          eventId,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => setEvent({}))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setOpenLoginModal(true);
    }
  };
  return (
    <Container className="home">
      {user && (
        <div className="home-addbutton">
          {event && Object.keys(event).length === 0 && (
            <Button
              loading={loading}
              disabled={loading}
              color="green"
              circular
              size="medium"
              onClick={() => setOpenAddEventModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} size="2x" />
            </Button>
          )}
          {event && Object.keys(event).length > 0 && (
            <>
              {/* <Button
                loading={loading}
                disabled={loading}
                color="purple"
                circular
                size="medium"
                onClick={() => setOpenEditEventModal(true)}
              >
                <FontAwesomeIcon icon={faEdit} size="2x" />
              </Button> */}
              <Button
                loading={loading}
                disabled={loading}
                color="red"
                circular
                size="medium"
                onClick={() => handleDeleteEvent(event._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} size="2x" />
              </Button>
            </>
          )}
        </div>
      )}
      {event && Object.keys(event).length > 0 && (
        <>
          <Header className="home-header" as="h1">
            {event.name}
          </Header>
          <Container text className="home-presentation">
            {event.image && (
              <div>
                <img
                  style={{ width: "100%" }}
                  src={base64Flag + imageStr}
                  alt={event.name}
                />
              </div>
            )}
            {event.date && (
              <p>
                {`Le :
                ${new Date(event.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}`}
              </p>
            )}
            <p>{event.description}</p>
            <div className="home-like-button">
              <Button
                disabled={vote ? true : false}
                icon
                circular
                color="facebook"
                onClick={() => handleAddLike()}
              >
                <FontAwesomeIcon
                  size="1x"
                  icon={faThumbsUp}
                  style={{
                    "--fa-secondary-color": "white",
                    "--fa-secondary-opacity": 1,
                  }}
                />
              </Button>
              <span
                style={{
                  background: "transparent",
                  color: "white",
                  borderRadius: 50,
                  display: "inline-block",
                  padding: "5px 10px",
                }}
              >
                {like}
              </span>
            </div>
          </Container>
        </>
      )}
      {event && Object.keys(event).length === 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {products &&
            (findProductsImages()?.length > 0 ? (
              <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
              >
                {findProductsImages().map((product) => (
                  <div>
                    {product.choice && (
                      <FontAwesomeIcon
                        className="choisen alvp__icon"
                        icon={faHeartCircle}
                        style={{
                          "--fa-primary-color": "darkred",
                          "--fa-secondary-color": "transparent",
                        }}
                        size="2x"
                      />
                    )}
                    <img
                      src={
                        `data:${product?.image?.contentType};base64,` +
                        arrayBufferToBase64(product.image?.data?.data)
                      }
                      alt={product.name}
                    />
                    <HashLink
                      smooth
                      to={`/categories/${findCategory(product.type).slug}#${product._id}`}
                      onClick={() => {
                        setSelectedCategory(findCategory(product.type));
                        setActiveMenu(product.category);
                      }}
                    >
                      <p className="legend">{product.name}</p>
                      <p className="legend price">
                        {product.price} <small>€</small>
                      </p>
                    </HashLink>
                  </div>
                ))}
              </Carousel>
            ) : (
              <img
                height="280px"
                src="./assets/images/logo.png"
                alt="logo RDR"
              />
            ))}
        </div>
      )}
    </Container>
  );
};

export default Home;
