export let $SERVER;

if (process.env.NODE_ENV !== "production") {
  $SERVER = "http://localhost:5000";
} else {
  $SERVER = "https://inde-piuma.herokuapp.com";
}

export const GOOGLE_API_KEY = "AIzaSyAZaWwVgn5z9gNPy0cbweEVGUeWwva5GGM";

export const tokenName = "piuma";

export const showShop = true;

export const stripePublic = "pk_test_eAyr9trbJArTYHJJgEePgULj00lTTB2TXk";

export const collectHour = "11h";
