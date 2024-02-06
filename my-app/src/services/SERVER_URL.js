// src/services/SERVER_URL.js

let SERVER_URL;

if (window.location.host.includes("localhost:3000")) {
  SERVER_URL = "http://localhost:5001";
} else {
  SERVER_URL = "https://aap-portfolio.adaptable.app";
}

export { SERVER_URL };