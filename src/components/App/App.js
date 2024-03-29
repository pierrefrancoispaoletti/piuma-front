/* eslint-disable no-unused-vars */
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { Button, Divider, Message, Transition } from "semantic-ui-react";
import Cart from "../../pages/Cart";
import Categories from "../../pages/Categories";
import Home from "../../pages/Home";
import { $SERVER, showShop, stripePublic } from "../../_const/_const";
import AddEventModal from "../Medium/Modals/AddEvent";
import AddProductModal from "../Medium/Modals/AddProduct";
import EditProductModal from "../Medium/Modals/EditProduct";
import ImageModal from "../Medium/Modals/ImageModal";
import Login from "../Medium/Modals/Login";
import PaymentModal from "../Medium/Modals/PaymentModal";
import UpdateImageModal from "../Medium/Modals/UpdateImageModal";
import CategoriesSidebar from "../Small/CategoriesSidebar";
import Copyright from "../Small/Copyright";
import TopAppBar from "../Small/TopAppBar";
import "./App.css";

// import io from "socket.io-client";
// import Orders from "../../pages/Orders";
// import Waiter from "../../pages/Waiter";

const stripePromise = loadStripe(stripePublic);
let socket;

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [activeMenu, setActiveMenu] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [user, setUser] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openUpdateImageModal, setOpenUpdateImageModal] = useState(false);
  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const [openEditEventModal, setOpenEditEventModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [appMessage, setAppMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);

  const [order, setOrder] = useState([]);

  const [cart, setCart] = useState([]);

  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const isAProductShoppable = products.some((product) => product.showInShop);

  const tableNumber = window.location.pathname.replace("/", "");

  // useEffect(() => {
  //   socket = io($SERVER);
  // }, [$SERVER]);

  useEffect(() => {
    if (Object.keys(appMessage).length !== 0) {
      setTimeout(() => {
        setAppMessage({});
      }, 5000);
    }
  }, [appMessage]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${$SERVER}/api/products/allProducts`)
      .then((response) => {
        if (response) {
          setProducts(response.data.data);
        }
      })
      .catch((error) =>
        setAppMessage({
          success: false,
          message: "Il y a eu un probléme, veuillez recharger la page",
        })
      )
      .finally(() => setLoading(false));

    setEventLoading(true);
    axios
      .get(`${$SERVER}/api/events/getEvent`)
      .then((response) => {
        if (response) {
          setEvent(response.data.data);
        }
      })
      .catch((error) => {
        setAppMessage({
          success: false,
          message: "Il y a eu un probléme, veuillez recharger la page",
        });
      })
      .finally(() => setEventLoading(false));
  }, []);

  return (
    <div className="App" style={{ position: "relative" }}>
      <>
        <Transition
          animation="jiggle"
          duration={500}
          visible={Object.keys(appMessage).length > 0}
        >
          <Message
            style={{
              position: "fixed",
              top: 15,
              zIndex: "1000",
              width: "100%",
            }}
            hidden={Object.keys(appMessage).length === 0}
            success={appMessage.success ? true : false}
            error={!appMessage.success ? true : false}
          >
            {appMessage.message}
          </Message>
        </Transition>
        <CategoriesSidebar
          setActiveMenu={setActiveMenu}
          activeMenu={activeMenu}
          setDropdownValue={setDropdownValue}
          selectedCategory={selectedCategory}
          setFilteredProducts={setFilteredProducts}
          products={products}
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          setSelectedCategory={setSelectedCategory}
        >
          <TopAppBar
            cart={cart}
            setCart={setCart}
            setSelectedCategory={setSelectedCategory}
            loading={loading}
            user={user}
            setSidebarVisible={setSidebarVisible}
            setOpenLoginModal={setOpenLoginModal}
            isAProductShoppable={isAProductShoppable}
          />
          <Divider hidden />
          <Login
            setUser={setUser}
            openLoginModal={openLoginModal}
            setOpenLoginModal={setOpenLoginModal}
            setAppMessage={setAppMessage}
          />
          <Switch>
            <Route exact path="/">
              <AddEventModal
                setEvent={setEvent}
                setAppMessage={setAppMessage}
                setOpenLoginModal={setOpenLoginModal}
                openAddEventModal={openAddEventModal}
                setOpenAddEventModal={setOpenAddEventModal}
              />
              <Home
                user={user}
                event={event}
                products={products}
                setEvent={setEvent}
                setSelectedCategory={setSelectedCategory}
                setActiveMenu={setActiveMenu}
                setOpenLoginModal={setOpenLoginModal}
                setOpenAddEventModal={setOpenAddEventModal}
                setOpenEditEventModal={setOpenEditEventModal}
              />
            </Route>
            <Route path="/categories/:categorie">
              <AddProductModal
                setProducts={setProducts}
                selectedCategory={selectedCategory}
                setOpenLoginModal={setOpenLoginModal}
                setAppMessage={setAppMessage}
                openAddProductModal={openAddProductModal}
                setOpenAddProductModal={setOpenAddProductModal}
              />
              <EditProductModal
                product={selectedProduct}
                setOpenEditProductModal={setOpenEditProductModal}
                setAppMessage={setAppMessage}
                setOpenLoginModal={setOpenLoginModal}
                openEditProductModal={openEditProductModal}
                setProducts={setProducts}
              />
              <UpdateImageModal
                openUpdateImageModal={openUpdateImageModal}
                setOpenUpdateImageModal={setOpenUpdateImageModal}
                setProducts={setProducts}
                product={selectedProduct}
                setOpenLoginModal={setOpenLoginModal}
                setAppMessage={setAppMessage}
              />
              <ImageModal
                openImageModal={openImageModal}
                setOpenImageModal={setOpenImageModal}
                product={selectedProduct}
              />
              <Categories
                filteredProducts={filteredProducts}
                setFilteredProducts={setFilteredProducts}
                user={user}
                setCart={setCart}
                cart={cart}
                selectedCategory={selectedCategory}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                dropdownValue={dropdownValue}
                setDropdownValue={setDropdownValue}
                products={products}
                setProducts={setProducts}
                setOpenLoginModal={setOpenLoginModal}
                setOpenAddProductModal={setOpenAddProductModal}
                setOpenImageModal={setOpenImageModal}
                setOpenUpdateImageModal={setOpenUpdateImageModal}
                setOpenEditProductModal={setOpenEditProductModal}
                setSelectedProduct={setSelectedProduct}
              />
            </Route>
            {showShop && isAProductShoppable && (
              <Route path="/panier">
                <Cart
                  setOpenPaymentModal={setOpenPaymentModal}
                  cart={cart}
                  setCart={setCart}
                  order={order}
                  setOrder={setOrder}
                />
                <Elements stripe={stripePromise}>
                  <PaymentModal
                    tableNumber={tableNumber}
                    setOpenPaymentModal={setOpenPaymentModal}
                    openPaymentModal={openPaymentModal}
                    setOrder={setOrder}
                    setCart={setCart}
                    cart={cart}
                    order={order}
                    socket={socket}
                  />
                </Elements>
              </Route>
            )}
            {/* {socket && (
              <Route path="/commandes">
                <Orders socket={socket} />
              </Route>
            )}
            {socket &&
              user &&
              (user.role === "isAdmin" || user.role === "waiter") && (
                <Route path="/serveur">
                  <Waiter socket={socket} user={user} />
                </Route>
              )} */}
          </Switch>
          <Divider />
          <Copyright />
        </CategoriesSidebar>
      </>
    </div>
  );
};

export default App;
