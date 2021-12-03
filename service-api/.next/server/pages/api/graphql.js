(() => {
var exports = {};
exports.id = "pages/api/graphql";
exports.ids = ["pages/api/graphql"];
exports.modules = {

/***/ "./lib/cors.js":
/*!*********************!*\
  !*** ./lib/cors.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const allowCors = fn => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allowCors);

/***/ }),

/***/ "./pages/api/graphql.js":
/*!******************************!*\
  !*** ./pages/api/graphql.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var apollo_server_micro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-micro */ "apollo-server-micro");
/* harmony import */ var apollo_server_micro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_micro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/cors */ "./lib/cors.js");
/* harmony import */ var _src_graphql_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/graphql-server */ "./src/graphql-server/index.js");
/* harmony import */ var _src_graphql_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_graphql_server__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/services/user-service */ "./src/services/user-service/index.js");
/* harmony import */ var _src_services_user_service__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_services_user_service__WEBPACK_IMPORTED_MODULE_3__);




const apolloServer = new apollo_server_micro__WEBPACK_IMPORTED_MODULE_0__.ApolloServer(_src_graphql_server__WEBPACK_IMPORTED_MODULE_2___default()({
  apiPathPrefix: "/api",

  normaliseRequest({
    req
  }) {
    return req;
  },

  refreshUserToken({
    res
  }, newUserToken) {
    res.setHeader("Set-Cookie", `${(_src_services_user_service__WEBPACK_IMPORTED_MODULE_3___default().COOKIE_USER_TOKEN_NAME)}=${newUserToken}; HttpOnly; Max-Age=${(_src_services_user_service__WEBPACK_IMPORTED_MODULE_3___default().COOKIE_USER_TOKEN_MAX_AGE)}; Path=/`);
  }

}));
const config = {
  api: {
    bodyParser: false
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_lib_cors__WEBPACK_IMPORTED_MODULE_1__.default)(apolloServer.createHandler({
  path: "/api/graphql"
})));

/***/ }),

/***/ "./src/graphql-server/create-context.js":
/*!**********************************************!*\
  !*** ./src/graphql-server/create-context.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const userService = __webpack_require__(/*! ../services/user-service */ "./src/services/user-service/index.js");

const getHost = __webpack_require__(/*! ../lib/get-host */ "./src/lib/get-host.js");

module.exports = function createContext({
  apiPathPrefix,
  normaliseRequest,
  refreshUserToken
}) {
  return function context(args) {
    const {
      cookies,
      headers
    } = normaliseRequest(args);
    const user = userService.authenticate(cookies[userService.COOKIE_USER_TOKEN_NAME]); // Refresh the user token (if available)

    if (user && refreshUserToken) {
      const newUserToken = userService.validateRefreshToken({
        refreshToken: cookies[userService.COOKIE_REFRESH_TOKEN_NAME],
        email: user.email
      });

      if (newUserToken) {
        refreshUserToken(args, newUserToken);
      }
    } // Determine the URL for webhook callbacks (ex: https://service-api.example.com/api)


    const publicHost = getHost({
      headers
    }) + apiPathPrefix;
    /**
     * serviceCallbackHost is used for third party services callbacks
     * It will be used in e.g. payment provider services callbacks
     * when async operations are finished
     *
     * Example for local development:
     *  - publicHost: http://localhost:3001/api
     *  - serviceCallbackHost: https://abcdefgh12345.ngrok.io/api
     *
     * Example for prod development:
     *  - publicHost: https://my-service-api.shop.com/api
     *  - serviceCallbackHost: https://my-service-api.shop.com/api
     */

    let serviceCallbackHost = process.env.SERVICE_CALLBACK_HOST;

    if (serviceCallbackHost) {
      if (!serviceCallbackHost.endsWith(apiPathPrefix)) {
        serviceCallbackHost += apiPathPrefix;
      }
    } else {
      serviceCallbackHost = publicHost;
    }

    return {
      user,
      publicHost,
      serviceCallbackHost
    };
  };
};

/***/ }),

/***/ "./src/graphql-server/index.js":
/*!*************************************!*\
  !*** ./src/graphql-server/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const createContext = __webpack_require__(/*! ./create-context */ "./src/graphql-server/create-context.js");

const resolvers = __webpack_require__(/*! ./resolvers */ "./src/graphql-server/resolvers.js");

const typeDefs = __webpack_require__(/*! ./type-defs */ "./src/graphql-server/type-defs.js");

module.exports = function createGraphqlServerConfig({
  apiPathPrefix = "",
  refreshUserToken,
  normaliseRequest
}) {
  const context = createContext({
    apiPathPrefix,
    refreshUserToken,
    normaliseRequest
  });
  return {
    context,
    resolvers,
    typeDefs,
    introspection: true,
    playground: {
      endpoint: context.publicHost,
      settings: {
        "request.credentials": "include"
      }
    },
    // Disable subscriptions (not currently supported with ApolloGateway)
    subscriptions: false
  };
};

/***/ }),

/***/ "./src/graphql-server/resolvers.js":
/*!*****************************************!*\
  !*** ./src/graphql-server/resolvers.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const crystallize = __webpack_require__(/*! ../services/crystallize */ "./src/services/crystallize/index.js");

const basketService = __webpack_require__(/*! ../services/basket-service */ "./src/services/basket-service/index.js");

const userService = __webpack_require__(/*! ../services/user-service */ "./src/services/user-service/index.js");

const voucherService = __webpack_require__(/*! ../services/voucher-service */ "./src/services/voucher-service/index.js");

const stripeService = __webpack_require__(/*! ../services/payment-providers/stripe */ "./src/services/payment-providers/stripe/index.js");

const mollieService = __webpack_require__(/*! ../services/payment-providers/mollie */ "./src/services/payment-providers/mollie/index.js");

const vippsService = __webpack_require__(/*! ../services/payment-providers/vipps */ "./src/services/payment-providers/vipps/index.js");

const klarnaService = __webpack_require__(/*! ../services/payment-providers/klarna */ "./src/services/payment-providers/klarna/index.js");

const paypalService = __webpack_require__(/*! ../services/payment-providers/paypal */ "./src/services/payment-providers/paypal/index.js");

function paymentProviderResolver(service) {
  return () => {
    return {
      enabled: service.enabled,
      config: service.frontendConfig
    };
  };
}

module.exports = {
  Query: {
    myCustomBusinessThing: () => ({
      whatIsThis: "This is an example of a custom query for GraphQL demonstration purpuses. Check out the MyCustomBusinnessQueries resolvers for how to resolve additional fields apart from the 'whatIsThis' field"
    }),
    basket: (parent, args, context) => basketService.get(_objectSpread(_objectSpread({}, args), {}, {
      context
    })),
    user: (parent, args, context) => userService.getUser({
      context
    }),
    orders: () => ({}),
    paymentProviders: () => ({}),
    voucher: (parent, args, context) => voucherService.get(_objectSpread(_objectSpread({}, args), {}, {
      context
    }))
  },
  MyCustomBusinnessQueries: {
    dynamicRandomInt() {
      console.log("dynamicRandomInt called");
      return parseInt(Math.random() * 100);
    }

  },
  PaymentProvidersQueries: {
    stripe: paymentProviderResolver(stripeService),
    klarna: paymentProviderResolver(klarnaService),
    vipps: paymentProviderResolver(vippsService),
    mollie: paymentProviderResolver(mollieService),
    paypal: paymentProviderResolver(paypalService)
  },
  OrderQueries: {
    get: (parent, args) => crystallize.orders.get(args.id)
  },
  Mutation: {
    user: () => ({}),
    paymentProviders: () => ({})
  },
  UserMutations: {
    sendMagicLink: (parent, args, context) => userService.sendMagicLink(_objectSpread(_objectSpread({}, args), {}, {
      context
    })),
    update: (parent, args, context) => userService.update(_objectSpread(_objectSpread({}, args), {}, {
      context
    }))
  },
  PaymentProvidersMutations: {
    stripe: () => ({}),
    klarna: () => ({}),
    mollie: () => ({}),
    vipps: () => ({}),
    paypal: () => ({})
  },
  StripeMutations: {
    createPaymentIntent: (parent, args, context) => stripeService.createPaymentIntent(_objectSpread(_objectSpread({}, args), {}, {
      context
    })),
    confirmOrder: (parent, args, context) => stripeService.confirmOrder(_objectSpread(_objectSpread({}, args), {}, {
      context
    }))
  },
  KlarnaMutations: {
    renderCheckout: (parent, args, context) => klarnaService.renderCheckout(_objectSpread(_objectSpread({}, args), {}, {
      context
    }))
  },
  MollieMutations: {
    createPayment: (parent, args, context) => mollieService.createPayment(_objectSpread(_objectSpread({}, args), {}, {
      context
    }))
  },
  VippsMutations: {
    initiatePayment: (parent, args, context) => vippsService.initiatePayment(_objectSpread(_objectSpread({}, args), {}, {
      context
    }))
  },
  PaypalMutation: {
    createPayment: (parent, args, context) => paypalService.createPaypalPayment(_objectSpread(_objectSpread({}, args), {}, {
      context,
      parent
    })),
    confirmPayment: (parent, args, context) => paypalService.confirmPaypalPayment(_objectSpread(_objectSpread({}, args), {}, {
      context,
      parent
    }))
  }
};

/***/ }),

/***/ "./src/graphql-server/type-defs.js":
/*!*****************************************!*\
  !*** ./src/graphql-server/type-defs.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const gql = __webpack_require__(/*! graphql-tag */ "graphql-tag");

module.exports = gql`
  scalar JSON

  type Query {
    myCustomBusinessThing: MyCustomBusinnessQueries!
    basket(basketModel: BasketModelInput!): Basket!
    user: User!
    paymentProviders: PaymentProvidersQueries!
    orders: OrderQueries!
    voucher(code: String!): VoucherResponse!
  }

  type VoucherResponse {
    voucher: Voucher
    isValid: Boolean!
  }

  type MyCustomBusinnessQueries {
    whatIsThis: String!
    dynamicRandomInt: Int!
  }

  type Basket {
    cart: [CartItem!]!
    total: Price!
    voucher: Voucher
  }

  type CartItem {
    sku: String!
    name: String
    path: String
    quantity: Int!
    vatType: VatType
    stock: Int
    price: Price
    priceVariants: [PriceVariant!]
    attributes: [Attribute!]
    images: [Image!]
  }

  type PriceVariant {
    price: Float
    identifier: String!
    currency: String!
  }

  type Attribute {
    attribute: String!
    value: String
  }

  type Image {
    url: String!
    variants: [ImageVariant!]
  }

  type ImageVariant {
    url: String!
    width: Int
    height: Int
  }

  type Price {
    gross: Float!
    net: Float!
    currency: String
    tax: Tax
    taxAmount: Float
    discount: Float!
  }

  type Tax {
    name: String
    percent: Float
  }

  type VatType {
    name: String!
    percent: Int!
  }

  type User {
    logoutLink: String!
    isLoggedIn: Boolean!
    email: String
    firstName: String
    middleName: String
    lastName: String
    meta: [KeyValuePair!]
  }

  type PaymentProvidersQueries {
    stripe: PaymentProvider!
    klarna: PaymentProvider!
    vipps: PaymentProvider!
    mollie: PaymentProvider!
    paypal: PaymentProvider!
  }

  type PaymentProvider {
    enabled: Boolean!
    config: JSON
  }

  type OrderQueries {
    get(id: String!): JSON
  }

  type Voucher {
    code: String!
    discountAmount: Int
    discountPercent: Float
  }

  type Mutation {
    user: UserMutations
    paymentProviders: PaymentProvidersMutations!
  }

  input BasketModelInput {
    locale: LocaleInput!
    cart: [SimpleCartItem!]!
    voucherCode: String
    crystallizeOrderId: String
    klarnaOrderId: String
  }

  input LocaleInput {
    locale: String!
    displayName: String
    appLanguage: String!
    crystallizeCatalogueLanguage: String
    crystallizePriceVariant: String
  }

  input SimpleCartItem {
    sku: String!
    path: String!
    quantity: Int
    priceVariantIdentifier: String!
  }

  type UserMutations {
    sendMagicLink(
      email: String!
      redirectURLAfterLogin: String!
    ): SendMagicLinkResponse!
    update(input: UserUpdateInput!): User!
  }

  input UserUpdateInput {
    firstName: String
    middleName: String
    lastName: String
    meta: [KeyValuePairInput!]
  }

  type SendMagicLinkResponse {
    success: Boolean!
    error: String
  }

  input CheckoutModelInput {
    basketModel: BasketModelInput!
    customer: OrderCustomerInput
    confirmationURL: String!
    checkoutURL: String!
    termsURL: String!
  }

  input OrderCustomerInput {
    firstName: String
    lastName: String
    addresses: [AddressInput!]
  }

  input AddressInput {
    type: String
    email: String
    firstName: String
    middleName: String
    lastName: String
    street: String
    street2: String
    streetNumber: String
    postalCode: String
    city: String
    state: String
    country: String
    phone: String
  }

  type PaymentProvidersMutations {
    stripe: StripeMutations!
    klarna: KlarnaMutations!
    mollie: MollieMutations!
    vipps: VippsMutations!
    paypal: PaypalMutation!
  }

  type StripeMutations {
    createPaymentIntent(
      checkoutModel: CheckoutModelInput!
      confirm: Boolean
      paymentMethodId: String
    ): JSON
    confirmOrder(
      checkoutModel: CheckoutModelInput!
      paymentIntentId: String!
    ): StripeConfirmOrderResponse!
  }

  type StripeConfirmOrderResponse {
    success: Boolean!
    orderId: String
  }

  type KlarnaMutations {
    renderCheckout(
      checkoutModel: CheckoutModelInput!
    ): KlarnaRenderCheckoutReponse!
  }

  type KlarnaRenderCheckoutReponse {
    html: String!
    klarnaOrderId: String!
    crystallizeOrderId: String!
  }

  type MollieMutations {
    createPayment(
      checkoutModel: CheckoutModelInput!
    ): MollieCreatePaymentResponse!
  }

  type MollieCreatePaymentResponse {
    success: Boolean!
    checkoutLink: String
    crystallizeOrderId: String!
  }

  type VippsMutations {
    initiatePayment(
      checkoutModel: CheckoutModelInput!
    ): VippsInitiatePaymentResponse!
  }

  type VippsInitiatePaymentResponse {
    success: Boolean!
    checkoutLink: String
    crystallizeOrderId: String!
  }

  type PaypalMutation {
    createPayment(checkoutModel: CheckoutModelInput!): PaypalPaymentResponse!
    confirmPayment(
      checkoutModel: CheckoutModelInput!
      orderId: String
    ): PaypalPaymentResponse!
  }

  type PaypalPaymentResponse {
    success: Boolean!
    orderId: String
  }

  type KeyValuePair {
    key: String!
    value: String
  }

  input KeyValuePairInput {
    key: String!
    value: String
  }
`;

/***/ }),

/***/ "./src/lib/currency.js":
/*!*****************************!*\
  !*** ./src/lib/currency.js ***!
  \*****************************/
/***/ ((module) => {

function formatCurrency({
  amount,
  currency
}) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount);
}

module.exports = {
  formatCurrency
};

/***/ }),

/***/ "./src/lib/get-host.js":
/*!*****************************!*\
  !*** ./src/lib/get-host.js ***!
  \*****************************/
/***/ ((module) => {

module.exports = function getHost({
  headers
}) {
  // If behind a reverse proxy like AWS Elastic Beanstalk for instance
  const {
    "x-forwarded-proto": xprotocol,
    "x-forwarded-host": xhost
  } = headers;

  if (xprotocol && xhost) {
    return `${xprotocol}://${xhost}`;
  }

  if (process.env.HOST_URL) {
    return process.env.HOST_URL;
  }

  const {
    Host,
    host = Host
  } = headers;

  if (host && host.startsWith("localhost")) {
    return `http://${host}`;
  } // If hosted on Vercel


  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (!host) {
    throw new Error("Cannot determine host for the current request context");
  }

  return `https://${host}`;
};

/***/ }),

/***/ "./src/services/basket-service/calculate-voucher-discount-amount.js":
/*!**************************************************************************!*\
  !*** ./src/services/basket-service/calculate-voucher-discount-amount.js ***!
  \**************************************************************************/
/***/ ((module) => {

function truncateDecimalsOfNumber(originalNumber, numberOfDecimals = 2) {
  // toFixed() converts a number into a string by truncating it
  // with the number of decimals passed as parameter.
  const amountTruncated = originalNumber.toFixed(numberOfDecimals); // We use parseFloat() to return a transform the string into a number

  return parseFloat(amountTruncated);
}

function calculateVoucherDiscountAmount({
  voucher,
  amount
}) {
  // We assume that the voucher has the right format.
  // It either has `discountPercent` or `discountAmount`
  const isDiscountAmount = Boolean(voucher.discountAmount);

  if (isDiscountAmount) {
    return voucher.discountAmount;
  }

  const amountToDiscount = amount * voucher.discountPercent / 100;
  return truncateDecimalsOfNumber(amountToDiscount);
}

module.exports = {
  calculateVoucherDiscountAmount
};

/***/ }),

/***/ "./src/services/basket-service/get-products-from-crystallize.js":
/*!**********************************************************************!*\
  !*** ./src/services/basket-service/get-products-from-crystallize.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Gets information for products with a given path.
 * Gets all of the products with a single request
 * by composing the query dynamically
 */
async function getProductsFromCrystallize({
  paths,
  language
}) {
  if (paths.length === 0) {
    return [];
  }

  const {
    callCatalogueApi
  } = __webpack_require__(/*! ../crystallize/utils */ "./src/services/crystallize/utils.js");

  const response = await callCatalogueApi({
    query: `{
      ${paths.map((path, index) => `
        product${index}: catalogue(path: "${path}", language: "${language}") {
          path
          ... on Product {
            id
            vatType {
              name
              percent
            }
            variants {
              id
              sku
              name
              stock
              priceVariants {
                price
                identifier
                currency
              }
              attributes {
                attribute
                value
              }
              images {
                url
                variants {
                  url
                  width
                  height
                }
              }
            }
          }
        }
      `)}
    }`
  });
  return paths.map((_, i) => response.data[`product${i}`]).filter(p => !!p);
}

module.exports = {
  getProductsFromCrystallize
};

/***/ }),

/***/ "./src/services/basket-service/index.js":
/*!**********************************************!*\
  !*** ./src/services/basket-service/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _excluded = ["locale", "voucherCode"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Calculate the totals
function getTotals({
  cart,
  vatType
}) {
  return cart.reduce((acc, curr) => {
    const {
      quantity,
      price
    } = curr;

    if (price) {
      const priceToUse = price.discounted || price;
      acc.gross += priceToUse.gross * quantity;
      acc.net += priceToUse.net * quantity;
      acc.currency = price.currency;
    }

    return acc;
  }, {
    gross: 0,
    net: 0,
    tax: vatType,
    discount: 0,
    currency: "N/A"
  });
}

module.exports = {
  async get({
    basketModel,
    context
  }) {
    const {
      locale,
      voucherCode
    } = basketModel,
          basketFromClient = _objectWithoutProperties(basketModel, _excluded);
    /**
     * Resolve all the voucher codes to valid vouchers for the user
     */


    let voucher;

    if (voucherCode) {
      const voucherService = __webpack_require__(/*! ../voucher-service */ "./src/services/voucher-service/index.js");

      const response = await voucherService.get({
        code: voucherCode,
        context
      });

      if (response.isValid) {
        voucher = response.voucher;
      }
    }
    /**
     * Get all products from Crystallize from their paths
     */


    const {
      getProductsFromCrystallize
    } = __webpack_require__(/*! ./get-products-from-crystallize */ "./src/services/basket-service/get-products-from-crystallize.js");

    const productDataFromCrystallize = await getProductsFromCrystallize({
      paths: basketFromClient.cart.map(p => p.path),
      language: locale.crystallizeCatalogueLanguage
    });
    let vatType;
    /**
     * Compose the complete cart items enriched with
     * data from Crystallize
     */

    const cart = basketFromClient.cart.map(itemFromClient => {
      const product = productDataFromCrystallize.find(p => p.variants.some(v => v.sku === itemFromClient.sku));

      if (!product) {
        return null;
      }

      vatType = product.vatType;
      const variant = product.variants.find(v => v.sku === itemFromClient.sku);
      const {
        price,
        currency
      } = variant.priceVariants.find(pv => pv.identifier === itemFromClient.priceVariantIdentifier) || variant.priceVariants.find(p => p.identifier === "default");
      const gross = price;
      const net = price * 100 / (100 + vatType.percent);
      return _objectSpread({
        productId: product.id,
        productVariantId: variant.id,
        path: product.path,
        quantity: itemFromClient.quantity || 1,
        vatType,
        price: {
          gross,
          net,
          tax: vatType,
          currency
        }
      }, variant);
    }).filter(p => !!p); // Calculate the totals

    let total = getTotals({
      cart,
      vatType
    }); // Add a voucher

    let cartWithVoucher = cart;

    if (cart.length > 0 && voucher) {
      const {
        calculateVoucherDiscountAmount
      } = __webpack_require__(/*! ./calculate-voucher-discount-amount */ "./src/services/basket-service/calculate-voucher-discount-amount.js");

      const discountAmount = calculateVoucherDiscountAmount({
        voucher,
        amount: total.gross
      }); // Reduce the price for each item

      cartWithVoucher = cart.map(cartItem => {
        const portionOfTotal = cartItem.price.gross * cartItem.quantity / total.gross;
        /**
         * Each cart item gets a portion of the voucher that
         * is relative to their own portion of the total discount
         */

        const portionOfDiscount = discountAmount * portionOfTotal;
        const gross = cartItem.price.gross - portionOfDiscount / cartItem.quantity;
        const net = gross * 100 / (100 + cartItem.vatType.percent);
        return _objectSpread(_objectSpread({}, cartItem), {}, {
          price: _objectSpread(_objectSpread({}, cartItem.price), {}, {
            gross,
            net
          })
        });
      }); // Adjust totals

      total = getTotals({
        cart: cartWithVoucher,
        vatType
      });
      total.discount = discountAmount;
    }

    return {
      voucher,
      cart: cartWithVoucher,
      total
    };
  }

};

/***/ }),

/***/ "./src/services/crystallize/customers/create-customer.js":
/*!***************************************************************!*\
  !*** ./src/services/crystallize/customers/create-customer.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  callPimApi,
  getTenantId
} = __webpack_require__(/*! ../utils */ "./src/services/crystallize/utils.js");

module.exports = async function createCustomer(customer) {
  const tenantId = await getTenantId();
  const response = await callPimApi({
    variables: {
      input: _objectSpread({
        tenantId
      }, customer)
    },
    query: `
      mutation createCustomer(
        $input: CreateCustomerInput!
      ) {
        customer {
          create(
            input: $input
          ) {
            identifier
          }
        }
      }
    `
  });
  return response.data.customer.create;
};

/***/ }),

/***/ "./src/services/crystallize/customers/get-customer.js":
/*!************************************************************!*\
  !*** ./src/services/crystallize/customers/get-customer.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  callPimApi,
  getTenantId
} = __webpack_require__(/*! ../utils */ "./src/services/crystallize/utils.js");

module.exports = async function getCustomer({
  identifier,
  externalReference
}) {
  const tenantId = await getTenantId();
  const response = await callPimApi({
    variables: {
      tenantId,
      identifier,
      externalReference
    },
    query: `
      query getCustomer(
        $tenantId: ID!
        $identifier: String
        $externalReference: CustomerExternalReferenceInput
      ){
        customer {
          get(
            tenantId: $tenantId
            identifier: $identifier
            externalReference: $externalReference
          ) {
            identifier
            firstName
            middleName
            lastName
            meta {
              key
              value
            }
          }
        }
      }
    `
  });
  return response.data.customer.get;
};

/***/ }),

/***/ "./src/services/crystallize/customers/index.js":
/*!*****************************************************!*\
  !*** ./src/services/crystallize/customers/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const create = __webpack_require__(/*! ./create-customer */ "./src/services/crystallize/customers/create-customer.js");

const update = __webpack_require__(/*! ./update-customer */ "./src/services/crystallize/customers/update-customer.js");

const get = __webpack_require__(/*! ./get-customer */ "./src/services/crystallize/customers/get-customer.js");

module.exports = {
  create,
  update,
  get
};

/***/ }),

/***/ "./src/services/crystallize/customers/update-customer.js":
/*!***************************************************************!*\
  !*** ./src/services/crystallize/customers/update-customer.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _excluded = ["identifier"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const {
  callPimApi,
  getTenantId
} = __webpack_require__(/*! ../utils */ "./src/services/crystallize/utils.js");

module.exports = async function updateCustomer(_ref) {
  let {
    identifier
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const tenantId = await getTenantId();
  const response = await callPimApi({
    variables: _objectSpread({
      tenantId,
      identifier
    }, rest),
    query: `
      mutation updateCustomer(
        $tenantId: ID!
        $identifier: String!
        $customer: UpdateCustomerInput!
      ) {
        customer {
          update(
            tenantId: $tenantId
            identifier: $identifier
            input: $customer
          ) {
            identifier
          }
        }
      }
    `
  });
  return response.data.customer.update;
};

/***/ }),

/***/ "./src/services/crystallize/index.js":
/*!*******************************************!*\
  !*** ./src/services/crystallize/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const orders = __webpack_require__(/*! ./orders */ "./src/services/crystallize/orders/index.js");

const customers = __webpack_require__(/*! ./customers */ "./src/services/crystallize/customers/index.js");

module.exports = {
  orders,
  customers
};

/***/ }),

/***/ "./src/services/crystallize/orders/create-order.js":
/*!*********************************************************!*\
  !*** ./src/services/crystallize/orders/create-order.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  callOrdersApi,
  normaliseOrderModel
} = __webpack_require__(/*! ../utils */ "./src/services/crystallize/utils.js");

module.exports = async function createOrder(variables) {
  const response = await callOrdersApi({
    variables: normaliseOrderModel(variables),
    query: `
      mutation createOrder(
        $customer: CustomerInput!
        $cart: [OrderItemInput!]!
        $total: PriceInput
        $payment: [PaymentInput!]
        $additionalInformation: String
        $meta: [OrderMetadataInput!]
      ) {
        orders {
          create(
            input: {
              customer: $customer
              cart: $cart
              total: $total
              payment: $payment
              additionalInformation: $additionalInformation
              meta: $meta
            }
          ) {
            id
          }
        }
      }
    `
  });
  return response.data.orders.create;
};

/***/ }),

/***/ "./src/services/crystallize/orders/get-order.js":
/*!******************************************************!*\
  !*** ./src/services/crystallize/orders/get-order.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  callOrdersApi
} = __webpack_require__(/*! ../utils */ "./src/services/crystallize/utils.js");

module.exports = async function getOrder(id) {
  const response = await callOrdersApi({
    variables: {
      id
    },
    query: `
      query getOrder($id: ID!){
        orders {
          get(id: $id) {
            id
            total {
              net
              gross
              currency
              tax {
                name
                percent
              }
            }
            meta {
              key
              value
            }
            additionalInformation
            payment {
              ... on StripePayment {
                provider
                paymentMethod
              }
              ... on PaypalPayment {
                provider
                orderId
              }
              ... on CustomPayment {
                provider
                properties {
                  property
                  value
                }
              }
              ... on KlarnaPayment {
                provider
                orderId
              }
            }
            cart {
              sku
              name
              quantity
              imageUrl
              price {
                net
                gross
                currency
              }
              meta {
                key
                value
              }
            }
            customer {
              firstName
              lastName
              addresses {
                type
                email
              }
            }
          }
        }
      }
    `
  });
  const order = response.data.orders.get;

  if (!order) {
    throw new Error(`Cannot retrieve order "${id}"`);
  }

  return order;
};

/***/ }),

/***/ "./src/services/crystallize/orders/index.js":
/*!**************************************************!*\
  !*** ./src/services/crystallize/orders/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const create = __webpack_require__(/*! ./create-order */ "./src/services/crystallize/orders/create-order.js");

const update = __webpack_require__(/*! ./update-order */ "./src/services/crystallize/orders/update-order.js");

const get = __webpack_require__(/*! ./get-order */ "./src/services/crystallize/orders/get-order.js");

const waitForOrderToBePersistated = __webpack_require__(/*! ./wait-for-order-to-be-persistated */ "./src/services/crystallize/orders/wait-for-order-to-be-persistated.js");

module.exports = {
  create,
  update,
  get,
  waitForOrderToBePersistated
};

/***/ }),

/***/ "./src/services/crystallize/orders/update-order.js":
/*!*********************************************************!*\
  !*** ./src/services/crystallize/orders/update-order.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  callPimApi,
  normaliseOrderModel
} = __webpack_require__(/*! ../utils */ "./src/services/crystallize/utils.js");

module.exports = async function updateOrder(id, variables) {
  const response = await callPimApi({
    variables: {
      id,
      input: normaliseOrderModel(variables)
    },
    query: `
      mutation updateOrder(
        $id: ID!
        $input: UpdateOrderInput!
      ) {
        order {
            update(
            id: $id,
            input: $input
          ) {
            id
          }
        }
      }
  `
  });
  return response.data.order.update;
};

/***/ }),

/***/ "./src/services/crystallize/orders/wait-for-order-to-be-persistated.js":
/*!*****************************************************************************!*\
  !*** ./src/services/crystallize/orders/wait-for-order-to-be-persistated.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  callOrdersApi
} = __webpack_require__(/*! ../utils */ "./src/services/crystallize/utils.js");

module.exports = function waitForOrderToBePersistated({
  id
}) {
  let retries = 0;
  const maxRetries = 10;
  return new Promise((resolve, reject) => {
    (async function check() {
      const response = await callOrdersApi({
        query: `
          {
            orders {
              get(id: "${id}") {
                id
                createdAt
              }
            }
          }
        `
      });

      if (response.data && response.data.orders.get) {
        resolve();
      } else {
        retries += 1;

        if (retries > maxRetries) {
          reject(`Timeout out waiting for Crystallize order "${id}" to be persisted`);
        } else {
          setTimeout(check, 1000);
        }
      }
    })();
  });
};

/***/ }),

/***/ "./src/services/crystallize/utils.js":
/*!*******************************************!*\
  !*** ./src/services/crystallize/utils.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _excluded = ["customer", "cart", "total", "voucher"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const invariant = __webpack_require__(/*! invariant */ "invariant");

const fetch = __webpack_require__(/*! node-fetch */ "node-fetch");

const CRYSTALLIZE_TENANT_IDENTIFIER = process.env.CRYSTALLIZE_TENANT_IDENTIFIER;
const CRYSTALLIZE_ACCESS_TOKEN_ID = process.env.CRYSTALLIZE_ACCESS_TOKEN_ID;
const CRYSTALLIZE_ACCESS_TOKEN_SECRET = process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET;
invariant(CRYSTALLIZE_TENANT_IDENTIFIER, "Missing process.env.CRYSTALLIZE_TENANT_IDENTIFIER");

function createApiCaller(uri) {
  return async function callApi({
    query,
    variables,
    operationName
  }) {
    invariant(CRYSTALLIZE_ACCESS_TOKEN_ID, "Missing process.env.CRYSTALLIZE_ACCESS_TOKEN_ID");
    invariant(CRYSTALLIZE_ACCESS_TOKEN_SECRET, "Missing process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET");
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Crystallize-Access-Token-Id": CRYSTALLIZE_ACCESS_TOKEN_ID,
        "X-Crystallize-Access-Token-Secret": CRYSTALLIZE_ACCESS_TOKEN_SECRET
      },
      body: JSON.stringify({
        operationName,
        query,
        variables
      })
    });
    const json = await response.json();

    if (json.errors) {
      console.log(JSON.stringify(json.errors, null, 2));
    }

    return json;
  };
} // eslint-disable-next-line no-unused-vars


function normaliseOrderModel(_ref) {
  let {
    customer,
    cart,
    total,
    voucher
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, rest), total && {
    total: {
      gross: total.gross,
      net: total.net,
      currency: total.currency,
      tax: total.tax
    }
  }), cart && {
    cart: cart.map(function handleOrderCartItem(item) {
      const {
        images = [],
        name,
        sku,
        productId,
        productVariantId,
        quantity,
        price
      } = item;
      return {
        name,
        sku,
        productId,
        productVariantId,
        quantity,
        price,
        imageUrl: images && images[0] && images[0].url
      };
    })
  }), customer && {
    customer: {
      identifier: customer.identifier,
      firstName: customer.firstName || null,
      lastName: customer.lastName || null,
      addresses: customer.addresses || [{
        type: "billing",
        email: customer.email || undefined
      }]
    }
  });
}

const getTenantId = function () {
  let tenantId;
  return async () => {
    if (tenantId) {
      return tenantId;
    }

    const tenantIdResponse = await callCatalogueApi({
      query: `
          {
            tenant {
              id
            }
          }
        `
    });
    tenantId = tenantIdResponse.data.tenant.id;
    return tenantId;
  };
}();
/**
 * Catalogue API is the fast read-only API to lookup data
 * for a given item path or anything else in the catalogue
 */


const callCatalogueApi = createApiCaller(`https://api.crystallize.com/${CRYSTALLIZE_TENANT_IDENTIFIER}/catalogue`);
/**
 * Search API is the fast read-only API to search across
 * all items and topics
 */

const callSearchApi = createApiCaller(`https://api.crystallize.com/${CRYSTALLIZE_TENANT_IDENTIFIER}/search`);
/**
 * Orders API is the highly scalable API to send/read massive
 * amounts of orders
 */

const callOrdersApi = createApiCaller(`https://api.crystallize.com/${CRYSTALLIZE_TENANT_IDENTIFIER}/orders`);
/**
 * The PIM API is used for doing the ALL possible actions on
 * a tenant or your user profile
 */

const callPimApi = createApiCaller("https://pim.crystallize.com/graphql");
module.exports = {
  normaliseOrderModel,
  callCatalogueApi,
  callSearchApi,
  callOrdersApi,
  callPimApi,
  getTenantId
};

/***/ }),

/***/ "./src/services/email-service/index.js":
/*!*********************************************!*\
  !*** ./src/services/email-service/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  sendEmail
} = __webpack_require__(/*! ./utils */ "./src/services/email-service/utils.js");

const sendOrderConfirmation = __webpack_require__(/*! ./order-confirmation */ "./src/services/email-service/order-confirmation.js");

const sendUserMagicLink = __webpack_require__(/*! ./user-magic-link */ "./src/services/email-service/user-magic-link.js");

module.exports = {
  sendEmail,
  sendOrderConfirmation,
  sendUserMagicLink
};

/***/ }),

/***/ "./src/services/email-service/order-confirmation.js":
/*!**********************************************************!*\
  !*** ./src/services/email-service/order-confirmation.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = async function sendOrderConfirmation(orderId) {
  try {
    const mjml2html = __webpack_require__(/*! mjml */ "mjml");

    const {
      formatCurrency
    } = __webpack_require__(/*! ../../lib/currency */ "./src/lib/currency.js");

    const {
      orders
    } = __webpack_require__(/*! ../crystallize */ "./src/services/crystallize/index.js");

    const {
      sendEmail
    } = __webpack_require__(/*! ./utils */ "./src/services/email-service/utils.js");

    const order = await orders.get(orderId);
    const {
      email
    } = order.customer.addresses[0];

    if (!email) {
      return {
        success: false,
        error: "No email is conntected with the customer object"
      };
    }

    const {
      html
    } = mjml2html(`
      <mjml>
        <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>
              <h1>Order Summary</h1>
              <p>Thanks for your order! This email contains a copy of your order for your reference.</p>
              <p>
                Order Number: <strong>#${order.id}</strong>
              </p>
              <p>
                First name: <strong>${order.customer.firstName}</strong><br />
                Last name: <strong>${order.customer.lastName}</strong><br />
                Email address: <strong>${email}</strong>
              </p>
              <p>
                Total: <strong>${formatCurrency({
      amount: order.total.gross,
      currency: order.total.currency
    })}</strong>
              </p>
            </mj-text>
            <mj-table>
              <tr style="border-bottom: 1px solid #ecedee; text-align: left;">
                <th style="padding: 0 15px 0 0;">Name</th>
                <th style="padding: 0 15px;">Quantity</th>
                <th style="padding: 0 0 0 15px;">Total</th>
              </tr>
              ${order.cart.map(item => `<tr>
                  <td style="padding: 0 15px 0 0;">${item.name} (${item.sku})</td>
                  <td style="padding: 0 15px;">${item.quantity}</td>
                  <td style="padding: 0 0 0 15px;">${formatCurrency({
      amount: item.price.gross * item.quantity,
      currency: item.price.currency
    })}</td>
                </tr>`)}
            </mj-table>
          </mj-column>
        </mj-section>
        </mj-body>
      </mjml>
    `);
    await sendEmail({
      to: email,
      subject: "Order summary",
      html
    });
    return {
      success: true
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error
    };
  }
};

/***/ }),

/***/ "./src/services/email-service/user-magic-link.js":
/*!*******************************************************!*\
  !*** ./src/services/email-service/user-magic-link.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  sendEmail
} = __webpack_require__(/*! ./utils */ "./src/services/email-service/utils.js");

module.exports = async function sendMagicLinkLogin({
  loginLink,
  email
}) {
  try {
    const mjml2html = __webpack_require__(/*! mjml */ "mjml");

    const {
      html
    } = mjml2html(`
      <mjml>
        <mj-body>
          <mj-section>
            <mj-column>
              <mj-text>Hi there! Simply follow the link below to login.</mj-text>
              <mj-button href="${loginLink}" align="left">Click here to login</mj-button>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `);
    await sendEmail({
      to: email,
      subject: "Magic link login",
      html
    });
    return {
      success: true
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error
    };
  }
};

/***/ }),

/***/ "./src/services/email-service/utils.js":
/*!*********************************************!*\
  !*** ./src/services/email-service/utils.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const invariant = __webpack_require__(/*! invariant */ "invariant");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM;
module.exports = {
  sendEmail(args) {
    invariant(SENDGRID_API_KEY, "process.env.SENDGRID_API_KEY not defined");
    invariant(EMAIL_FROM, "process.env.EMAIL_FROM is not defined");

    const sgMail = __webpack_require__(/*! @sendgrid/mail */ "@sendgrid/mail");

    sgMail.setApiKey(SENDGRID_API_KEY);
    return sgMail.send(_objectSpread({
      from: EMAIL_FROM
    }, args));
  }

};

/***/ }),

/***/ "./src/services/payment-providers/klarna/capture.js":
/*!**********************************************************!*\
  !*** ./src/services/payment-providers/klarna/capture.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * An example of how to capture an amount for on an
 * order. You would typically do this as a response to
 * an update of a Fulfilment Pipelane Stage change in
 * Crystallize (https://crystallize.com/learn/developer-guides/order-api/fulfilment-pipelines)
 */
module.exports = async function klarnaCapture({
  crystallizeOrderId
}) {
  const crystallize = __webpack_require__(/*! ../../crystallize */ "./src/services/crystallize/index.js");

  const {
    getClient
  } = __webpack_require__(/*! ./utils */ "./src/services/payment-providers/klarna/utils.js"); // Retrieve the Crystallize order


  const crystallizeOrder = await crystallize.orders.get(crystallizeOrderId);
  const klarnaPayment = crystallizeOrder.payment.find(p => p.provider === "klarna");

  if (!klarnaPayment) {
    throw new Error(`Order ${crystallizeOrderId} has no Klarna payment`);
  }

  const klarnaOrderId = klarnaPayment.orderId;

  if (!klarnaOrderId) {
    throw new Error(`Order ${crystallizeOrderId} has no klarnaOrderId`);
  }

  const klarnaClient = await getClient(); // Capture the full amount for the order

  const {
    error,
    response
  } = await klarnaClient.ordermanagementV1.captures.capture(klarnaOrderId);
  console.log(error, response);
  /**
   * You would typically also move the order in the
   * fulfilment pipeline from a stage called e.g.
   * "created" to "purchased" here
   */
};

/***/ }),

/***/ "./src/services/payment-providers/klarna/index.js":
/*!********************************************************!*\
  !*** ./src/services/payment-providers/klarna/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const KLARNA_USERNAME = process.env.KLARNA_USERNAME;
const KLARNA_PASSWORD = process.env.KLARNA_PASSWORD;

const {
  getClient
} = __webpack_require__(/*! ./utils */ "./src/services/payment-providers/klarna/utils.js");

const renderCheckout = __webpack_require__(/*! ./render-checkout */ "./src/services/payment-providers/klarna/render-checkout.js");

const push = __webpack_require__(/*! ./push */ "./src/services/payment-providers/klarna/push.js");

const capture = __webpack_require__(/*! ./capture */ "./src/services/payment-providers/klarna/capture.js");

module.exports = {
  enabled: Boolean(KLARNA_USERNAME && KLARNA_PASSWORD),
  frontendConfig: {},
  getClient,
  renderCheckout,
  push,
  capture
};

/***/ }),

/***/ "./src/services/payment-providers/klarna/push.js":
/*!*******************************************************!*\
  !*** ./src/services/payment-providers/klarna/push.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = async function klarnaPush({
  crystallizeOrderId,
  klarnaOrderId
}) {
  const {
    getClient
  } = __webpack_require__(/*! ./utils */ "./src/services/payment-providers/klarna/utils.js");

  console.log("Klarna push", {
    crystallizeOrderId,
    klarnaOrderId
  });
  const klarnaClient = await getClient(); // Retrieve the Klarna order to get the payment status
  // Acknowledge the Klarna order

  await klarnaClient.ordermanagementV1.orders.acknowledge(klarnaOrderId);
  /**
   * You would typically also move the order in the
   * fulfilment pipeline from a stage called e.g.
   * "initial" to "created" here
   */
};

/***/ }),

/***/ "./src/services/payment-providers/klarna/render-checkout.js":
/*!******************************************************************!*\
  !*** ./src/services/payment-providers/klarna/render-checkout.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = async function renderCheckout({
  checkoutModel,
  context
}) {
  const crystallize = __webpack_require__(/*! ../../crystallize */ "./src/services/crystallize/index.js");

  const basketService = __webpack_require__(/*! ../../basket-service */ "./src/services/basket-service/index.js");

  const {
    getClient
  } = __webpack_require__(/*! ./utils */ "./src/services/payment-providers/klarna/utils.js");

  const toKlarnaOrderModel = __webpack_require__(/*! ./to-klarna-order-model */ "./src/services/payment-providers/klarna/to-klarna-order-model.js");

  const {
    basketModel,
    customer,
    confirmationURL,
    termsURL,
    checkoutURL
  } = checkoutModel;
  const {
    serviceCallbackHost,
    user
  } = context;
  let {
    crystallizeOrderId,
    klarnaOrderId
  } = basketModel;
  const basket = await basketService.get({
    basketModel,
    context
  }); // Add the identifier from the current logged in user

  const customerWithCurrentLoggedInUser = _objectSpread({}, customer);

  if (user) {
    customerWithCurrentLoggedInUser.identifier = user.email;
  }
  /**
   * Use a Crystallize order and the fulfilment pipelines to
   * manage the lifecycle of the order
   */


  if (crystallizeOrderId) {
    await crystallize.orders.update(crystallizeOrderId, _objectSpread(_objectSpread({}, basket), {}, {
      customer: customerWithCurrentLoggedInUser
    }));
  } else {
    const crystallizeOrder = await crystallize.orders.create(_objectSpread(_objectSpread({}, basket), {}, {
      customer: customerWithCurrentLoggedInUser
    }));
    crystallizeOrderId = crystallizeOrder.id;
  } // Setup the confirmation URL


  const confirmation = new URL(confirmationURL.replace("{crystallizeOrderId}", crystallizeOrderId));
  confirmation.searchParams.append("klarnaOrderId", "{checkout.order.id}");

  const validKlarnaOrderModel = _objectSpread(_objectSpread({}, toKlarnaOrderModel(basket)), {}, {
    purchase_country: "NO",
    purchase_currency: basket.total.currency || "NOK",
    locale: "no-nb",
    merchant_urls: {
      terms: termsURL,
      checkout: checkoutURL,
      confirmation: confirmation.toString(),
      push: `${serviceCallbackHost}/webhooks/payment-providers/klarna/push?crystallizeOrderId=${crystallizeOrderId}&klarnaOrderId={checkout.order.id}`
    }
  });

  const klarnaClient = await getClient();
  /**
   * Hold the HTML snippet that will be used on the
   * frontend to display the Klarna checkout
   */

  let html = "";
  /**
   * There is already a Klarna order id for this user
   * session, let's use that and not create a new one
   */

  if (klarnaOrderId) {
    const {
      error,
      response
    } = await klarnaClient.checkoutV3.updateOrder(klarnaOrderId, validKlarnaOrderModel);

    if (!error) {
      html = response.html_snippet;
      klarnaOrderId = response.order_id;
    } else {
      throw new Error(error);
    }
  } else {
    const {
      error,
      response
    } = await klarnaClient.checkoutV3.createOrder(validKlarnaOrderModel);

    if (!error) {
      html = response.html_snippet;
      klarnaOrderId = response.order_id;
    } else {
      throw new Error(error);
    }
  }
  /**
   * The Crystallize order creating is asynchronous, so we have
   * to wait for the order to be fully persisted
   */


  await crystallize.orders.waitForOrderToBePersistated({
    id: crystallizeOrderId
  }); // Tag the Crystallize order with the Klarna order id

  await crystallize.orders.update(crystallizeOrderId, _objectSpread(_objectSpread({}, basket), {}, {
    payment: [{
      provider: "klarna",
      klarna: {
        orderId: klarnaOrderId
      }
    }]
  }));
  return {
    html,
    klarnaOrderId,
    crystallizeOrderId
  };
};

/***/ }),

/***/ "./src/services/payment-providers/klarna/to-klarna-order-model.js":
/*!************************************************************************!*\
  !*** ./src/services/payment-providers/klarna/to-klarna-order-model.js ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = function crystallizeToKlarnaOrderModel(basket) {
  const {
    total,
    cart
  } = basket;
  const order_amount = total.gross * 100;
  return {
    order_amount,
    order_tax_amount: order_amount - total.net * 100,
    order_lines: cart.map(({
      sku,
      quantity,
      price,
      name,
      productId,
      productVariantId,
      imageUrl
    }) => {
      const {
        gross,
        net,
        tax
      } = price;
      const unit_price = gross * 100;

      if (sku.startsWith("--voucher--")) {
        return {
          reference: sku,
          name,
          quantity: 1,
          unit_price,
          total_amount: unit_price,
          total_tax_amount: 0,
          tax_rate: 0,
          type: "discount"
        };
      }

      const total_amount = unit_price * quantity;
      const total_tax_amount = total_amount - net * quantity * 100;
      return {
        name,
        reference: sku,
        unit_price,
        quantity,
        total_amount,
        total_tax_amount,
        type: "physical",
        tax_rate: tax.percent * 100,
        image_url: imageUrl,
        merchant_data: JSON.stringify({
          productId,
          productVariantId,
          taxGroup: tax
        })
      };
    })
  };
};

/***/ }),

/***/ "./src/services/payment-providers/klarna/utils.js":
/*!********************************************************!*\
  !*** ./src/services/payment-providers/klarna/utils.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Read more about how to talk to the Klarna API here:
 * https://developers.klarna.com/api/#introduction
 */
const invariant = __webpack_require__(/*! invariant */ "invariant");

const KLARNA_USERNAME = process.env.KLARNA_USERNAME;
const KLARNA_PASSWORD = process.env.KLARNA_PASSWORD;
let client;
module.exports = {
  getClient: () => {
    const {
      Klarna
    } = __webpack_require__(/*! @crystallize/node-klarna */ "@crystallize/node-klarna");

    invariant(KLARNA_USERNAME, "process.env.KLARNA_USERNAME is not defined");
    invariant(KLARNA_PASSWORD, "process.env.KLARNA_PASSWORD is not defined");

    if (!client && KLARNA_USERNAME && KLARNA_PASSWORD) {
      client = new Klarna({
        username: KLARNA_USERNAME,
        password: KLARNA_PASSWORD,
        apiEndpoint: "api.playground.klarna.com"
      });
    }

    return client;
  }
};

/***/ }),

/***/ "./src/services/payment-providers/mollie/create-payment.js":
/*!*****************************************************************!*\
  !*** ./src/services/payment-providers/mollie/create-payment.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = async function createMolliePayment({
  checkoutModel,
  context
}) {
  const basketService = __webpack_require__(/*! ../../basket-service */ "./src/services/basket-service/index.js");

  const crystallize = __webpack_require__(/*! ../../crystallize */ "./src/services/crystallize/index.js");

  const {
    getClient
  } = __webpack_require__(/*! ./utils */ "./src/services/payment-providers/mollie/utils.js");

  const {
    basketModel,
    customer,
    confirmationURL
  } = checkoutModel;
  const {
    serviceCallbackHost,
    user
  } = context; // Add the identifier from the current logged in user

  const customerWithCurrentLoggedInUser = _objectSpread({}, customer);

  if (user) {
    customerWithCurrentLoggedInUser.identifier = user.email;
  }

  const basket = await basketService.get({
    basketModel,
    context
  });
  const {
    total
  } = basket;
  let {
    crystallizeOrderId
  } = basketModel;
  const isSubscription = false;
  /* Use a Crystallize order and the fulfilment pipelines to
   * manage the lifecycle of the order
   */

  if (crystallizeOrderId) {
    await crystallize.orders.update(crystallizeOrderId, _objectSpread(_objectSpread({}, basket), {}, {
      customer: customerWithCurrentLoggedInUser,
      meta: [{
        key: "isSubscription",
        value: isSubscription ? "yes" : "no"
      }]
    }));
  } else {
    const crystallizeOrder = await crystallize.orders.create(_objectSpread(_objectSpread({}, basket), {}, {
      customer: customerWithCurrentLoggedInUser,
      meta: [{
        key: "isSubscription",
        value: isSubscription ? "yes" : "no"
      }]
    }));
    crystallizeOrderId = crystallizeOrder.id;
  }

  const mollieClient = await getClient();
  const mollieCustomer = await mollieClient.customers.create({
    name: `${customer.firstName} ${customer.lastName}`.trim() || "Jane Doe",
    email: customer.addresses[0].email
  });
  const confirmation = new URL(confirmationURL.replace("{crystallizeOrderId}", crystallizeOrderId));
  const validMollieOrder = {
    amount: {
      currency: process.env.MOLLIE_DEFAULT_CURRENCY || total.currency.toUpperCase(),
      value: total.gross.toFixed(2)
    },
    customerId: mollieCustomer.id,
    sequenceType: "first",
    description: "Mollie test transaction",
    redirectUrl: confirmation.toString(),
    webhookUrl: `${serviceCallbackHost}/webhooks/payment-providers/mollie/order-update`,
    metadata: {
      crystallizeOrderId
    }
  };
  const mollieOrderResponse = await mollieClient.payments.create(validMollieOrder);

  if (isSubscription) {
    await mollieClient.customers_mandates.get(mollieOrderResponse.mandateId, {
      customerId: mollieCustomer.id
    }); // Define the start date for the subscription

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 15);
    startDate.toISOString().split("T")[0];
    await mollieClient.customers_subscriptions.create({
      customerId: mollieCustomer.id,
      amount: validMollieOrder.amount,
      times: 1,
      interval: "1 month",
      startDate,
      description: "Mollie Test subscription",
      webhookUrl: `${serviceCallbackHost}/webhooks/payment-providers/mollie/subscription-renewal`,
      metadata: {}
    });
  }

  return {
    success: true,
    checkoutLink: mollieOrderResponse._links.checkout.href,
    crystallizeOrderId
  };
};

/***/ }),

/***/ "./src/services/payment-providers/mollie/index.js":
/*!********************************************************!*\
  !*** ./src/services/payment-providers/mollie/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  getClient
} = __webpack_require__(/*! ./utils */ "./src/services/payment-providers/mollie/utils.js");

const toCrystallizeOrderModel = __webpack_require__(/*! ./to-crystallize-order-model */ "./src/services/payment-providers/mollie/to-crystallize-order-model.js");

const createPayment = __webpack_require__(/*! ./create-payment */ "./src/services/payment-providers/mollie/create-payment.js");

module.exports = {
  enabled: Boolean(process.env.MOLLIE_API_KEY),
  frontendConfig: {},
  getClient,
  toCrystallizeOrderModel,
  createPayment
};

/***/ }),

/***/ "./src/services/payment-providers/mollie/to-crystallize-order-model.js":
/*!*****************************************************************************!*\
  !*** ./src/services/payment-providers/mollie/to-crystallize-order-model.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * TODO: review what happens to the General Order Vat Group on multiple tax groups
 * on order (mult. items having diff vatTypes, is it a thing?)
 */
module.exports = function mollieToCrystallizeOrderModel({
  mollieOrder,
  mollieCustomer
}) {
  const customerName = mollieCustomer.name.split(" ");
  return {
    customer: {
      identifier: mollieCustomer.email,
      firstName: customerName[0],
      middleName: customerName.slice(1, customerName.length - 1).join(),
      lastName: customerName[customerName.length - 1],
      birthDate: Date,
      addresses: [{
        type: "billing",
        firstName: customerName[0],
        middleName: customerName.slice(1, customerName.length - 1).join(),
        lastName: customerName[customerName.length - 1],
        street: "Test line1",
        street2: "Test line2",
        postalCode: "Test postal_code",
        city: "Test city",
        state: "Test state",
        country: "Test country",
        phone: "Test Phone",
        email: mollieCustomer.email
      }, {
        type: "delivery",
        firstName: customerName[0],
        middleName: customerName.slice(1, customerName.length - 1).join(),
        lastName: customerName[customerName.length - 1],
        street: "Test line1",
        street2: "Test line2",
        postalCode: "Test postal_code",
        city: "Test city",
        state: "Test state",
        country: "Test country",
        phone: "Test Phone",
        email: mollieCustomer.email
      }]
    },
    payment: [{
      provider: "custom",
      custom: {
        properties: [{
          property: "resource",
          value: mollieOrder.resource
        }, {
          property: "resource_id",
          value: mollieOrder.id
        }, {
          property: "mode",
          value: mollieOrder.mode
        }, {
          property: "method",
          value: mollieOrder.method
        }, {
          property: "status",
          value: mollieOrder.status
        }, {
          property: "profileId",
          value: mollieOrder.profileId
        }, {
          property: "mandateId",
          value: mollieOrder.mandateId
        }, {
          property: "customerId",
          value: mollieOrder.customerId
        }, {
          property: "sequenceType",
          value: mollieOrder.sequenceType
        }]
      }
    }]
  };
};

/***/ }),

/***/ "./src/services/payment-providers/mollie/utils.js":
/*!********************************************************!*\
  !*** ./src/services/payment-providers/mollie/utils.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const invariant = __webpack_require__(/*! invariant */ "invariant");

const MOLLIE_API_KEY = process.env.MOLLIE_API_KEY;
let client;
module.exports = {
  getClient: () => {
    invariant(MOLLIE_API_KEY, "process.env.MOLLIE_API_KEY is not defined");

    if (!client) {
      const {
        createMollieClient
      } = __webpack_require__(/*! @mollie/api-client */ "@mollie/api-client");

      client = createMollieClient({
        apiKey: process.env.MOLLIE_API_KEY
      });
    }

    return client;
  }
};

/***/ }),

/***/ "./src/services/payment-providers/paypal/confirm-payment.js":
/*!******************************************************************!*\
  !*** ./src/services/payment-providers/paypal/confirm-payment.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

async function confirmPaypalPayment({
  checkoutModel,
  orderId,
  context
}) {
  const checkoutNodeJssdk = __webpack_require__(/*! @paypal/checkout-server-sdk */ "@paypal/checkout-server-sdk");

  const crystallize = __webpack_require__(/*! ../../crystallize */ "./src/services/crystallize/index.js");

  const basketService = __webpack_require__(/*! ../../basket-service */ "./src/services/basket-service/index.js");

  const {
    paypal: PaypalClient
  } = __webpack_require__(/*! ./init-client */ "./src/services/payment-providers/paypal/init-client.js");

  const toCrystallizeOrderModel = __webpack_require__(/*! ./to-crystallize-order-model */ "./src/services/payment-providers/paypal/to-crystallize-order-model.js");

  try {
    const {
      basketModel
    } = checkoutModel;
    const basket = await basketService.get({
      basketModel,
      context
    });
    const response = await PaypalClient().execute(new checkoutNodeJssdk.orders.OrdersGetRequest(orderId));
    const order = await crystallize.orders.create(toCrystallizeOrderModel(basket, response.result));
    return {
      success: true,
      orderId: order.id
    };
  } catch (err) {
    console.error(err);
  }

  return {
    success: false
  };
}

module.exports = confirmPaypalPayment;

/***/ }),

/***/ "./src/services/payment-providers/paypal/create-payment.js":
/*!*****************************************************************!*\
  !*** ./src/services/payment-providers/paypal/create-payment.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

async function createPaypalPayment({
  checkoutModel,
  context
}) {
  const paypal = __webpack_require__(/*! @paypal/checkout-server-sdk */ "@paypal/checkout-server-sdk");

  const {
    paypal: PaypalClient
  } = __webpack_require__(/*! ./init-client */ "./src/services/payment-providers/paypal/init-client.js");

  const basketService = __webpack_require__(/*! ../../basket-service */ "./src/services/basket-service/index.js");

  const {
    basketModel
  } = checkoutModel; // Get a verified basket from the basket service

  const basket = await basketService.get({
    basketModel,
    context
  });
  const request = new paypal.orders.OrdersCreateRequest(); // Get the complete resource representation

  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: basket.total.currency,
        value: basket.total.gross.toString()
      }
    }]
  });
  let order;

  try {
    order = await PaypalClient().execute(request);
  } catch (err) {
    console.error(err);
    return {
      success: false
    };
  }

  return {
    success: true,
    orderId: order.result.id
  };
}

module.exports = createPaypalPayment;

/***/ }),

/***/ "./src/services/payment-providers/paypal/index.js":
/*!********************************************************!*\
  !*** ./src/services/payment-providers/paypal/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const createPaypalPayment = __webpack_require__(/*! ./create-payment */ "./src/services/payment-providers/paypal/create-payment.js");

const confirmPaypalPayment = __webpack_require__(/*! ./confirm-payment */ "./src/services/payment-providers/paypal/confirm-payment.js");

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
module.exports = {
  enabled: Boolean(PAYPAL_CLIENT_ID && PAYPAL_CLIENT_SECRET),
  frontendConfig: {
    clientId: PAYPAL_CLIENT_ID,
    currency: ""
  },
  createPaypalPayment,
  confirmPaypalPayment
};

/***/ }),

/***/ "./src/services/payment-providers/paypal/init-client.js":
/*!**************************************************************!*\
  !*** ./src/services/payment-providers/paypal/init-client.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function getClient() {
  const checkoutNodeJssdk = __webpack_require__(/*! @paypal/checkout-server-sdk */ "@paypal/checkout-server-sdk");

  const clientId = process.env.PAYPAL_CLIENT_ID || "PAYPAL-SANDBOX-CLIENT-ID";
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "PAYPAL-SANDBOX-CLIENT-SECRET"; // const clientEnv =
  //   process.env.NODE_ENV === "production"
  //     ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
  //     : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);

  const clientEnv = new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
  return new checkoutNodeJssdk.core.PayPalHttpClient(clientEnv);
}

module.exports = {
  paypal: getClient
};

/***/ }),

/***/ "./src/services/payment-providers/paypal/to-crystallize-order-model.js":
/*!*****************************************************************************!*\
  !*** ./src/services/payment-providers/paypal/to-crystallize-order-model.js ***!
  \*****************************************************************************/
/***/ ((module) => {

function toCrystallizeOrderModel(basket, order) {
  var _payer$name, _payer$name2, _payer$name3, _payer$name4;

  const {
    payer,
    purchase_units
  } = order;
  const {
    shipping
  } = purchase_units[0];
  const {
    address
  } = shipping;
  const orderId = order.id;
  /**
   * Use email or payer id as the customer identifier in Crystallize.
   */

  const identifier = order.payer.email_address || order.payer.payer_id;
  return {
    cart: basket.cart,
    total: basket.total,
    payment: [{
      provider: "paypal",
      paypal: {
        orderId
      }
    }],
    meta: [{
      key: "PAYPAL_ORDER_STATUS",
      value: order.status
    }],
    customer: {
      identifier,
      firstName: (payer === null || payer === void 0 ? void 0 : (_payer$name = payer.name) === null || _payer$name === void 0 ? void 0 : _payer$name.given_name) || "",
      middleName: "",
      lastName: (payer === null || payer === void 0 ? void 0 : (_payer$name2 = payer.name) === null || _payer$name2 === void 0 ? void 0 : _payer$name2.surname) || "",
      addresses: [{
        type: "delivery",
        firstName: (payer === null || payer === void 0 ? void 0 : (_payer$name3 = payer.name) === null || _payer$name3 === void 0 ? void 0 : _payer$name3.given_name) || "",
        middleName: "",
        lastName: (payer === null || payer === void 0 ? void 0 : (_payer$name4 = payer.name) === null || _payer$name4 === void 0 ? void 0 : _payer$name4.surname) || "",
        street: address === null || address === void 0 ? void 0 : address.address_line_1,
        street2: "",
        postalCode: (address === null || address === void 0 ? void 0 : address.postal_code) || "",
        city: (address === null || address === void 0 ? void 0 : address.admin_area_2) || "",
        state: (address === null || address === void 0 ? void 0 : address.admin_area_1) || "",
        country: (address === null || address === void 0 ? void 0 : address.country_code) || "",
        phone: "",
        email: (payer === null || payer === void 0 ? void 0 : payer.email_address) || ""
      }]
    }
  };
}

module.exports = toCrystallizeOrderModel;

/***/ }),

/***/ "./src/services/payment-providers/stripe/confirm-order.js":
/*!****************************************************************!*\
  !*** ./src/services/payment-providers/stripe/confirm-order.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = async function confirmOrder({
  paymentIntentId,
  checkoutModel,
  context
}) {
  var _checkoutModel$custom, _checkoutModel$custom2, _checkoutModel$custom3;

  const crystallize = __webpack_require__(/*! ../../crystallize */ "./src/services/crystallize/index.js");

  const basketService = __webpack_require__(/*! ../../basket-service */ "./src/services/basket-service/index.js");

  const toCrystallizeOrderModel = __webpack_require__(/*! ./to-crystallize-order-model */ "./src/services/payment-providers/stripe/to-crystallize-order-model.js");

  const {
    basketModel
  } = checkoutModel;
  const {
    user
  } = context;
  const basket = await basketService.get({
    basketModel,
    context
  }); // Prepare a valid model for Crystallize order intake

  const crystallizeOrderModel = await toCrystallizeOrderModel({
    basket,
    checkoutModel,
    paymentIntentId,
    customerIdentifier: (user === null || user === void 0 ? void 0 : user.email) || (checkoutModel === null || checkoutModel === void 0 ? void 0 : (_checkoutModel$custom = checkoutModel.customer) === null || _checkoutModel$custom === void 0 ? void 0 : (_checkoutModel$custom2 = _checkoutModel$custom.addresses) === null || _checkoutModel$custom2 === void 0 ? void 0 : (_checkoutModel$custom3 = _checkoutModel$custom2[0]) === null || _checkoutModel$custom3 === void 0 ? void 0 : _checkoutModel$custom3.email) || ""
  });
  /**
   * Record the order in Crystallize
   * Manage the order lifecycle by using the fulfilment pipelines:
   * https://crystallize.com/learn/user-guides/orders-and-fulfilment
   */

  const order = await crystallize.orders.create(crystallizeOrderModel);
  return {
    success: true,
    orderId: order.id
  };
};

/***/ }),

/***/ "./src/services/payment-providers/stripe/create-payment-intent.js":
/*!************************************************************************!*\
  !*** ./src/services/payment-providers/stripe/create-payment-intent.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = async function createPaymentIntent({
  checkoutModel,
  confirm = false,
  paymentMethodId,
  context
}) {
  const basketService = __webpack_require__(/*! ../../basket-service */ "./src/services/basket-service/index.js");

  const {
    getClient
  } = __webpack_require__(/*! ./utils */ "./src/services/payment-providers/stripe/utils.js");

  const {
    basketModel
  } = checkoutModel;
  const basket = await basketService.get({
    basketModel,
    context
  });
  const paymentIntent = await getClient().paymentIntents.create({
    amount: basket.total.gross * 100,
    currency: basket.total.currency,
    confirm,
    payment_method: paymentMethodId
  });
  return paymentIntent;
};

/***/ }),

/***/ "./src/services/payment-providers/stripe/index.js":
/*!********************************************************!*\
  !*** ./src/services/payment-providers/stripe/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const createPaymentIntent = __webpack_require__(/*! ./create-payment-intent */ "./src/services/payment-providers/stripe/create-payment-intent.js");

const confirmOrder = __webpack_require__(/*! ./confirm-order */ "./src/services/payment-providers/stripe/confirm-order.js");

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
module.exports = {
  enabled: Boolean(STRIPE_SECRET_KEY && STRIPE_PUBLISHABLE_KEY),
  // The required frontend config
  frontendConfig: {
    publishableKey: STRIPE_PUBLISHABLE_KEY
  },
  createPaymentIntent,
  confirmOrder
};

/***/ }),

/***/ "./src/services/payment-providers/stripe/to-crystallize-order-model.js":
/*!*****************************************************************************!*\
  !*** ./src/services/payment-providers/stripe/to-crystallize-order-model.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = async function stripeToCrystallizeOrderModel({
  basket,
  checkoutModel,
  paymentIntentId,
  customerIdentifier
}) {
  const {
    getClient
  } = __webpack_require__(/*! ./utils */ "./src/services/payment-providers/stripe/utils.js");

  const paymentIntent = await getClient().paymentIntents.retrieve(paymentIntentId);
  const {
    data
  } = paymentIntent.charges;
  const charge = data[0];
  const customerName = charge.billing_details.name.split(" ");
  let email = charge.receipt_email;

  if (!email && checkoutModel.customer && checkoutModel.customer.addresses) {
    const addressWithEmail = checkoutModel.customer.addresses.find(a => !!a.email);

    if (addressWithEmail) {
      email = addressWithEmail.email;
    }
  }

  const meta = [];

  if (paymentIntent.merchant_data) {
    meta.push({
      key: "stripeMerchantData",
      value: JSON.stringify(paymentIntent.merchant_data)
    });
  }

  return {
    cart: basket.cart,
    total: basket.total,
    meta,
    customer: {
      identifier: customerIdentifier,
      firstName: customerName[0],
      middleName: customerName.slice(1, customerName.length - 1).join(),
      lastName: customerName[customerName.length - 1],
      birthDate: Date,
      addresses: [{
        type: "billing",
        firstName: customerName[0],
        middleName: customerName.slice(1, customerName.length - 1).join(),
        lastName: customerName[customerName.length - 1],
        street: charge.billing_details.address.line1,
        street2: charge.billing_details.address.line2,
        postalCode: charge.billing_details.address.postal_code,
        city: charge.billing_details.address.city,
        state: charge.billing_details.address.state,
        country: charge.billing_details.address.country,
        phone: charge.billing_details.phone,
        email
      }, {
        type: "delivery",
        firstName: customerName[0],
        middleName: customerName.slice(1, customerName.length - 1).join(),
        lastName: customerName[customerName.length - 1],
        street: charge.billing_details.address.line1,
        street2: charge.billing_details.address.line2,
        postalCode: charge.billing_details.address.postal_code,
        city: charge.billing_details.address.city,
        state: charge.billing_details.address.state,
        country: charge.billing_details.address.country,
        phone: charge.billing_details.phone,
        email
      }]
    },
    payment: [{
      provider: "stripe",
      stripe: {
        stripe: charge.id,
        customerId: charge.customer,
        orderId: charge.payment_intent,
        paymentMethod: charge.payment_method_details.type,
        paymentMethodId: charge.payment_method,
        paymentIntentId: charge.payment_intent,
        subscriptionId: charge.subscription,
        metadata: ""
      }
    }]
  };
};

/***/ }),

/***/ "./src/services/payment-providers/stripe/utils.js":
/*!********************************************************!*\
  !*** ./src/services/payment-providers/stripe/utils.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const invariant = __webpack_require__(/*! invariant */ "invariant");

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
let client;
module.exports = {
  getClient: () => {
    invariant(STRIPE_SECRET_KEY, "process.env.STRIPE_SECRET_KEY is not defined");

    if (!client) {
      const stripeSdk = __webpack_require__(/*! stripe */ "stripe");

      client = stripeSdk(STRIPE_SECRET_KEY);
    }

    return client;
  }
};

/***/ }),

/***/ "./src/services/payment-providers/vipps/fallback.js":
/*!**********************************************************!*\
  !*** ./src/services/payment-providers/vipps/fallback.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = async function vippsFallback({
  crystallizeOrderId,
  onSuccessURL,
  onErrorURL
}) {
  const crystallize = __webpack_require__(/*! ../../crystallize */ "./src/services/crystallize/index.js");

  const {
    getClient
  } = __webpack_require__(/*! ./utils */ "./src/services/payment-providers/vipps/utils.js");

  let redirectTo = "";
  const vippsClient = await getClient(); // Retrieve the Vipps order to get transaction details

  const order = await vippsClient.getOrderDetails({
    orderId: crystallizeOrderId
  });
  const [lastTransactionLogEntry] = order.transactionLogHistory.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
  /**
   * If the transaction logs last entry has status
   * RESERVE, then the amount has been successfully
   * reserved on the user account, and we can show
   * the confirmation page
   */

  if (lastTransactionLogEntry.operation === "RESERVE" && lastTransactionLogEntry.operationSuccess) {
    redirectTo = onSuccessURL;
    /**
     * At this point we have user details from Vipps, which
     * makes it a good time to update the Crystallize order
     */

    const {
      userDetails: {
        userId,
        firstName,
        lastName,
        email,
        mobileNumber: phone
      } = {},
      shippingDetails: {
        address: {
          addressLine1: street,
          addressLine2: street2,
          postCode: postalCode,
          city,
          country
        } = {}
      } = {}
    } = order;
    await crystallize.orders.update(crystallizeOrderId, {
      payment: [{
        provider: "custom",
        custom: {
          properties: [{
            property: "PaymentProvider",
            value: "Vipps"
          }, {
            property: "Vipps orderId",
            value: crystallizeOrderId
          }, {
            property: "Vipps userId",
            value: userId
          }]
        }
      }],
      customer: {
        identifier: email,
        firstName,
        lastName,
        addresses: [{
          type: "delivery",
          email,
          firstName,
          lastName,
          phone,
          street,
          street2,
          postalCode,
          city,
          country
        }]
      }
    });
  } else {
    redirectTo = onErrorURL;
    console.log(JSON.stringify(lastTransactionLogEntry, null, 2));
  }

  return {
    redirectTo
  };
};

/***/ }),

/***/ "./src/services/payment-providers/vipps/index.js":
/*!*******************************************************!*\
  !*** ./src/services/payment-providers/vipps/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Vipps (https://vipps.no)
 *
 * Getting started:
 * https://crystallize.com/learn/open-source/payment-gateways/vipps
 */
const VIPPS_CLIENT_ID = process.env.VIPPS_CLIENT_ID;
const VIPPS_CLIENT_SECRET = process.env.VIPPS_CLIENT_SECRET;
const VIPPS_MERCHANT_SERIAL = process.env.VIPPS_MERCHANT_SERIAL;
const VIPPS_SUB_KEY = process.env.VIPPS_SUB_KEY;

const initiatePayment = __webpack_require__(/*! ./initiate-payment */ "./src/services/payment-providers/vipps/initiate-payment.js");

const fallback = __webpack_require__(/*! ./fallback */ "./src/services/payment-providers/vipps/fallback.js");

const orderUpdate = __webpack_require__(/*! ./order-update */ "./src/services/payment-providers/vipps/order-update.js");

const userConsentRemoval = __webpack_require__(/*! ./user-consent-removal */ "./src/services/payment-providers/vipps/user-consent-removal.js");

module.exports = {
  enabled: Boolean(VIPPS_CLIENT_ID && VIPPS_CLIENT_SECRET && VIPPS_MERCHANT_SERIAL && VIPPS_SUB_KEY),
  frontendConfig: {},
  initiatePayment,
  fallback,
  orderUpdate,
  userConsentRemoval
};

/***/ }),

/***/ "./src/services/payment-providers/vipps/initiate-payment.js":
/*!******************************************************************!*\
  !*** ./src/services/payment-providers/vipps/initiate-payment.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const invariant = __webpack_require__(/*! invariant */ "invariant");

const VIPPS_MERCHANT_SERIAL = process.env.VIPPS_MERCHANT_SERIAL;

module.exports = async function initiateVippsPayment({
  checkoutModel,
  context
}) {
  const basketService = __webpack_require__(/*! ../../basket-service */ "./src/services/basket-service/index.js");

  const crystallize = __webpack_require__(/*! ../../crystallize */ "./src/services/crystallize/index.js");

  const {
    getClient
  } = __webpack_require__(/*! ./utils */ "./src/services/payment-providers/vipps/utils.js");

  invariant(VIPPS_MERCHANT_SERIAL, "process.env.VIPPS_MERCHANT_SERIAL is undefined");
  const {
    basketModel,
    customer,
    confirmationURL,
    checkoutURL
  } = checkoutModel;
  const {
    serviceCallbackHost,
    user
  } = context; // Add the identifier from the current logged in user

  const customerWithCurrentLoggedInUser = _objectSpread({}, customer);

  if (user) {
    customerWithCurrentLoggedInUser.identifier = user.email;
  }

  const basket = await basketService.get({
    basketModel,
    context
  });
  const {
    total
  } = basket;
  /* Use a Crystallize order and the fulfilment pipelines to
   * manage the lifecycle of the order
   */

  const crystallizeOrder = await crystallize.orders.create(_objectSpread(_objectSpread({}, basket), {}, {
    customer: customerWithCurrentLoggedInUser
  }));
  const crystallizeOrderId = crystallizeOrder.id;
  /**
   * The Vipps "fallback" url, is where the user will be redirected
   * to after completing the Vipps checkout.
   */

  const fallBackURL = new URL(`${serviceCallbackHost}/webhooks/payment-providers/vipps/fallback/${crystallizeOrderId}`);
  fallBackURL.searchParams.append("confirmation", encodeURIComponent(confirmationURL.replace("{crystallizeOrderId}", crystallizeOrderId)));
  fallBackURL.searchParams.append("checkout", encodeURIComponent(checkoutURL));
  const vippsClient = await getClient();
  const vippsResponse = await vippsClient.initiatePayment({
    order: {
      merchantInfo: {
        merchantSerialNumber: VIPPS_MERCHANT_SERIAL,
        fallBack: fallBackURL.toString(),
        callbackPrefix: `${serviceCallbackHost}/webhooks/payment-providers/vipps/order-update`,
        shippingDetailsPrefix: `${serviceCallbackHost}/webhooks/payment-providers/vipps/shipping`,
        consentRemovalPrefix: `${serviceCallbackHost}/webhooks/payment-providers/vipps/constent-removal`,
        paymentType: "eComm Express Payment",
        isApp: false,
        staticShippingDetails: [// Provide a default shipping method
        {
          isDefault: "Y",
          priority: 0,
          shippingCost: 0,
          shippingMethod: "Posten Servicepakke",
          shippingMethodId: "posten-servicepakke"
        }]
      },
      customerInfo: {},
      transaction: {
        orderId: crystallizeOrderId,
        amount: parseInt(total.gross * 100, 10),
        transactionText: "Crystallize test transaction"
      }
    }
  });
  return {
    success: true,
    checkoutLink: vippsResponse.url,
    crystallizeOrderId
  };
};

/***/ }),

/***/ "./src/services/payment-providers/vipps/order-update.js":
/*!**************************************************************!*\
  !*** ./src/services/payment-providers/vipps/order-update.js ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = async function vippsOrderUpdate({
  crystallizeOrderId
}) {
  console.log("VIPPS order update");
  console.log({
    crystallizeOrderId
  }); // const { getClient } = require("./utils");
  // const vippsClient = await getClient();
  // Retrieve the Vipps order transaction details
  // const order = await vippsClient.getOrderDetails({
  //   orderId: crystallizeOrderId,
  // });
};

/***/ }),

/***/ "./src/services/payment-providers/vipps/user-consent-removal.js":
/*!**********************************************************************!*\
  !*** ./src/services/payment-providers/vipps/user-consent-removal.js ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = async function vippsUserConsentRemoval({
  vippsUserId
}) {
  // const { getClient } = require("./utils");
  // const vippsClient = await getClient();
  console.log("VIPPS user consent removal");
  console.log({
    vippsUserId
  });
};

/***/ }),

/***/ "./src/services/payment-providers/vipps/utils.js":
/*!*******************************************************!*\
  !*** ./src/services/payment-providers/vipps/utils.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const invariant = __webpack_require__(/*! invariant */ "invariant");

const VIPPS_CLIENT_ID = process.env.VIPPS_CLIENT_ID;
const VIPPS_CLIENT_SECRET = process.env.VIPPS_CLIENT_SECRET;
const VIPPS_SUB_KEY = process.env.VIPPS_SUB_KEY;
let client;
module.exports = {
  getClient: () => {
    invariant(VIPPS_CLIENT_ID, "process.env.VIPPS_CLIENT_ID is not defined");
    invariant(VIPPS_CLIENT_SECRET, "process.env.VIPPS_CLIENT_SECRET is not defined");
    invariant(VIPPS_SUB_KEY, "process.env.VIPPS_SUB_KEY is not defined");

    if (!client) {
      const VippsClient = __webpack_require__(/*! @crystallize/node-vipps */ "@crystallize/node-vipps");

      client = new VippsClient({
        testDrive: true,
        id: VIPPS_CLIENT_ID,
        secret: VIPPS_CLIENT_SECRET,
        subscriptionId: VIPPS_SUB_KEY
      });
    }

    return client;
  }
};

/***/ }),

/***/ "./src/services/user-service/index.js":
/*!********************************************!*\
  !*** ./src/services/user-service/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const invariant = __webpack_require__(/*! invariant */ "invariant");

const crystallize = __webpack_require__(/*! ../crystallize */ "./src/services/crystallize/index.js");
/**
 * Todo: link to good JWT intro
 */


const JWT_SECRET = process.env.JWT_SECRET; // Cookie config for user JWTs

const COOKIE_USER_TOKEN_NAME = "user-token";
const COOKIE_USER_TOKEN_MAX_AGE = 60 * 60 * 24;
const COOKIE_REFRESH_TOKEN_NAME = "user-token-refresh";
const COOKIE_REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

async function getUser({
  context
}) {
  const userInContext = context.user;
  const user = {
    isLoggedIn: Boolean(userInContext && "email" in userInContext),
    email: userInContext && userInContext.email,
    logoutLink: `${context.publicHost}/user/logout`
  };

  if (user && user.isLoggedIn) {
    const crystallizeCustomer = await crystallize.customers.get({
      identifier: user.email
    });

    if (crystallizeCustomer) {
      Object.assign(user, crystallizeCustomer);
    }
  }

  return user;
}

module.exports = {
  COOKIE_USER_TOKEN_NAME,
  COOKIE_REFRESH_TOKEN_NAME,
  COOKIE_USER_TOKEN_MAX_AGE,
  COOKIE_REFRESH_TOKEN_MAX_AGE,

  authenticate(token) {
    invariant(JWT_SECRET, "process.env.JWT_SECRET is not defined");

    if (!token) {
      return null;
    }

    try {
      const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

      const decoded = jwt.verify(token, JWT_SECRET);

      if (!decoded) {
        return null;
      }

      return {
        email: decoded.email
      };
    } catch (e) {
      return null;
    }
  },

  async sendMagicLink({
    email,
    redirectURLAfterLogin,
    context
  }) {
    invariant(JWT_SECRET, "process.env.JWT_SECRET is not defined");
    const {
      publicHost
    } = context;
    const crystallizeCustomer = await crystallize.customers.get({
      identifier: email
    });
    /**
     * If there is no customer record in Crystallize, we will
     * create one.
     *
     * You can choose NOT to create a customer at this point,
     * and prohibit logins for none customers
     */

    if (!crystallizeCustomer) {
      // return {
      //   success: false,
      //   error: "CUSTOMER_NOT_FOUND",
      // };
      const emailParts = email.split("@");
      await crystallize.customers.create({
        identifier: email,
        firstName: emailParts[0],
        lastName: emailParts[1]
      });
    }
    /**
     * This is the page responsible of receiving the magic
     * link token, and then calling the validateMagicLinkToken
     * function from userService.
     */


    const loginLink = new URL(`${publicHost}/user/login-magic-link`);
    /**
     * Add the JWT to the callback url
     * When the link is visited, we can validate the token
     * again in the validateMagicLinkToken method
     */

    const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

    loginLink.searchParams.append("token", jwt.sign({
      email,
      redirectURLAfterLogin
    }, JWT_SECRET, {
      expiresIn: "1h"
    }));

    const emailService = __webpack_require__(/*! ../email-service */ "./src/services/email-service/index.js");

    const {
      success
    } = await emailService.sendUserMagicLink({
      loginLink: loginLink.toString(),
      email
    });
    return {
      success
    };
  },

  validateMagicLinkToken(token) {
    invariant(JWT_SECRET, "process.env.JWT_SECRET is not defined");
    /**
     * Here we would want to fetch an entry matching the provided token from our
     * datastore. This boilerplate does not have a datastore connected to it yet
     * so we will just assume the token is for a real user and sign a login token
     * accordingly.
     */

    try {
      const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

      const decoded = jwt.verify(token, JWT_SECRET);
      const {
        email,
        redirectURLAfterLogin
      } = decoded;
      const signedLoginToken = jwt.sign({
        email
      }, JWT_SECRET, {
        expiresIn: COOKIE_USER_TOKEN_MAX_AGE
      });
      const signedLoginRefreshToken = jwt.sign({
        email
      }, JWT_SECRET, {
        expiresIn: COOKIE_REFRESH_TOKEN_MAX_AGE
      });
      return {
        success: true,
        signedLoginToken,
        COOKIE_USER_TOKEN_MAX_AGE,
        signedLoginRefreshToken,
        redirectURLAfterLogin,
        COOKIE_REFRESH_TOKEN_MAX_AGE
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error
      };
    }
  },

  validateRefreshToken({
    refreshToken,
    email
  }) {
    if (!refreshToken || !email) {
      return false;
    }

    try {
      const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

      const decoded = jwt.verify(refreshToken, JWT_SECRET);

      if (decoded.email === email) {
        return jwt.sign({
          email
        }, JWT_SECRET, {
          expiresIn: COOKIE_USER_TOKEN_MAX_AGE
        });
      }
    } catch (e) {
      console.log(e);
    }

    return false;
  },

  getUser,

  async update({
    context,
    input
  }) {
    const {
      user
    } = context;

    if (!user) {
      throw new Error("No user found in context");
    }

    await crystallize.customers.update({
      identifier: user.email,
      customer: input
    });
    return getUser({
      context
    });
  }

};

/***/ }),

/***/ "./src/services/voucher-service/crystallize-vouchers-example.js":
/*!**********************************************************************!*\
  !*** ./src/services/voucher-service/crystallize-vouchers-example.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  callCatalogueApi
} = __webpack_require__(/*! ../crystallize/utils */ "./src/services/crystallize/utils.js");
/**
 * Example of how to use Crystallize to store and
 * manage vouchers.
 *
 * Expected catalogue structure:
 * _vouchers
 *  - voucher_1
 *  - voucher_2
 *  - ...
 *  - voucher_n
 *
 * Each voucher is based on the following shape
 * code (singleLine)
 * discount (choiceComponent)
 *  - percent (numeric)
 *  - amount (numeric)
 */


module.exports = async function getCrystallizeVouchers() {
  const vouchersFromCrystallize = await callCatalogueApi({
    query: `
      {
        catalogue(language: "en", path: "/vouchers") {
          children {
            name
            code: component(id: "code") {
              content {
                ... on SingleLineContent {
                  text
                }
              }
            }
            discount: component(id: "discount") {
              content {
                ... on ComponentChoiceContent {
                  selectedComponent {
                    id
                    content {
                      ... on NumericContent {
                        number
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  });

  if (!vouchersFromCrystallize.data || !vouchersFromCrystallize.data.catalogue) {
    return [];
  }

  return vouchersFromCrystallize.data.catalogue.children.map(voucherFromCrystallize => {
    const discountComponent = voucherFromCrystallize.discount.content.selectedComponent;
    let discountAmount = null;
    let discountPercent = null;

    if (discountComponent.id === "percent") {
      discountPercent = discountComponent.content.number;
    } else {
      discountAmount = discountComponent.content.number;
    }

    return {
      code: voucherFromCrystallize.code.content.text,
      discountAmount,
      discountPercent,
      onlyForAuthorisedUser: false
    };
  });
};

/***/ }),

/***/ "./src/services/voucher-service/index.js":
/*!***********************************************!*\
  !*** ./src/services/voucher-service/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const getCrystallizeVouchers = __webpack_require__(/*! ./crystallize-vouchers-example */ "./src/services/voucher-service/crystallize-vouchers-example.js");
/**
 * Example of a voucher register
 * You can customise this to call an external service
 * or keep static vouchers like this
 */


const voucherRegister = [{
  code: "ok-deal",
  discountAmount: 2,
  discountPercent: null,
  onlyForAuthorisedUser: false
}, {
  code: "fair-deal",
  discountAmount: null,
  discountPercent: 5,
  onlyForAuthorisedUser: false
}, {
  code: "awesome-deal-logged-in",
  discountAmount: null,
  discountPercent: 10,
  onlyForAuthorisedUser: true
}, {
  code: "good-deal-logged-in",
  discountAmount: 100,
  discountPercent: null,
  onlyForAuthorisedUser: true
}];
module.exports = {
  async get({
    code,
    context
  }) {
    const {
      user
    } = context;
    const isAnonymousUser = !user || !user.isLoggedIn;
    const allCrystallizeVouchers = await getCrystallizeVouchers();
    const allVouchers = [...voucherRegister, ...allCrystallizeVouchers]; // As default, not all the vouchers work for anonymous users.
    // As you'll see in the configuration above, some need the user to be logged in

    if (isAnonymousUser) {
      const voucher = allVouchers.filter(v => !v.onlyForAuthorisedUser).find(v => v.code === code);
      return {
        isValid: Boolean(voucher),
        voucher
      };
    } // Search all vouchers for authenticated users


    let voucher = allVouchers.find(v => v.code === code);
    return {
      isValid: Boolean(voucher),
      voucher
    };
  }

};

/***/ }),

/***/ "@crystallize/node-klarna":
/*!*******************************************!*\
  !*** external "@crystallize/node-klarna" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@crystallize/node-klarna");

/***/ }),

/***/ "@crystallize/node-vipps":
/*!******************************************!*\
  !*** external "@crystallize/node-vipps" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@crystallize/node-vipps");

/***/ }),

/***/ "@mollie/api-client":
/*!*************************************!*\
  !*** external "@mollie/api-client" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mollie/api-client");

/***/ }),

/***/ "@paypal/checkout-server-sdk":
/*!**********************************************!*\
  !*** external "@paypal/checkout-server-sdk" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@paypal/checkout-server-sdk");

/***/ }),

/***/ "@sendgrid/mail":
/*!*********************************!*\
  !*** external "@sendgrid/mail" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@sendgrid/mail");

/***/ }),

/***/ "apollo-server-micro":
/*!**************************************!*\
  !*** external "apollo-server-micro" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("apollo-server-micro");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("graphql-tag");

/***/ }),

/***/ "invariant":
/*!****************************!*\
  !*** external "invariant" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("invariant");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mjml":
/*!***********************!*\
  !*** external "mjml" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("mjml");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node-fetch");

/***/ }),

/***/ "stripe":
/*!*************************!*\
  !*** external "stripe" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stripe");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/graphql.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7OztBQ3JCQSxNQUFNdUMsR0FBRyxHQUFHbkYsbUJBQU8sQ0FBQyxnQ0FBRCxDQUFuQjs7QUFFQUUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCZ0YsR0FBSTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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RyxDQUFDLEdBQUdILGVBQUosRUFBcUIsR0FBR0Usc0JBQXhCLENBQXBCLENBUDJCLENBUzNCO0FBQ0E7O0FBQ0EsUUFBSUQsZUFBSixFQUFxQjtBQUNuQixZQUFNbGMsT0FBTyxHQUFHb2MsV0FBVyxDQUN4QjFYLE1BRGEsQ0FDTDZCLENBQUQsSUFBTyxDQUFDQSxDQUFDLENBQUN5VixxQkFESixFQUViNVYsSUFGYSxDQUVQRyxDQUFELElBQU9BLENBQUMsQ0FBQ1QsSUFBRixLQUFXQSxJQUZWLENBQWhCO0FBSUEsYUFBTztBQUNMQyxRQUFBQSxPQUFPLEVBQUVyQyxPQUFPLENBQUMxRCxPQUFELENBRFg7QUFFTEEsUUFBQUE7QUFGSyxPQUFQO0FBSUQsS0FwQjBCLENBc0IzQjs7O0FBQ0EsUUFBSUEsT0FBTyxHQUFHb2MsV0FBVyxDQUFDaFcsSUFBWixDQUFrQkcsQ0FBRCxJQUFPQSxDQUFDLENBQUNULElBQUYsS0FBV0EsSUFBbkMsQ0FBZDtBQUVBLFdBQU87QUFDTEMsTUFBQUEsT0FBTyxFQUFFckMsT0FBTyxDQUFDMUQsT0FBRCxDQURYO0FBRUxBLE1BQUFBO0FBRkssS0FBUDtBQUlEOztBQTlCYyxDQUFqQjs7Ozs7Ozs7Ozs7QUNsQ0E7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL2xpYi9jb3JzLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vcGFnZXMvYXBpL2dyYXBocWwuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvZ3JhcGhxbC1zZXJ2ZXIvY3JlYXRlLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvZ3JhcGhxbC1zZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvZ3JhcGhxbC1zZXJ2ZXIvcmVzb2x2ZXJzLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL2dyYXBocWwtc2VydmVyL3R5cGUtZGVmcy5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9saWIvY3VycmVuY3kuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvbGliL2dldC1ob3N0LmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL2Jhc2tldC1zZXJ2aWNlL2NhbGN1bGF0ZS12b3VjaGVyLWRpc2NvdW50LWFtb3VudC5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9iYXNrZXQtc2VydmljZS9nZXQtcHJvZHVjdHMtZnJvbS1jcnlzdGFsbGl6ZS5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9iYXNrZXQtc2VydmljZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9jcnlzdGFsbGl6ZS9jdXN0b21lcnMvY3JlYXRlLWN1c3RvbWVyLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL2NyeXN0YWxsaXplL2N1c3RvbWVycy9nZXQtY3VzdG9tZXIuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvY3J5c3RhbGxpemUvY3VzdG9tZXJzL2luZGV4LmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL2NyeXN0YWxsaXplL2N1c3RvbWVycy91cGRhdGUtY3VzdG9tZXIuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvY3J5c3RhbGxpemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvY3J5c3RhbGxpemUvb3JkZXJzL2NyZWF0ZS1vcmRlci5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9jcnlzdGFsbGl6ZS9vcmRlcnMvZ2V0LW9yZGVyLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL2NyeXN0YWxsaXplL29yZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9jcnlzdGFsbGl6ZS9vcmRlcnMvdXBkYXRlLW9yZGVyLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL2NyeXN0YWxsaXplL29yZGVycy93YWl0LWZvci1vcmRlci10by1iZS1wZXJzaXN0YXRlZC5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9jcnlzdGFsbGl6ZS91dGlscy5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9lbWFpbC1zZXJ2aWNlL2luZGV4LmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL2VtYWlsLXNlcnZpY2Uvb3JkZXItY29uZmlybWF0aW9uLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL2VtYWlsLXNlcnZpY2UvdXNlci1tYWdpYy1saW5rLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL2VtYWlsLXNlcnZpY2UvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMva2xhcm5hL2NhcHR1cmUuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMva2xhcm5hL2luZGV4LmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL3BheW1lbnQtcHJvdmlkZXJzL2tsYXJuYS9wdXNoLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL3BheW1lbnQtcHJvdmlkZXJzL2tsYXJuYS9yZW5kZXItY2hlY2tvdXQuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMva2xhcm5hL3RvLWtsYXJuYS1vcmRlci1tb2RlbC5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9wYXltZW50LXByb3ZpZGVycy9rbGFybmEvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMvbW9sbGllL2NyZWF0ZS1wYXltZW50LmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL3BheW1lbnQtcHJvdmlkZXJzL21vbGxpZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9wYXltZW50LXByb3ZpZGVycy9tb2xsaWUvdG8tY3J5c3RhbGxpemUtb3JkZXItbW9kZWwuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMvbW9sbGllL3V0aWxzLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL3BheW1lbnQtcHJvdmlkZXJzL3BheXBhbC9jb25maXJtLXBheW1lbnQuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMvcGF5cGFsL2NyZWF0ZS1wYXltZW50LmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL3BheW1lbnQtcHJvdmlkZXJzL3BheXBhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9wYXltZW50LXByb3ZpZGVycy9wYXlwYWwvaW5pdC1jbGllbnQuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMvcGF5cGFsL3RvLWNyeXN0YWxsaXplLW9yZGVyLW1vZGVsLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL3BheW1lbnQtcHJvdmlkZXJzL3N0cmlwZS9jb25maXJtLW9yZGVyLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL3BheW1lbnQtcHJvdmlkZXJzL3N0cmlwZS9jcmVhdGUtcGF5bWVudC1pbnRlbnQuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMvc3RyaXBlL2luZGV4LmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL3BheW1lbnQtcHJvdmlkZXJzL3N0cmlwZS90by1jcnlzdGFsbGl6ZS1vcmRlci1tb2RlbC5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9wYXltZW50LXByb3ZpZGVycy9zdHJpcGUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMvdmlwcHMvZmFsbGJhY2suanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMvdmlwcHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMvdmlwcHMvaW5pdGlhdGUtcGF5bWVudC5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS8uL3NyYy9zZXJ2aWNlcy9wYXltZW50LXByb3ZpZGVycy92aXBwcy9vcmRlci11cGRhdGUuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMvdmlwcHMvdXNlci1jb25zZW50LXJlbW92YWwuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMvdmlwcHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvLi9zcmMvc2VydmljZXMvdXNlci1zZXJ2aWNlL2luZGV4LmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL3ZvdWNoZXItc2VydmljZS9jcnlzdGFsbGl6ZS12b3VjaGVycy1leGFtcGxlLmpzIiwid2VicGFjazovL3NlcnZpY2UtYXBpLy4vc3JjL3NlcnZpY2VzL3ZvdWNoZXItc2VydmljZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS9leHRlcm5hbCBcIkBjcnlzdGFsbGl6ZS9ub2RlLWtsYXJuYVwiIiwid2VicGFjazovL3NlcnZpY2UtYXBpL2V4dGVybmFsIFwiQGNyeXN0YWxsaXplL25vZGUtdmlwcHNcIiIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS9leHRlcm5hbCBcIkBtb2xsaWUvYXBpLWNsaWVudFwiIiwid2VicGFjazovL3NlcnZpY2UtYXBpL2V4dGVybmFsIFwiQHBheXBhbC9jaGVja291dC1zZXJ2ZXItc2RrXCIiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvZXh0ZXJuYWwgXCJAc2VuZGdyaWQvbWFpbFwiIiwid2VicGFjazovL3NlcnZpY2UtYXBpL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1taWNyb1wiIiwid2VicGFjazovL3NlcnZpY2UtYXBpL2V4dGVybmFsIFwiZ3JhcGhxbC10YWdcIiIsIndlYnBhY2s6Ly9zZXJ2aWNlLWFwaS9leHRlcm5hbCBcImludmFyaWFudFwiIiwid2VicGFjazovL3NlcnZpY2UtYXBpL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvZXh0ZXJuYWwgXCJtam1sXCIiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvZXh0ZXJuYWwgXCJub2RlLWZldGNoXCIiLCJ3ZWJwYWNrOi8vc2VydmljZS1hcGkvZXh0ZXJuYWwgXCJzdHJpcGVcIiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhbGxvd0NvcnMgPSAoZm4pID0+IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICByZXMuc2V0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIiwgdHJ1ZSk7XG4gIHJlcy5zZXRIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgcmVxLmhlYWRlcnMub3JpZ2luIHx8ICcqJyk7XG4gIHJlcy5zZXRIZWFkZXIoXG4gICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsXG4gICAgXCJHRVQsT1BUSU9OUyxQQVRDSCxERUxFVEUsUE9TVCxQVVRcIlxuICApO1xuICByZXMuc2V0SGVhZGVyKFxuICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLFxuICAgIFwiWC1DU1JGLVRva2VuLCBYLVJlcXVlc3RlZC1XaXRoLCBBY2NlcHQsIEFjY2VwdC1WZXJzaW9uLCBDb250ZW50LUxlbmd0aCwgQ29udGVudC1NRDUsIENvbnRlbnQtVHlwZSwgRGF0ZSwgWC1BcGktVmVyc2lvblwiXG4gICk7XG4gIGlmIChyZXEubWV0aG9kID09PSBcIk9QVElPTlNcIikge1xuICAgIHJlcy5zdGF0dXMoMjAwKS5lbmQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIGF3YWl0IGZuKHJlcSwgcmVzKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFsbG93Q29ycztcbiIsImltcG9ydCB7IEFwb2xsb1NlcnZlciB9IGZyb20gXCJhcG9sbG8tc2VydmVyLW1pY3JvXCI7XG5cbmltcG9ydCBjb3JzIGZyb20gXCIuLi8uLi9saWIvY29yc1wiO1xuXG5pbXBvcnQgY3JlYXRlR3JhcGhRTFNlcnZlckNvbmZpZyBmcm9tIFwiLi4vLi4vc3JjL2dyYXBocWwtc2VydmVyXCI7XG5pbXBvcnQgdXNlclNlcnZpY2UgZnJvbSBcIi4uLy4uL3NyYy9zZXJ2aWNlcy91c2VyLXNlcnZpY2VcIjtcblxuY29uc3QgYXBvbGxvU2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcihcbiAgY3JlYXRlR3JhcGhRTFNlcnZlckNvbmZpZyh7XG4gICAgYXBpUGF0aFByZWZpeDogXCIvYXBpXCIsXG4gICAgbm9ybWFsaXNlUmVxdWVzdCh7IHJlcSB9KSB7XG4gICAgICByZXR1cm4gcmVxO1xuICAgIH0sXG4gICAgcmVmcmVzaFVzZXJUb2tlbih7IHJlcyB9LCBuZXdVc2VyVG9rZW4pIHtcbiAgICAgIHJlcy5zZXRIZWFkZXIoXG4gICAgICAgIFwiU2V0LUNvb2tpZVwiLFxuICAgICAgICBgJHt1c2VyU2VydmljZS5DT09LSUVfVVNFUl9UT0tFTl9OQU1FfT0ke25ld1VzZXJUb2tlbn07IEh0dHBPbmx5OyBNYXgtQWdlPSR7dXNlclNlcnZpY2UuQ09PS0lFX1VTRVJfVE9LRU5fTUFYX0FHRX07IFBhdGg9L2BcbiAgICAgICk7XG4gICAgfSxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGFwaToge1xuICAgIGJvZHlQYXJzZXI6IGZhbHNlLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ycyhhcG9sbG9TZXJ2ZXIuY3JlYXRlSGFuZGxlcih7IHBhdGg6IFwiL2FwaS9ncmFwaHFsXCIgfSkpO1xuIiwiY29uc3QgdXNlclNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvdXNlci1zZXJ2aWNlXCIpO1xuY29uc3QgZ2V0SG9zdCA9IHJlcXVpcmUoXCIuLi9saWIvZ2V0LWhvc3RcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlQ29udGV4dCh7XG4gIGFwaVBhdGhQcmVmaXgsXG4gIG5vcm1hbGlzZVJlcXVlc3QsXG4gIHJlZnJlc2hVc2VyVG9rZW4sXG59KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjb250ZXh0KGFyZ3MpIHtcbiAgICBjb25zdCB7IGNvb2tpZXMsIGhlYWRlcnMgfSA9IG5vcm1hbGlzZVJlcXVlc3QoYXJncyk7XG5cbiAgICBjb25zdCB1c2VyID0gdXNlclNlcnZpY2UuYXV0aGVudGljYXRlKFxuICAgICAgY29va2llc1t1c2VyU2VydmljZS5DT09LSUVfVVNFUl9UT0tFTl9OQU1FXVxuICAgICk7XG5cbiAgICAvLyBSZWZyZXNoIHRoZSB1c2VyIHRva2VuIChpZiBhdmFpbGFibGUpXG4gICAgaWYgKHVzZXIgJiYgcmVmcmVzaFVzZXJUb2tlbikge1xuICAgICAgY29uc3QgbmV3VXNlclRva2VuID0gdXNlclNlcnZpY2UudmFsaWRhdGVSZWZyZXNoVG9rZW4oe1xuICAgICAgICByZWZyZXNoVG9rZW46IGNvb2tpZXNbdXNlclNlcnZpY2UuQ09PS0lFX1JFRlJFU0hfVE9LRU5fTkFNRV0sXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgfSk7XG4gICAgICBpZiAobmV3VXNlclRva2VuKSB7XG4gICAgICAgIHJlZnJlc2hVc2VyVG9rZW4oYXJncywgbmV3VXNlclRva2VuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgdGhlIFVSTCBmb3Igd2ViaG9vayBjYWxsYmFja3MgKGV4OiBodHRwczovL3NlcnZpY2UtYXBpLmV4YW1wbGUuY29tL2FwaSlcbiAgICBjb25zdCBwdWJsaWNIb3N0ID0gZ2V0SG9zdCh7IGhlYWRlcnMgfSkgKyBhcGlQYXRoUHJlZml4O1xuXG4gICAgLyoqXG4gICAgICogc2VydmljZUNhbGxiYWNrSG9zdCBpcyB1c2VkIGZvciB0aGlyZCBwYXJ0eSBzZXJ2aWNlcyBjYWxsYmFja3NcbiAgICAgKiBJdCB3aWxsIGJlIHVzZWQgaW4gZS5nLiBwYXltZW50IHByb3ZpZGVyIHNlcnZpY2VzIGNhbGxiYWNrc1xuICAgICAqIHdoZW4gYXN5bmMgb3BlcmF0aW9ucyBhcmUgZmluaXNoZWRcbiAgICAgKlxuICAgICAqIEV4YW1wbGUgZm9yIGxvY2FsIGRldmVsb3BtZW50OlxuICAgICAqICAtIHB1YmxpY0hvc3Q6IGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9hcGlcbiAgICAgKiAgLSBzZXJ2aWNlQ2FsbGJhY2tIb3N0OiBodHRwczovL2FiY2RlZmdoMTIzNDUubmdyb2suaW8vYXBpXG4gICAgICpcbiAgICAgKiBFeGFtcGxlIGZvciBwcm9kIGRldmVsb3BtZW50OlxuICAgICAqICAtIHB1YmxpY0hvc3Q6IGh0dHBzOi8vbXktc2VydmljZS1hcGkuc2hvcC5jb20vYXBpXG4gICAgICogIC0gc2VydmljZUNhbGxiYWNrSG9zdDogaHR0cHM6Ly9teS1zZXJ2aWNlLWFwaS5zaG9wLmNvbS9hcGlcbiAgICAgKi9cbiAgICBsZXQgc2VydmljZUNhbGxiYWNrSG9zdCA9IHByb2Nlc3MuZW52LlNFUlZJQ0VfQ0FMTEJBQ0tfSE9TVDtcbiAgICBpZiAoc2VydmljZUNhbGxiYWNrSG9zdCkge1xuICAgICAgaWYgKCFzZXJ2aWNlQ2FsbGJhY2tIb3N0LmVuZHNXaXRoKGFwaVBhdGhQcmVmaXgpKSB7XG4gICAgICAgIHNlcnZpY2VDYWxsYmFja0hvc3QgKz0gYXBpUGF0aFByZWZpeDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2VydmljZUNhbGxiYWNrSG9zdCA9IHB1YmxpY0hvc3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXIsXG4gICAgICBwdWJsaWNIb3N0LFxuICAgICAgc2VydmljZUNhbGxiYWNrSG9zdCxcbiAgICB9O1xuICB9O1xufTtcbiIsImNvbnN0IGNyZWF0ZUNvbnRleHQgPSByZXF1aXJlKFwiLi9jcmVhdGUtY29udGV4dFwiKTtcbmNvbnN0IHJlc29sdmVycyA9IHJlcXVpcmUoXCIuL3Jlc29sdmVyc1wiKTtcbmNvbnN0IHR5cGVEZWZzID0gcmVxdWlyZShcIi4vdHlwZS1kZWZzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUdyYXBocWxTZXJ2ZXJDb25maWcoe1xuICBhcGlQYXRoUHJlZml4ID0gXCJcIixcbiAgcmVmcmVzaFVzZXJUb2tlbixcbiAgbm9ybWFsaXNlUmVxdWVzdCxcbn0pIHtcbiAgY29uc3QgY29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe1xuICAgIGFwaVBhdGhQcmVmaXgsXG4gICAgcmVmcmVzaFVzZXJUb2tlbixcbiAgICBub3JtYWxpc2VSZXF1ZXN0LFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIGNvbnRleHQsXG4gICAgcmVzb2x2ZXJzLFxuICAgIHR5cGVEZWZzLFxuICAgIGludHJvc3BlY3Rpb246IHRydWUsXG4gICAgcGxheWdyb3VuZDoge1xuICAgICAgZW5kcG9pbnQ6IGNvbnRleHQucHVibGljSG9zdCxcbiAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgIFwicmVxdWVzdC5jcmVkZW50aWFsc1wiOiBcImluY2x1ZGVcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBEaXNhYmxlIHN1YnNjcmlwdGlvbnMgKG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkIHdpdGggQXBvbGxvR2F0ZXdheSlcbiAgICBzdWJzY3JpcHRpb25zOiBmYWxzZSxcbiAgfTtcbn07XG4iLCJjb25zdCBjcnlzdGFsbGl6ZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9jcnlzdGFsbGl6ZVwiKTtcblxuY29uc3QgYmFza2V0U2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9iYXNrZXQtc2VydmljZVwiKTtcbmNvbnN0IHVzZXJTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL3VzZXItc2VydmljZVwiKTtcbmNvbnN0IHZvdWNoZXJTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL3ZvdWNoZXItc2VydmljZVwiKTtcblxuY29uc3Qgc3RyaXBlU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9wYXltZW50LXByb3ZpZGVycy9zdHJpcGVcIik7XG5jb25zdCBtb2xsaWVTZXJ2aWNlID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL3BheW1lbnQtcHJvdmlkZXJzL21vbGxpZVwiKTtcbmNvbnN0IHZpcHBzU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9wYXltZW50LXByb3ZpZGVycy92aXBwc1wiKTtcbmNvbnN0IGtsYXJuYVNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvcGF5bWVudC1wcm92aWRlcnMva2xhcm5hXCIpO1xuY29uc3QgcGF5cGFsU2VydmljZSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9wYXltZW50LXByb3ZpZGVycy9wYXlwYWxcIik7XG5cbmZ1bmN0aW9uIHBheW1lbnRQcm92aWRlclJlc29sdmVyKHNlcnZpY2UpIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZW5hYmxlZDogc2VydmljZS5lbmFibGVkLFxuICAgICAgY29uZmlnOiBzZXJ2aWNlLmZyb250ZW5kQ29uZmlnLFxuICAgIH07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBRdWVyeToge1xuICAgIG15Q3VzdG9tQnVzaW5lc3NUaGluZzogKCkgPT4gKHtcbiAgICAgIHdoYXRJc1RoaXM6XG4gICAgICAgIFwiVGhpcyBpcyBhbiBleGFtcGxlIG9mIGEgY3VzdG9tIHF1ZXJ5IGZvciBHcmFwaFFMIGRlbW9uc3RyYXRpb24gcHVycHVzZXMuIENoZWNrIG91dCB0aGUgTXlDdXN0b21CdXNpbm5lc3NRdWVyaWVzIHJlc29sdmVycyBmb3IgaG93IHRvIHJlc29sdmUgYWRkaXRpb25hbCBmaWVsZHMgYXBhcnQgZnJvbSB0aGUgJ3doYXRJc1RoaXMnIGZpZWxkXCIsXG4gICAgfSksXG4gICAgYmFza2V0OiAocGFyZW50LCBhcmdzLCBjb250ZXh0KSA9PiBiYXNrZXRTZXJ2aWNlLmdldCh7IC4uLmFyZ3MsIGNvbnRleHQgfSksXG4gICAgdXNlcjogKHBhcmVudCwgYXJncywgY29udGV4dCkgPT4gdXNlclNlcnZpY2UuZ2V0VXNlcih7IGNvbnRleHQgfSksXG4gICAgb3JkZXJzOiAoKSA9PiAoe30pLFxuICAgIHBheW1lbnRQcm92aWRlcnM6ICgpID0+ICh7fSksXG4gICAgdm91Y2hlcjogKHBhcmVudCwgYXJncywgY29udGV4dCkgPT5cbiAgICAgIHZvdWNoZXJTZXJ2aWNlLmdldCh7IC4uLmFyZ3MsIGNvbnRleHQgfSksXG4gIH0sXG4gIE15Q3VzdG9tQnVzaW5uZXNzUXVlcmllczoge1xuICAgIGR5bmFtaWNSYW5kb21JbnQoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImR5bmFtaWNSYW5kb21JbnQgY2FsbGVkXCIpO1xuICAgICAgcmV0dXJuIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgIH0sXG4gIH0sXG4gIFBheW1lbnRQcm92aWRlcnNRdWVyaWVzOiB7XG4gICAgc3RyaXBlOiBwYXltZW50UHJvdmlkZXJSZXNvbHZlcihzdHJpcGVTZXJ2aWNlKSxcbiAgICBrbGFybmE6IHBheW1lbnRQcm92aWRlclJlc29sdmVyKGtsYXJuYVNlcnZpY2UpLFxuICAgIHZpcHBzOiBwYXltZW50UHJvdmlkZXJSZXNvbHZlcih2aXBwc1NlcnZpY2UpLFxuICAgIG1vbGxpZTogcGF5bWVudFByb3ZpZGVyUmVzb2x2ZXIobW9sbGllU2VydmljZSksXG4gICAgcGF5cGFsOiBwYXltZW50UHJvdmlkZXJSZXNvbHZlcihwYXlwYWxTZXJ2aWNlKSxcbiAgfSxcbiAgT3JkZXJRdWVyaWVzOiB7XG4gICAgZ2V0OiAocGFyZW50LCBhcmdzKSA9PiBjcnlzdGFsbGl6ZS5vcmRlcnMuZ2V0KGFyZ3MuaWQpLFxuICB9LFxuICBNdXRhdGlvbjoge1xuICAgIHVzZXI6ICgpID0+ICh7fSksXG4gICAgcGF5bWVudFByb3ZpZGVyczogKCkgPT4gKHt9KSxcbiAgfSxcbiAgVXNlck11dGF0aW9uczoge1xuICAgIHNlbmRNYWdpY0xpbms6IChwYXJlbnQsIGFyZ3MsIGNvbnRleHQpID0+XG4gICAgICB1c2VyU2VydmljZS5zZW5kTWFnaWNMaW5rKHsgLi4uYXJncywgY29udGV4dCB9KSxcbiAgICB1cGRhdGU6IChwYXJlbnQsIGFyZ3MsIGNvbnRleHQpID0+IHVzZXJTZXJ2aWNlLnVwZGF0ZSh7IC4uLmFyZ3MsIGNvbnRleHQgfSksXG4gIH0sXG4gIFBheW1lbnRQcm92aWRlcnNNdXRhdGlvbnM6IHtcbiAgICBzdHJpcGU6ICgpID0+ICh7fSksXG4gICAga2xhcm5hOiAoKSA9PiAoe30pLFxuICAgIG1vbGxpZTogKCkgPT4gKHt9KSxcbiAgICB2aXBwczogKCkgPT4gKHt9KSxcbiAgICBwYXlwYWw6ICgpID0+ICh7fSksXG4gIH0sXG4gIFN0cmlwZU11dGF0aW9uczoge1xuICAgIGNyZWF0ZVBheW1lbnRJbnRlbnQ6IChwYXJlbnQsIGFyZ3MsIGNvbnRleHQpID0+XG4gICAgICBzdHJpcGVTZXJ2aWNlLmNyZWF0ZVBheW1lbnRJbnRlbnQoeyAuLi5hcmdzLCBjb250ZXh0IH0pLFxuICAgIGNvbmZpcm1PcmRlcjogKHBhcmVudCwgYXJncywgY29udGV4dCkgPT5cbiAgICAgIHN0cmlwZVNlcnZpY2UuY29uZmlybU9yZGVyKHsgLi4uYXJncywgY29udGV4dCB9KSxcbiAgfSxcbiAgS2xhcm5hTXV0YXRpb25zOiB7XG4gICAgcmVuZGVyQ2hlY2tvdXQ6IChwYXJlbnQsIGFyZ3MsIGNvbnRleHQpID0+XG4gICAgICBrbGFybmFTZXJ2aWNlLnJlbmRlckNoZWNrb3V0KHtcbiAgICAgICAgLi4uYXJncyxcbiAgICAgICAgY29udGV4dCxcbiAgICAgIH0pLFxuICB9LFxuICBNb2xsaWVNdXRhdGlvbnM6IHtcbiAgICBjcmVhdGVQYXltZW50OiAocGFyZW50LCBhcmdzLCBjb250ZXh0KSA9PlxuICAgICAgbW9sbGllU2VydmljZS5jcmVhdGVQYXltZW50KHtcbiAgICAgICAgLi4uYXJncyxcbiAgICAgICAgY29udGV4dCxcbiAgICAgIH0pLFxuICB9LFxuICBWaXBwc011dGF0aW9uczoge1xuICAgIGluaXRpYXRlUGF5bWVudDogKHBhcmVudCwgYXJncywgY29udGV4dCkgPT5cbiAgICAgIHZpcHBzU2VydmljZS5pbml0aWF0ZVBheW1lbnQoe1xuICAgICAgICAuLi5hcmdzLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgfSksXG4gIH0sXG4gIFBheXBhbE11dGF0aW9uOiB7XG4gICAgY3JlYXRlUGF5bWVudDogKHBhcmVudCwgYXJncywgY29udGV4dCkgPT5cbiAgICAgIHBheXBhbFNlcnZpY2UuY3JlYXRlUGF5cGFsUGF5bWVudCh7XG4gICAgICAgIC4uLmFyZ3MsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIHBhcmVudCxcbiAgICAgIH0pLFxuICAgIGNvbmZpcm1QYXltZW50OiAocGFyZW50LCBhcmdzLCBjb250ZXh0KSA9PlxuICAgICAgcGF5cGFsU2VydmljZS5jb25maXJtUGF5cGFsUGF5bWVudCh7XG4gICAgICAgIC4uLmFyZ3MsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIHBhcmVudCxcbiAgICAgIH0pLFxuICB9LFxufTtcbiIsImNvbnN0IGdxbCA9IHJlcXVpcmUoXCJncmFwaHFsLXRhZ1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBncWxgXG4gIHNjYWxhciBKU09OXG5cbiAgdHlwZSBRdWVyeSB7XG4gICAgbXlDdXN0b21CdXNpbmVzc1RoaW5nOiBNeUN1c3RvbUJ1c2lubmVzc1F1ZXJpZXMhXG4gICAgYmFza2V0KGJhc2tldE1vZGVsOiBCYXNrZXRNb2RlbElucHV0ISk6IEJhc2tldCFcbiAgICB1c2VyOiBVc2VyIVxuICAgIHBheW1lbnRQcm92aWRlcnM6IFBheW1lbnRQcm92aWRlcnNRdWVyaWVzIVxuICAgIG9yZGVyczogT3JkZXJRdWVyaWVzIVxuICAgIHZvdWNoZXIoY29kZTogU3RyaW5nISk6IFZvdWNoZXJSZXNwb25zZSFcbiAgfVxuXG4gIHR5cGUgVm91Y2hlclJlc3BvbnNlIHtcbiAgICB2b3VjaGVyOiBWb3VjaGVyXG4gICAgaXNWYWxpZDogQm9vbGVhbiFcbiAgfVxuXG4gIHR5cGUgTXlDdXN0b21CdXNpbm5lc3NRdWVyaWVzIHtcbiAgICB3aGF0SXNUaGlzOiBTdHJpbmchXG4gICAgZHluYW1pY1JhbmRvbUludDogSW50IVxuICB9XG5cbiAgdHlwZSBCYXNrZXQge1xuICAgIGNhcnQ6IFtDYXJ0SXRlbSFdIVxuICAgIHRvdGFsOiBQcmljZSFcbiAgICB2b3VjaGVyOiBWb3VjaGVyXG4gIH1cblxuICB0eXBlIENhcnRJdGVtIHtcbiAgICBza3U6IFN0cmluZyFcbiAgICBuYW1lOiBTdHJpbmdcbiAgICBwYXRoOiBTdHJpbmdcbiAgICBxdWFudGl0eTogSW50IVxuICAgIHZhdFR5cGU6IFZhdFR5cGVcbiAgICBzdG9jazogSW50XG4gICAgcHJpY2U6IFByaWNlXG4gICAgcHJpY2VWYXJpYW50czogW1ByaWNlVmFyaWFudCFdXG4gICAgYXR0cmlidXRlczogW0F0dHJpYnV0ZSFdXG4gICAgaW1hZ2VzOiBbSW1hZ2UhXVxuICB9XG5cbiAgdHlwZSBQcmljZVZhcmlhbnQge1xuICAgIHByaWNlOiBGbG9hdFxuICAgIGlkZW50aWZpZXI6IFN0cmluZyFcbiAgICBjdXJyZW5jeTogU3RyaW5nIVxuICB9XG5cbiAgdHlwZSBBdHRyaWJ1dGUge1xuICAgIGF0dHJpYnV0ZTogU3RyaW5nIVxuICAgIHZhbHVlOiBTdHJpbmdcbiAgfVxuXG4gIHR5cGUgSW1hZ2Uge1xuICAgIHVybDogU3RyaW5nIVxuICAgIHZhcmlhbnRzOiBbSW1hZ2VWYXJpYW50IV1cbiAgfVxuXG4gIHR5cGUgSW1hZ2VWYXJpYW50IHtcbiAgICB1cmw6IFN0cmluZyFcbiAgICB3aWR0aDogSW50XG4gICAgaGVpZ2h0OiBJbnRcbiAgfVxuXG4gIHR5cGUgUHJpY2Uge1xuICAgIGdyb3NzOiBGbG9hdCFcbiAgICBuZXQ6IEZsb2F0IVxuICAgIGN1cnJlbmN5OiBTdHJpbmdcbiAgICB0YXg6IFRheFxuICAgIHRheEFtb3VudDogRmxvYXRcbiAgICBkaXNjb3VudDogRmxvYXQhXG4gIH1cblxuICB0eXBlIFRheCB7XG4gICAgbmFtZTogU3RyaW5nXG4gICAgcGVyY2VudDogRmxvYXRcbiAgfVxuXG4gIHR5cGUgVmF0VHlwZSB7XG4gICAgbmFtZTogU3RyaW5nIVxuICAgIHBlcmNlbnQ6IEludCFcbiAgfVxuXG4gIHR5cGUgVXNlciB7XG4gICAgbG9nb3V0TGluazogU3RyaW5nIVxuICAgIGlzTG9nZ2VkSW46IEJvb2xlYW4hXG4gICAgZW1haWw6IFN0cmluZ1xuICAgIGZpcnN0TmFtZTogU3RyaW5nXG4gICAgbWlkZGxlTmFtZTogU3RyaW5nXG4gICAgbGFzdE5hbWU6IFN0cmluZ1xuICAgIG1ldGE6IFtLZXlWYWx1ZVBhaXIhXVxuICB9XG5cbiAgdHlwZSBQYXltZW50UHJvdmlkZXJzUXVlcmllcyB7XG4gICAgc3RyaXBlOiBQYXltZW50UHJvdmlkZXIhXG4gICAga2xhcm5hOiBQYXltZW50UHJvdmlkZXIhXG4gICAgdmlwcHM6IFBheW1lbnRQcm92aWRlciFcbiAgICBtb2xsaWU6IFBheW1lbnRQcm92aWRlciFcbiAgICBwYXlwYWw6IFBheW1lbnRQcm92aWRlciFcbiAgfVxuXG4gIHR5cGUgUGF5bWVudFByb3ZpZGVyIHtcbiAgICBlbmFibGVkOiBCb29sZWFuIVxuICAgIGNvbmZpZzogSlNPTlxuICB9XG5cbiAgdHlwZSBPcmRlclF1ZXJpZXMge1xuICAgIGdldChpZDogU3RyaW5nISk6IEpTT05cbiAgfVxuXG4gIHR5cGUgVm91Y2hlciB7XG4gICAgY29kZTogU3RyaW5nIVxuICAgIGRpc2NvdW50QW1vdW50OiBJbnRcbiAgICBkaXNjb3VudFBlcmNlbnQ6IEZsb2F0XG4gIH1cblxuICB0eXBlIE11dGF0aW9uIHtcbiAgICB1c2VyOiBVc2VyTXV0YXRpb25zXG4gICAgcGF5bWVudFByb3ZpZGVyczogUGF5bWVudFByb3ZpZGVyc011dGF0aW9ucyFcbiAgfVxuXG4gIGlucHV0IEJhc2tldE1vZGVsSW5wdXQge1xuICAgIGxvY2FsZTogTG9jYWxlSW5wdXQhXG4gICAgY2FydDogW1NpbXBsZUNhcnRJdGVtIV0hXG4gICAgdm91Y2hlckNvZGU6IFN0cmluZ1xuICAgIGNyeXN0YWxsaXplT3JkZXJJZDogU3RyaW5nXG4gICAga2xhcm5hT3JkZXJJZDogU3RyaW5nXG4gIH1cblxuICBpbnB1dCBMb2NhbGVJbnB1dCB7XG4gICAgbG9jYWxlOiBTdHJpbmchXG4gICAgZGlzcGxheU5hbWU6IFN0cmluZ1xuICAgIGFwcExhbmd1YWdlOiBTdHJpbmchXG4gICAgY3J5c3RhbGxpemVDYXRhbG9ndWVMYW5ndWFnZTogU3RyaW5nXG4gICAgY3J5c3RhbGxpemVQcmljZVZhcmlhbnQ6IFN0cmluZ1xuICB9XG5cbiAgaW5wdXQgU2ltcGxlQ2FydEl0ZW0ge1xuICAgIHNrdTogU3RyaW5nIVxuICAgIHBhdGg6IFN0cmluZyFcbiAgICBxdWFudGl0eTogSW50XG4gICAgcHJpY2VWYXJpYW50SWRlbnRpZmllcjogU3RyaW5nIVxuICB9XG5cbiAgdHlwZSBVc2VyTXV0YXRpb25zIHtcbiAgICBzZW5kTWFnaWNMaW5rKFxuICAgICAgZW1haWw6IFN0cmluZyFcbiAgICAgIHJlZGlyZWN0VVJMQWZ0ZXJMb2dpbjogU3RyaW5nIVxuICAgICk6IFNlbmRNYWdpY0xpbmtSZXNwb25zZSFcbiAgICB1cGRhdGUoaW5wdXQ6IFVzZXJVcGRhdGVJbnB1dCEpOiBVc2VyIVxuICB9XG5cbiAgaW5wdXQgVXNlclVwZGF0ZUlucHV0IHtcbiAgICBmaXJzdE5hbWU6IFN0cmluZ1xuICAgIG1pZGRsZU5hbWU6IFN0cmluZ1xuICAgIGxhc3ROYW1lOiBTdHJpbmdcbiAgICBtZXRhOiBbS2V5VmFsdWVQYWlySW5wdXQhXVxuICB9XG5cbiAgdHlwZSBTZW5kTWFnaWNMaW5rUmVzcG9uc2Uge1xuICAgIHN1Y2Nlc3M6IEJvb2xlYW4hXG4gICAgZXJyb3I6IFN0cmluZ1xuICB9XG5cbiAgaW5wdXQgQ2hlY2tvdXRNb2RlbElucHV0IHtcbiAgICBiYXNrZXRNb2RlbDogQmFza2V0TW9kZWxJbnB1dCFcbiAgICBjdXN0b21lcjogT3JkZXJDdXN0b21lcklucHV0XG4gICAgY29uZmlybWF0aW9uVVJMOiBTdHJpbmchXG4gICAgY2hlY2tvdXRVUkw6IFN0cmluZyFcbiAgICB0ZXJtc1VSTDogU3RyaW5nIVxuICB9XG5cbiAgaW5wdXQgT3JkZXJDdXN0b21lcklucHV0IHtcbiAgICBmaXJzdE5hbWU6IFN0cmluZ1xuICAgIGxhc3ROYW1lOiBTdHJpbmdcbiAgICBhZGRyZXNzZXM6IFtBZGRyZXNzSW5wdXQhXVxuICB9XG5cbiAgaW5wdXQgQWRkcmVzc0lucHV0IHtcbiAgICB0eXBlOiBTdHJpbmdcbiAgICBlbWFpbDogU3RyaW5nXG4gICAgZmlyc3ROYW1lOiBTdHJpbmdcbiAgICBtaWRkbGVOYW1lOiBTdHJpbmdcbiAgICBsYXN0TmFtZTogU3RyaW5nXG4gICAgc3RyZWV0OiBTdHJpbmdcbiAgICBzdHJlZXQyOiBTdHJpbmdcbiAgICBzdHJlZXROdW1iZXI6IFN0cmluZ1xuICAgIHBvc3RhbENvZGU6IFN0cmluZ1xuICAgIGNpdHk6IFN0cmluZ1xuICAgIHN0YXRlOiBTdHJpbmdcbiAgICBjb3VudHJ5OiBTdHJpbmdcbiAgICBwaG9uZTogU3RyaW5nXG4gIH1cblxuICB0eXBlIFBheW1lbnRQcm92aWRlcnNNdXRhdGlvbnMge1xuICAgIHN0cmlwZTogU3RyaXBlTXV0YXRpb25zIVxuICAgIGtsYXJuYTogS2xhcm5hTXV0YXRpb25zIVxuICAgIG1vbGxpZTogTW9sbGllTXV0YXRpb25zIVxuICAgIHZpcHBzOiBWaXBwc011dGF0aW9ucyFcbiAgICBwYXlwYWw6IFBheXBhbE11dGF0aW9uIVxuICB9XG5cbiAgdHlwZSBTdHJpcGVNdXRhdGlvbnMge1xuICAgIGNyZWF0ZVBheW1lbnRJbnRlbnQoXG4gICAgICBjaGVja291dE1vZGVsOiBDaGVja291dE1vZGVsSW5wdXQhXG4gICAgICBjb25maXJtOiBCb29sZWFuXG4gICAgICBwYXltZW50TWV0aG9kSWQ6IFN0cmluZ1xuICAgICk6IEpTT05cbiAgICBjb25maXJtT3JkZXIoXG4gICAgICBjaGVja291dE1vZGVsOiBDaGVja291dE1vZGVsSW5wdXQhXG4gICAgICBwYXltZW50SW50ZW50SWQ6IFN0cmluZyFcbiAgICApOiBTdHJpcGVDb25maXJtT3JkZXJSZXNwb25zZSFcbiAgfVxuXG4gIHR5cGUgU3RyaXBlQ29uZmlybU9yZGVyUmVzcG9uc2Uge1xuICAgIHN1Y2Nlc3M6IEJvb2xlYW4hXG4gICAgb3JkZXJJZDogU3RyaW5nXG4gIH1cblxuICB0eXBlIEtsYXJuYU11dGF0aW9ucyB7XG4gICAgcmVuZGVyQ2hlY2tvdXQoXG4gICAgICBjaGVja291dE1vZGVsOiBDaGVja291dE1vZGVsSW5wdXQhXG4gICAgKTogS2xhcm5hUmVuZGVyQ2hlY2tvdXRSZXBvbnNlIVxuICB9XG5cbiAgdHlwZSBLbGFybmFSZW5kZXJDaGVja291dFJlcG9uc2Uge1xuICAgIGh0bWw6IFN0cmluZyFcbiAgICBrbGFybmFPcmRlcklkOiBTdHJpbmchXG4gICAgY3J5c3RhbGxpemVPcmRlcklkOiBTdHJpbmchXG4gIH1cblxuICB0eXBlIE1vbGxpZU11dGF0aW9ucyB7XG4gICAgY3JlYXRlUGF5bWVudChcbiAgICAgIGNoZWNrb3V0TW9kZWw6IENoZWNrb3V0TW9kZWxJbnB1dCFcbiAgICApOiBNb2xsaWVDcmVhdGVQYXltZW50UmVzcG9uc2UhXG4gIH1cblxuICB0eXBlIE1vbGxpZUNyZWF0ZVBheW1lbnRSZXNwb25zZSB7XG4gICAgc3VjY2VzczogQm9vbGVhbiFcbiAgICBjaGVja291dExpbms6IFN0cmluZ1xuICAgIGNyeXN0YWxsaXplT3JkZXJJZDogU3RyaW5nIVxuICB9XG5cbiAgdHlwZSBWaXBwc011dGF0aW9ucyB7XG4gICAgaW5pdGlhdGVQYXltZW50KFxuICAgICAgY2hlY2tvdXRNb2RlbDogQ2hlY2tvdXRNb2RlbElucHV0IVxuICAgICk6IFZpcHBzSW5pdGlhdGVQYXltZW50UmVzcG9uc2UhXG4gIH1cblxuICB0eXBlIFZpcHBzSW5pdGlhdGVQYXltZW50UmVzcG9uc2Uge1xuICAgIHN1Y2Nlc3M6IEJvb2xlYW4hXG4gICAgY2hlY2tvdXRMaW5rOiBTdHJpbmdcbiAgICBjcnlzdGFsbGl6ZU9yZGVySWQ6IFN0cmluZyFcbiAgfVxuXG4gIHR5cGUgUGF5cGFsTXV0YXRpb24ge1xuICAgIGNyZWF0ZVBheW1lbnQoY2hlY2tvdXRNb2RlbDogQ2hlY2tvdXRNb2RlbElucHV0ISk6IFBheXBhbFBheW1lbnRSZXNwb25zZSFcbiAgICBjb25maXJtUGF5bWVudChcbiAgICAgIGNoZWNrb3V0TW9kZWw6IENoZWNrb3V0TW9kZWxJbnB1dCFcbiAgICAgIG9yZGVySWQ6IFN0cmluZ1xuICAgICk6IFBheXBhbFBheW1lbnRSZXNwb25zZSFcbiAgfVxuXG4gIHR5cGUgUGF5cGFsUGF5bWVudFJlc3BvbnNlIHtcbiAgICBzdWNjZXNzOiBCb29sZWFuIVxuICAgIG9yZGVySWQ6IFN0cmluZ1xuICB9XG5cbiAgdHlwZSBLZXlWYWx1ZVBhaXIge1xuICAgIGtleTogU3RyaW5nIVxuICAgIHZhbHVlOiBTdHJpbmdcbiAgfVxuXG4gIGlucHV0IEtleVZhbHVlUGFpcklucHV0IHtcbiAgICBrZXk6IFN0cmluZyFcbiAgICB2YWx1ZTogU3RyaW5nXG4gIH1cbmA7XG4iLCJmdW5jdGlvbiBmb3JtYXRDdXJyZW5jeSh7IGFtb3VudCwgY3VycmVuY3kgfSkge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwgeyBzdHlsZTogXCJjdXJyZW5jeVwiLCBjdXJyZW5jeSB9KS5mb3JtYXQoXG4gICAgYW1vdW50XG4gICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBmb3JtYXRDdXJyZW5jeSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldEhvc3QoeyBoZWFkZXJzIH0pIHtcbiAgLy8gSWYgYmVoaW5kIGEgcmV2ZXJzZSBwcm94eSBsaWtlIEFXUyBFbGFzdGljIEJlYW5zdGFsayBmb3IgaW5zdGFuY2VcbiAgY29uc3QgeyBcIngtZm9yd2FyZGVkLXByb3RvXCI6IHhwcm90b2NvbCwgXCJ4LWZvcndhcmRlZC1ob3N0XCI6IHhob3N0IH0gPSBoZWFkZXJzO1xuICBpZiAoeHByb3RvY29sICYmIHhob3N0KSB7XG4gICAgcmV0dXJuIGAke3hwcm90b2NvbH06Ly8ke3hob3N0fWA7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuSE9TVF9VUkwpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnYuSE9TVF9VUkw7XG4gIH1cblxuICBjb25zdCB7IEhvc3QsIGhvc3QgPSBIb3N0IH0gPSBoZWFkZXJzO1xuICBpZiAoaG9zdCAmJiBob3N0LnN0YXJ0c1dpdGgoXCJsb2NhbGhvc3RcIikpIHtcbiAgICByZXR1cm4gYGh0dHA6Ly8ke2hvc3R9YDtcbiAgfVxuXG4gIC8vIElmIGhvc3RlZCBvbiBWZXJjZWxcbiAgaWYgKHByb2Nlc3MuZW52LlZFUkNFTF9VUkwpIHtcbiAgICByZXR1cm4gYGh0dHBzOi8vJHtwcm9jZXNzLmVudi5WRVJDRUxfVVJMfWA7XG4gIH1cblxuICBpZiAoIWhvc3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZGV0ZXJtaW5lIGhvc3QgZm9yIHRoZSBjdXJyZW50IHJlcXVlc3QgY29udGV4dFwiKTtcbiAgfVxuXG4gIHJldHVybiBgaHR0cHM6Ly8ke2hvc3R9YDtcbn07XG4iLCJmdW5jdGlvbiB0cnVuY2F0ZURlY2ltYWxzT2ZOdW1iZXIob3JpZ2luYWxOdW1iZXIsIG51bWJlck9mRGVjaW1hbHMgPSAyKSB7XG4gIC8vIHRvRml4ZWQoKSBjb252ZXJ0cyBhIG51bWJlciBpbnRvIGEgc3RyaW5nIGJ5IHRydW5jYXRpbmcgaXRcbiAgLy8gd2l0aCB0aGUgbnVtYmVyIG9mIGRlY2ltYWxzIHBhc3NlZCBhcyBwYXJhbWV0ZXIuXG4gIGNvbnN0IGFtb3VudFRydW5jYXRlZCA9IG9yaWdpbmFsTnVtYmVyLnRvRml4ZWQobnVtYmVyT2ZEZWNpbWFscyk7XG4gIC8vIFdlIHVzZSBwYXJzZUZsb2F0KCkgdG8gcmV0dXJuIGEgdHJhbnNmb3JtIHRoZSBzdHJpbmcgaW50byBhIG51bWJlclxuICByZXR1cm4gcGFyc2VGbG9hdChhbW91bnRUcnVuY2F0ZWQpO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVWb3VjaGVyRGlzY291bnRBbW91bnQoeyB2b3VjaGVyLCBhbW91bnQgfSkge1xuICAvLyBXZSBhc3N1bWUgdGhhdCB0aGUgdm91Y2hlciBoYXMgdGhlIHJpZ2h0IGZvcm1hdC5cbiAgLy8gSXQgZWl0aGVyIGhhcyBgZGlzY291bnRQZXJjZW50YCBvciBgZGlzY291bnRBbW91bnRgXG4gIGNvbnN0IGlzRGlzY291bnRBbW91bnQgPSBCb29sZWFuKHZvdWNoZXIuZGlzY291bnRBbW91bnQpO1xuXG4gIGlmIChpc0Rpc2NvdW50QW1vdW50KSB7XG4gICAgcmV0dXJuIHZvdWNoZXIuZGlzY291bnRBbW91bnQ7XG4gIH1cblxuICBjb25zdCBhbW91bnRUb0Rpc2NvdW50ID0gKGFtb3VudCAqIHZvdWNoZXIuZGlzY291bnRQZXJjZW50KSAvIDEwMDtcblxuICByZXR1cm4gdHJ1bmNhdGVEZWNpbWFsc09mTnVtYmVyKGFtb3VudFRvRGlzY291bnQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2FsY3VsYXRlVm91Y2hlckRpc2NvdW50QW1vdW50LFxufTtcbiIsIi8qKlxuICogR2V0cyBpbmZvcm1hdGlvbiBmb3IgcHJvZHVjdHMgd2l0aCBhIGdpdmVuIHBhdGguXG4gKiBHZXRzIGFsbCBvZiB0aGUgcHJvZHVjdHMgd2l0aCBhIHNpbmdsZSByZXF1ZXN0XG4gKiBieSBjb21wb3NpbmcgdGhlIHF1ZXJ5IGR5bmFtaWNhbGx5XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldFByb2R1Y3RzRnJvbUNyeXN0YWxsaXplKHsgcGF0aHMsIGxhbmd1YWdlIH0pIHtcbiAgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IHsgY2FsbENhdGFsb2d1ZUFwaSB9ID0gcmVxdWlyZShcIi4uL2NyeXN0YWxsaXplL3V0aWxzXCIpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbENhdGFsb2d1ZUFwaSh7XG4gICAgcXVlcnk6IGB7XG4gICAgICAke3BhdGhzLm1hcChcbiAgICAgICAgKHBhdGgsIGluZGV4KSA9PiBgXG4gICAgICAgIHByb2R1Y3Qke2luZGV4fTogY2F0YWxvZ3VlKHBhdGg6IFwiJHtwYXRofVwiLCBsYW5ndWFnZTogXCIke2xhbmd1YWdlfVwiKSB7XG4gICAgICAgICAgcGF0aFxuICAgICAgICAgIC4uLiBvbiBQcm9kdWN0IHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICB2YXRUeXBlIHtcbiAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICBwZXJjZW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXJpYW50cyB7XG4gICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgIHNrdVxuICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgIHN0b2NrXG4gICAgICAgICAgICAgIHByaWNlVmFyaWFudHMge1xuICAgICAgICAgICAgICAgIHByaWNlXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllclxuICAgICAgICAgICAgICAgIGN1cnJlbmN5XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYXR0cmlidXRlcyB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbWFnZXMge1xuICAgICAgICAgICAgICAgIHVybFxuICAgICAgICAgICAgICAgIHZhcmlhbnRzIHtcbiAgICAgICAgICAgICAgICAgIHVybFxuICAgICAgICAgICAgICAgICAgd2lkdGhcbiAgICAgICAgICAgICAgICAgIGhlaWdodFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYFxuICAgICAgKX1cbiAgICB9YCxcbiAgfSk7XG5cbiAgcmV0dXJuIHBhdGhzLm1hcCgoXywgaSkgPT4gcmVzcG9uc2UuZGF0YVtgcHJvZHVjdCR7aX1gXSkuZmlsdGVyKChwKSA9PiAhIXApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0UHJvZHVjdHNGcm9tQ3J5c3RhbGxpemUsXG59O1xuIiwiLy8gQ2FsY3VsYXRlIHRoZSB0b3RhbHNcbmZ1bmN0aW9uIGdldFRvdGFscyh7IGNhcnQsIHZhdFR5cGUgfSkge1xuICByZXR1cm4gY2FydC5yZWR1Y2UoXG4gICAgKGFjYywgY3VycikgPT4ge1xuICAgICAgY29uc3QgeyBxdWFudGl0eSwgcHJpY2UgfSA9IGN1cnI7XG4gICAgICBpZiAocHJpY2UpIHtcbiAgICAgICAgY29uc3QgcHJpY2VUb1VzZSA9IHByaWNlLmRpc2NvdW50ZWQgfHwgcHJpY2U7XG4gICAgICAgIGFjYy5ncm9zcyArPSBwcmljZVRvVXNlLmdyb3NzICogcXVhbnRpdHk7XG4gICAgICAgIGFjYy5uZXQgKz0gcHJpY2VUb1VzZS5uZXQgKiBxdWFudGl0eTtcbiAgICAgICAgYWNjLmN1cnJlbmN5ID0gcHJpY2UuY3VycmVuY3k7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSxcbiAgICB7IGdyb3NzOiAwLCBuZXQ6IDAsIHRheDogdmF0VHlwZSwgZGlzY291bnQ6IDAsIGN1cnJlbmN5OiBcIk4vQVwiIH1cbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFzeW5jIGdldCh7IGJhc2tldE1vZGVsLCBjb250ZXh0IH0pIHtcbiAgICBjb25zdCB7IGxvY2FsZSwgdm91Y2hlckNvZGUsIC4uLmJhc2tldEZyb21DbGllbnQgfSA9IGJhc2tldE1vZGVsO1xuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSBhbGwgdGhlIHZvdWNoZXIgY29kZXMgdG8gdmFsaWQgdm91Y2hlcnMgZm9yIHRoZSB1c2VyXG4gICAgICovXG4gICAgbGV0IHZvdWNoZXI7XG4gICAgaWYgKHZvdWNoZXJDb2RlKSB7XG4gICAgICBjb25zdCB2b3VjaGVyU2VydmljZSA9IHJlcXVpcmUoXCIuLi92b3VjaGVyLXNlcnZpY2VcIik7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHZvdWNoZXJTZXJ2aWNlLmdldCh7IGNvZGU6IHZvdWNoZXJDb2RlLCBjb250ZXh0IH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2UuaXNWYWxpZCkge1xuICAgICAgICB2b3VjaGVyID0gcmVzcG9uc2Uudm91Y2hlcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIHByb2R1Y3RzIGZyb20gQ3J5c3RhbGxpemUgZnJvbSB0aGVpciBwYXRoc1xuICAgICAqL1xuICAgIGNvbnN0IHtcbiAgICAgIGdldFByb2R1Y3RzRnJvbUNyeXN0YWxsaXplLFxuICAgIH0gPSByZXF1aXJlKFwiLi9nZXQtcHJvZHVjdHMtZnJvbS1jcnlzdGFsbGl6ZVwiKTtcbiAgICBjb25zdCBwcm9kdWN0RGF0YUZyb21DcnlzdGFsbGl6ZSA9IGF3YWl0IGdldFByb2R1Y3RzRnJvbUNyeXN0YWxsaXplKHtcbiAgICAgIHBhdGhzOiBiYXNrZXRGcm9tQ2xpZW50LmNhcnQubWFwKChwKSA9PiBwLnBhdGgpLFxuICAgICAgbGFuZ3VhZ2U6IGxvY2FsZS5jcnlzdGFsbGl6ZUNhdGFsb2d1ZUxhbmd1YWdlLFxuICAgIH0pO1xuXG4gICAgbGV0IHZhdFR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBDb21wb3NlIHRoZSBjb21wbGV0ZSBjYXJ0IGl0ZW1zIGVucmljaGVkIHdpdGhcbiAgICAgKiBkYXRhIGZyb20gQ3J5c3RhbGxpemVcbiAgICAgKi9cbiAgICBjb25zdCBjYXJ0ID0gYmFza2V0RnJvbUNsaWVudC5jYXJ0XG4gICAgICAubWFwKChpdGVtRnJvbUNsaWVudCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9kdWN0ID0gcHJvZHVjdERhdGFGcm9tQ3J5c3RhbGxpemUuZmluZCgocCkgPT5cbiAgICAgICAgICBwLnZhcmlhbnRzLnNvbWUoKHYpID0+IHYuc2t1ID09PSBpdGVtRnJvbUNsaWVudC5za3UpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXRUeXBlID0gcHJvZHVjdC52YXRUeXBlO1xuXG4gICAgICAgIGNvbnN0IHZhcmlhbnQgPSBwcm9kdWN0LnZhcmlhbnRzLmZpbmQoXG4gICAgICAgICAgKHYpID0+IHYuc2t1ID09PSBpdGVtRnJvbUNsaWVudC5za3VcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgeyBwcmljZSwgY3VycmVuY3kgfSA9XG4gICAgICAgICAgdmFyaWFudC5wcmljZVZhcmlhbnRzLmZpbmQoXG4gICAgICAgICAgICAocHYpID0+IHB2LmlkZW50aWZpZXIgPT09IGl0ZW1Gcm9tQ2xpZW50LnByaWNlVmFyaWFudElkZW50aWZpZXJcbiAgICAgICAgICApIHx8IHZhcmlhbnQucHJpY2VWYXJpYW50cy5maW5kKChwKSA9PiBwLmlkZW50aWZpZXIgPT09IFwiZGVmYXVsdFwiKTtcblxuICAgICAgICBjb25zdCBncm9zcyA9IHByaWNlO1xuICAgICAgICBjb25zdCBuZXQgPSAocHJpY2UgKiAxMDApIC8gKDEwMCArIHZhdFR5cGUucGVyY2VudCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuaWQsXG4gICAgICAgICAgcHJvZHVjdFZhcmlhbnRJZDogdmFyaWFudC5pZCxcbiAgICAgICAgICBwYXRoOiBwcm9kdWN0LnBhdGgsXG4gICAgICAgICAgcXVhbnRpdHk6IGl0ZW1Gcm9tQ2xpZW50LnF1YW50aXR5IHx8IDEsXG4gICAgICAgICAgdmF0VHlwZSxcbiAgICAgICAgICBwcmljZToge1xuICAgICAgICAgICAgZ3Jvc3MsXG4gICAgICAgICAgICBuZXQsXG4gICAgICAgICAgICB0YXg6IHZhdFR5cGUsXG4gICAgICAgICAgICBjdXJyZW5jeSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIC4uLnZhcmlhbnQsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigocCkgPT4gISFwKTtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgdG90YWxzXG4gICAgbGV0IHRvdGFsID0gZ2V0VG90YWxzKHsgY2FydCwgdmF0VHlwZSB9KTtcblxuICAgIC8vIEFkZCBhIHZvdWNoZXJcbiAgICBsZXQgY2FydFdpdGhWb3VjaGVyID0gY2FydDtcbiAgICBpZiAoY2FydC5sZW5ndGggPiAwICYmIHZvdWNoZXIpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2FsY3VsYXRlVm91Y2hlckRpc2NvdW50QW1vdW50LFxuICAgICAgfSA9IHJlcXVpcmUoXCIuL2NhbGN1bGF0ZS12b3VjaGVyLWRpc2NvdW50LWFtb3VudFwiKTtcbiAgICAgIGNvbnN0IGRpc2NvdW50QW1vdW50ID0gY2FsY3VsYXRlVm91Y2hlckRpc2NvdW50QW1vdW50KHtcbiAgICAgICAgdm91Y2hlcixcbiAgICAgICAgYW1vdW50OiB0b3RhbC5ncm9zcyxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZWR1Y2UgdGhlIHByaWNlIGZvciBlYWNoIGl0ZW1cbiAgICAgIGNhcnRXaXRoVm91Y2hlciA9IGNhcnQubWFwKChjYXJ0SXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0aW9uT2ZUb3RhbCA9XG4gICAgICAgICAgKGNhcnRJdGVtLnByaWNlLmdyb3NzICogY2FydEl0ZW0ucXVhbnRpdHkpIC8gdG90YWwuZ3Jvc3M7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVhY2ggY2FydCBpdGVtIGdldHMgYSBwb3J0aW9uIG9mIHRoZSB2b3VjaGVyIHRoYXRcbiAgICAgICAgICogaXMgcmVsYXRpdmUgdG8gdGhlaXIgb3duIHBvcnRpb24gb2YgdGhlIHRvdGFsIGRpc2NvdW50XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBwb3J0aW9uT2ZEaXNjb3VudCA9IGRpc2NvdW50QW1vdW50ICogcG9ydGlvbk9mVG90YWw7XG5cbiAgICAgICAgY29uc3QgZ3Jvc3MgPVxuICAgICAgICAgIGNhcnRJdGVtLnByaWNlLmdyb3NzIC0gcG9ydGlvbk9mRGlzY291bnQgLyBjYXJ0SXRlbS5xdWFudGl0eTtcbiAgICAgICAgY29uc3QgbmV0ID0gKGdyb3NzICogMTAwKSAvICgxMDAgKyBjYXJ0SXRlbS52YXRUeXBlLnBlcmNlbnQpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uY2FydEl0ZW0sXG4gICAgICAgICAgcHJpY2U6IHtcbiAgICAgICAgICAgIC4uLmNhcnRJdGVtLnByaWNlLFxuICAgICAgICAgICAgZ3Jvc3MsXG4gICAgICAgICAgICBuZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBBZGp1c3QgdG90YWxzXG4gICAgICB0b3RhbCA9IGdldFRvdGFscyh7IGNhcnQ6IGNhcnRXaXRoVm91Y2hlciwgdmF0VHlwZSB9KTtcbiAgICAgIHRvdGFsLmRpc2NvdW50ID0gZGlzY291bnRBbW91bnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZvdWNoZXIsXG4gICAgICBjYXJ0OiBjYXJ0V2l0aFZvdWNoZXIsXG4gICAgICB0b3RhbCxcbiAgICB9O1xuICB9LFxufTtcbiIsImNvbnN0IHsgY2FsbFBpbUFwaSwgZ2V0VGVuYW50SWQgfSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBjcmVhdGVDdXN0b21lcihjdXN0b21lcikge1xuICBjb25zdCB0ZW5hbnRJZCA9IGF3YWl0IGdldFRlbmFudElkKCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbFBpbUFwaSh7XG4gICAgdmFyaWFibGVzOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICB0ZW5hbnRJZCxcbiAgICAgICAgLi4uY3VzdG9tZXIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcXVlcnk6IGBcbiAgICAgIG11dGF0aW9uIGNyZWF0ZUN1c3RvbWVyKFxuICAgICAgICAkaW5wdXQ6IENyZWF0ZUN1c3RvbWVySW5wdXQhXG4gICAgICApIHtcbiAgICAgICAgY3VzdG9tZXIge1xuICAgICAgICAgIGNyZWF0ZShcbiAgICAgICAgICAgIGlucHV0OiAkaW5wdXRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgLFxuICB9KTtcblxuICByZXR1cm4gcmVzcG9uc2UuZGF0YS5jdXN0b21lci5jcmVhdGU7XG59O1xuIiwiY29uc3QgeyBjYWxsUGltQXBpLCBnZXRUZW5hbnRJZCB9ID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIGdldEN1c3RvbWVyKHsgaWRlbnRpZmllciwgZXh0ZXJuYWxSZWZlcmVuY2UgfSkge1xuICBjb25zdCB0ZW5hbnRJZCA9IGF3YWl0IGdldFRlbmFudElkKCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbFBpbUFwaSh7XG4gICAgdmFyaWFibGVzOiB7XG4gICAgICB0ZW5hbnRJZCxcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBleHRlcm5hbFJlZmVyZW5jZSxcbiAgICB9LFxuICAgIHF1ZXJ5OiBgXG4gICAgICBxdWVyeSBnZXRDdXN0b21lcihcbiAgICAgICAgJHRlbmFudElkOiBJRCFcbiAgICAgICAgJGlkZW50aWZpZXI6IFN0cmluZ1xuICAgICAgICAkZXh0ZXJuYWxSZWZlcmVuY2U6IEN1c3RvbWVyRXh0ZXJuYWxSZWZlcmVuY2VJbnB1dFxuICAgICAgKXtcbiAgICAgICAgY3VzdG9tZXIge1xuICAgICAgICAgIGdldChcbiAgICAgICAgICAgIHRlbmFudElkOiAkdGVuYW50SWRcbiAgICAgICAgICAgIGlkZW50aWZpZXI6ICRpZGVudGlmaWVyXG4gICAgICAgICAgICBleHRlcm5hbFJlZmVyZW5jZTogJGV4dGVybmFsUmVmZXJlbmNlXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZGVudGlmaWVyXG4gICAgICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgICAgIG1pZGRsZU5hbWVcbiAgICAgICAgICAgIGxhc3ROYW1lXG4gICAgICAgICAgICBtZXRhIHtcbiAgICAgICAgICAgICAga2V5XG4gICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuY3VzdG9tZXIuZ2V0O1xufTtcbiIsImNvbnN0IGNyZWF0ZSA9IHJlcXVpcmUoXCIuL2NyZWF0ZS1jdXN0b21lclwiKTtcbmNvbnN0IHVwZGF0ZSA9IHJlcXVpcmUoXCIuL3VwZGF0ZS1jdXN0b21lclwiKTtcbmNvbnN0IGdldCA9IHJlcXVpcmUoXCIuL2dldC1jdXN0b21lclwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZSxcbiAgdXBkYXRlLFxuICBnZXQsXG59O1xuIiwiY29uc3QgeyBjYWxsUGltQXBpLCBnZXRUZW5hbnRJZCB9ID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUN1c3RvbWVyKHsgaWRlbnRpZmllciwgLi4ucmVzdCB9KSB7XG4gIGNvbnN0IHRlbmFudElkID0gYXdhaXQgZ2V0VGVuYW50SWQoKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsUGltQXBpKHtcbiAgICB2YXJpYWJsZXM6IHtcbiAgICAgIHRlbmFudElkLFxuICAgICAgaWRlbnRpZmllcixcbiAgICAgIC4uLnJlc3QsXG4gICAgfSxcbiAgICBxdWVyeTogYFxuICAgICAgbXV0YXRpb24gdXBkYXRlQ3VzdG9tZXIoXG4gICAgICAgICR0ZW5hbnRJZDogSUQhXG4gICAgICAgICRpZGVudGlmaWVyOiBTdHJpbmchXG4gICAgICAgICRjdXN0b21lcjogVXBkYXRlQ3VzdG9tZXJJbnB1dCFcbiAgICAgICkge1xuICAgICAgICBjdXN0b21lciB7XG4gICAgICAgICAgdXBkYXRlKFxuICAgICAgICAgICAgdGVuYW50SWQ6ICR0ZW5hbnRJZFxuICAgICAgICAgICAgaWRlbnRpZmllcjogJGlkZW50aWZpZXJcbiAgICAgICAgICAgIGlucHV0OiAkY3VzdG9tZXJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgLFxuICB9KTtcblxuICByZXR1cm4gcmVzcG9uc2UuZGF0YS5jdXN0b21lci51cGRhdGU7XG59O1xuIiwiY29uc3Qgb3JkZXJzID0gcmVxdWlyZShcIi4vb3JkZXJzXCIpO1xuY29uc3QgY3VzdG9tZXJzID0gcmVxdWlyZShcIi4vY3VzdG9tZXJzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb3JkZXJzLFxuICBjdXN0b21lcnMsXG59O1xuIiwiY29uc3QgeyBjYWxsT3JkZXJzQXBpLCBub3JtYWxpc2VPcmRlck1vZGVsIH0gPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gY3JlYXRlT3JkZXIodmFyaWFibGVzKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbE9yZGVyc0FwaSh7XG4gICAgdmFyaWFibGVzOiBub3JtYWxpc2VPcmRlck1vZGVsKHZhcmlhYmxlcyksXG4gICAgcXVlcnk6IGBcbiAgICAgIG11dGF0aW9uIGNyZWF0ZU9yZGVyKFxuICAgICAgICAkY3VzdG9tZXI6IEN1c3RvbWVySW5wdXQhXG4gICAgICAgICRjYXJ0OiBbT3JkZXJJdGVtSW5wdXQhXSFcbiAgICAgICAgJHRvdGFsOiBQcmljZUlucHV0XG4gICAgICAgICRwYXltZW50OiBbUGF5bWVudElucHV0IV1cbiAgICAgICAgJGFkZGl0aW9uYWxJbmZvcm1hdGlvbjogU3RyaW5nXG4gICAgICAgICRtZXRhOiBbT3JkZXJNZXRhZGF0YUlucHV0IV1cbiAgICAgICkge1xuICAgICAgICBvcmRlcnMge1xuICAgICAgICAgIGNyZWF0ZShcbiAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgIGN1c3RvbWVyOiAkY3VzdG9tZXJcbiAgICAgICAgICAgICAgY2FydDogJGNhcnRcbiAgICAgICAgICAgICAgdG90YWw6ICR0b3RhbFxuICAgICAgICAgICAgICBwYXltZW50OiAkcGF5bWVudFxuICAgICAgICAgICAgICBhZGRpdGlvbmFsSW5mb3JtYXRpb246ICRhZGRpdGlvbmFsSW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgbWV0YTogJG1ldGFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3BvbnNlLmRhdGEub3JkZXJzLmNyZWF0ZTtcbn07XG4iLCJjb25zdCB7IGNhbGxPcmRlcnNBcGkgfSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBnZXRPcmRlcihpZCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxPcmRlcnNBcGkoe1xuICAgIHZhcmlhYmxlczoge1xuICAgICAgaWQsXG4gICAgfSxcbiAgICBxdWVyeTogYFxuICAgICAgcXVlcnkgZ2V0T3JkZXIoJGlkOiBJRCEpe1xuICAgICAgICBvcmRlcnMge1xuICAgICAgICAgIGdldChpZDogJGlkKSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgdG90YWwge1xuICAgICAgICAgICAgICBuZXRcbiAgICAgICAgICAgICAgZ3Jvc3NcbiAgICAgICAgICAgICAgY3VycmVuY3lcbiAgICAgICAgICAgICAgdGF4IHtcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgcGVyY2VudFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXRhIHtcbiAgICAgICAgICAgICAga2V5XG4gICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRpdGlvbmFsSW5mb3JtYXRpb25cbiAgICAgICAgICAgIHBheW1lbnQge1xuICAgICAgICAgICAgICAuLi4gb24gU3RyaXBlUGF5bWVudCB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXJcbiAgICAgICAgICAgICAgICBwYXltZW50TWV0aG9kXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLi4uIG9uIFBheXBhbFBheW1lbnQge1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyXG4gICAgICAgICAgICAgICAgb3JkZXJJZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC4uLiBvbiBDdXN0b21QYXltZW50IHtcbiAgICAgICAgICAgICAgICBwcm92aWRlclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXMge1xuICAgICAgICAgICAgICAgICAgcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC4uLiBvbiBLbGFybmFQYXltZW50IHtcbiAgICAgICAgICAgICAgICBwcm92aWRlclxuICAgICAgICAgICAgICAgIG9yZGVySWRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FydCB7XG4gICAgICAgICAgICAgIHNrdVxuICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgIHF1YW50aXR5XG4gICAgICAgICAgICAgIGltYWdlVXJsXG4gICAgICAgICAgICAgIHByaWNlIHtcbiAgICAgICAgICAgICAgICBuZXRcbiAgICAgICAgICAgICAgICBncm9zc1xuICAgICAgICAgICAgICAgIGN1cnJlbmN5XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbWV0YSB7XG4gICAgICAgICAgICAgICAga2V5XG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VzdG9tZXIge1xuICAgICAgICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgICAgICAgbGFzdE5hbWVcbiAgICAgICAgICAgICAgYWRkcmVzc2VzIHtcbiAgICAgICAgICAgICAgICB0eXBlXG4gICAgICAgICAgICAgICAgZW1haWxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIGAsXG4gIH0pO1xuXG4gIGNvbnN0IG9yZGVyID0gcmVzcG9uc2UuZGF0YS5vcmRlcnMuZ2V0O1xuXG4gIGlmICghb3JkZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZXRyaWV2ZSBvcmRlciBcIiR7aWR9XCJgKTtcbiAgfVxuXG4gIHJldHVybiBvcmRlcjtcbn07XG4iLCJjb25zdCBjcmVhdGUgPSByZXF1aXJlKFwiLi9jcmVhdGUtb3JkZXJcIik7XG5jb25zdCB1cGRhdGUgPSByZXF1aXJlKFwiLi91cGRhdGUtb3JkZXJcIik7XG5jb25zdCBnZXQgPSByZXF1aXJlKFwiLi9nZXQtb3JkZXJcIik7XG5jb25zdCB3YWl0Rm9yT3JkZXJUb0JlUGVyc2lzdGF0ZWQgPSByZXF1aXJlKFwiLi93YWl0LWZvci1vcmRlci10by1iZS1wZXJzaXN0YXRlZFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZSxcbiAgdXBkYXRlLFxuICBnZXQsXG4gIHdhaXRGb3JPcmRlclRvQmVQZXJzaXN0YXRlZCxcbn07XG4iLCJjb25zdCB7IGNhbGxQaW1BcGksIG5vcm1hbGlzZU9yZGVyTW9kZWwgfSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiB1cGRhdGVPcmRlcihpZCwgdmFyaWFibGVzKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbFBpbUFwaSh7XG4gICAgdmFyaWFibGVzOiB7XG4gICAgICBpZCxcbiAgICAgIGlucHV0OiBub3JtYWxpc2VPcmRlck1vZGVsKHZhcmlhYmxlcyksXG4gICAgfSxcbiAgICBxdWVyeTogYFxuICAgICAgbXV0YXRpb24gdXBkYXRlT3JkZXIoXG4gICAgICAgICRpZDogSUQhXG4gICAgICAgICRpbnB1dDogVXBkYXRlT3JkZXJJbnB1dCFcbiAgICAgICkge1xuICAgICAgICBvcmRlciB7XG4gICAgICAgICAgICB1cGRhdGUoXG4gICAgICAgICAgICBpZDogJGlkLFxuICAgICAgICAgICAgaW5wdXQ6ICRpbnB1dFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgYCxcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3BvbnNlLmRhdGEub3JkZXIudXBkYXRlO1xufTtcbiIsImNvbnN0IHsgY2FsbE9yZGVyc0FwaSB9ID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdhaXRGb3JPcmRlclRvQmVQZXJzaXN0YXRlZCh7IGlkIH0pIHtcbiAgbGV0IHJldHJpZXMgPSAwO1xuICBjb25zdCBtYXhSZXRyaWVzID0gMTA7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAoYXN5bmMgZnVuY3Rpb24gY2hlY2soKSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxPcmRlcnNBcGkoe1xuICAgICAgICBxdWVyeTogYFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9yZGVycyB7XG4gICAgICAgICAgICAgIGdldChpZDogXCIke2lkfVwiKSB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgYCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLm9yZGVycy5nZXQpIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0cmllcyArPSAxO1xuICAgICAgICBpZiAocmV0cmllcyA+IG1heFJldHJpZXMpIHtcbiAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICBgVGltZW91dCBvdXQgd2FpdGluZyBmb3IgQ3J5c3RhbGxpemUgb3JkZXIgXCIke2lkfVwiIHRvIGJlIHBlcnNpc3RlZGBcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2ssIDEwMDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfSk7XG59O1xuIiwiY29uc3QgaW52YXJpYW50ID0gcmVxdWlyZShcImludmFyaWFudFwiKTtcbmNvbnN0IGZldGNoID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7XG5cbmNvbnN0IENSWVNUQUxMSVpFX1RFTkFOVF9JREVOVElGSUVSID0gcHJvY2Vzcy5lbnYuQ1JZU1RBTExJWkVfVEVOQU5UX0lERU5USUZJRVI7XG5jb25zdCBDUllTVEFMTElaRV9BQ0NFU1NfVE9LRU5fSUQgPSBwcm9jZXNzLmVudi5DUllTVEFMTElaRV9BQ0NFU1NfVE9LRU5fSUQ7XG5jb25zdCBDUllTVEFMTElaRV9BQ0NFU1NfVE9LRU5fU0VDUkVUID1cbiAgcHJvY2Vzcy5lbnYuQ1JZU1RBTExJWkVfQUNDRVNTX1RPS0VOX1NFQ1JFVDtcblxuaW52YXJpYW50KFxuICBDUllTVEFMTElaRV9URU5BTlRfSURFTlRJRklFUixcbiAgXCJNaXNzaW5nIHByb2Nlc3MuZW52LkNSWVNUQUxMSVpFX1RFTkFOVF9JREVOVElGSUVSXCJcbik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUFwaUNhbGxlcih1cmkpIHtcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIGNhbGxBcGkoeyBxdWVyeSwgdmFyaWFibGVzLCBvcGVyYXRpb25OYW1lIH0pIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBDUllTVEFMTElaRV9BQ0NFU1NfVE9LRU5fSUQsXG4gICAgICBcIk1pc3NpbmcgcHJvY2Vzcy5lbnYuQ1JZU1RBTExJWkVfQUNDRVNTX1RPS0VOX0lEXCJcbiAgICApO1xuICAgIGludmFyaWFudChcbiAgICAgIENSWVNUQUxMSVpFX0FDQ0VTU19UT0tFTl9TRUNSRVQsXG4gICAgICBcIk1pc3NpbmcgcHJvY2Vzcy5lbnYuQ1JZU1RBTExJWkVfQUNDRVNTX1RPS0VOX1NFQ1JFVFwiXG4gICAgKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJpLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJYLUNyeXN0YWxsaXplLUFjY2Vzcy1Ub2tlbi1JZFwiOiBDUllTVEFMTElaRV9BQ0NFU1NfVE9LRU5fSUQsXG4gICAgICAgIFwiWC1DcnlzdGFsbGl6ZS1BY2Nlc3MtVG9rZW4tU2VjcmV0XCI6IENSWVNUQUxMSVpFX0FDQ0VTU19UT0tFTl9TRUNSRVQsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBvcGVyYXRpb25OYW1lLCBxdWVyeSwgdmFyaWFibGVzIH0pLFxuICAgIH0pO1xuXG4gICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIGlmIChqc29uLmVycm9ycykge1xuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoanNvbi5lcnJvcnMsIG51bGwsIDIpKTtcbiAgICB9XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5mdW5jdGlvbiBub3JtYWxpc2VPcmRlck1vZGVsKHsgY3VzdG9tZXIsIGNhcnQsIHRvdGFsLCB2b3VjaGVyLCAuLi5yZXN0IH0pIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXN0LFxuICAgIC4uLih0b3RhbCAmJiB7XG4gICAgICB0b3RhbDoge1xuICAgICAgICBncm9zczogdG90YWwuZ3Jvc3MsXG4gICAgICAgIG5ldDogdG90YWwubmV0LFxuICAgICAgICBjdXJyZW5jeTogdG90YWwuY3VycmVuY3ksXG4gICAgICAgIHRheDogdG90YWwudGF4LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICAuLi4oY2FydCAmJiB7XG4gICAgICBjYXJ0OiBjYXJ0Lm1hcChmdW5jdGlvbiBoYW5kbGVPcmRlckNhcnRJdGVtKGl0ZW0pIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGltYWdlcyA9IFtdLFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgc2t1LFxuICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgICBwcm9kdWN0VmFyaWFudElkLFxuICAgICAgICAgIHF1YW50aXR5LFxuICAgICAgICAgIHByaWNlLFxuICAgICAgICB9ID0gaXRlbTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgc2t1LFxuICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgICBwcm9kdWN0VmFyaWFudElkLFxuICAgICAgICAgIHF1YW50aXR5LFxuICAgICAgICAgIHByaWNlLFxuICAgICAgICAgIGltYWdlVXJsOiBpbWFnZXMgJiYgaW1hZ2VzWzBdICYmIGltYWdlc1swXS51cmwsXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICB9KSxcbiAgICAuLi4oY3VzdG9tZXIgJiYge1xuICAgICAgY3VzdG9tZXI6IHtcbiAgICAgICAgaWRlbnRpZmllcjogY3VzdG9tZXIuaWRlbnRpZmllcixcbiAgICAgICAgZmlyc3ROYW1lOiBjdXN0b21lci5maXJzdE5hbWUgfHwgbnVsbCxcbiAgICAgICAgbGFzdE5hbWU6IGN1c3RvbWVyLmxhc3ROYW1lIHx8IG51bGwsXG4gICAgICAgIGFkZHJlc3NlczogY3VzdG9tZXIuYWRkcmVzc2VzIHx8IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImJpbGxpbmdcIixcbiAgICAgICAgICAgIGVtYWlsOiBjdXN0b21lci5lbWFpbCB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gIH07XG59XG5cbmNvbnN0IGdldFRlbmFudElkID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHRlbmFudElkO1xuXG4gIHJldHVybiBhc3luYyAoKSA9PiB7XG4gICAgaWYgKHRlbmFudElkKSB7XG4gICAgICByZXR1cm4gdGVuYW50SWQ7XG4gICAgfVxuXG4gICAgY29uc3QgdGVuYW50SWRSZXNwb25zZSA9IGF3YWl0IGNhbGxDYXRhbG9ndWVBcGkoe1xuICAgICAgcXVlcnk6IGBcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZW5hbnQge1xuICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgYCxcbiAgICB9KTtcbiAgICB0ZW5hbnRJZCA9IHRlbmFudElkUmVzcG9uc2UuZGF0YS50ZW5hbnQuaWQ7XG5cbiAgICByZXR1cm4gdGVuYW50SWQ7XG4gIH07XG59KSgpO1xuXG4vKipcbiAqIENhdGFsb2d1ZSBBUEkgaXMgdGhlIGZhc3QgcmVhZC1vbmx5IEFQSSB0byBsb29rdXAgZGF0YVxuICogZm9yIGEgZ2l2ZW4gaXRlbSBwYXRoIG9yIGFueXRoaW5nIGVsc2UgaW4gdGhlIGNhdGFsb2d1ZVxuICovXG5jb25zdCBjYWxsQ2F0YWxvZ3VlQXBpID0gY3JlYXRlQXBpQ2FsbGVyKFxuICBgaHR0cHM6Ly9hcGkuY3J5c3RhbGxpemUuY29tLyR7Q1JZU1RBTExJWkVfVEVOQU5UX0lERU5USUZJRVJ9L2NhdGFsb2d1ZWBcbik7XG5cbi8qKlxuICogU2VhcmNoIEFQSSBpcyB0aGUgZmFzdCByZWFkLW9ubHkgQVBJIHRvIHNlYXJjaCBhY3Jvc3NcbiAqIGFsbCBpdGVtcyBhbmQgdG9waWNzXG4gKi9cbmNvbnN0IGNhbGxTZWFyY2hBcGkgPSBjcmVhdGVBcGlDYWxsZXIoXG4gIGBodHRwczovL2FwaS5jcnlzdGFsbGl6ZS5jb20vJHtDUllTVEFMTElaRV9URU5BTlRfSURFTlRJRklFUn0vc2VhcmNoYFxuKTtcblxuLyoqXG4gKiBPcmRlcnMgQVBJIGlzIHRoZSBoaWdobHkgc2NhbGFibGUgQVBJIHRvIHNlbmQvcmVhZCBtYXNzaXZlXG4gKiBhbW91bnRzIG9mIG9yZGVyc1xuICovXG5jb25zdCBjYWxsT3JkZXJzQXBpID0gY3JlYXRlQXBpQ2FsbGVyKFxuICBgaHR0cHM6Ly9hcGkuY3J5c3RhbGxpemUuY29tLyR7Q1JZU1RBTExJWkVfVEVOQU5UX0lERU5USUZJRVJ9L29yZGVyc2Bcbik7XG5cbi8qKlxuICogVGhlIFBJTSBBUEkgaXMgdXNlZCBmb3IgZG9pbmcgdGhlIEFMTCBwb3NzaWJsZSBhY3Rpb25zIG9uXG4gKiBhIHRlbmFudCBvciB5b3VyIHVzZXIgcHJvZmlsZVxuICovXG5jb25zdCBjYWxsUGltQXBpID0gY3JlYXRlQXBpQ2FsbGVyKFwiaHR0cHM6Ly9waW0uY3J5c3RhbGxpemUuY29tL2dyYXBocWxcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBub3JtYWxpc2VPcmRlck1vZGVsLFxuICBjYWxsQ2F0YWxvZ3VlQXBpLFxuICBjYWxsU2VhcmNoQXBpLFxuICBjYWxsT3JkZXJzQXBpLFxuICBjYWxsUGltQXBpLFxuICBnZXRUZW5hbnRJZCxcbn07XG4iLCJjb25zdCB7IHNlbmRFbWFpbCB9ID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbmNvbnN0IHNlbmRPcmRlckNvbmZpcm1hdGlvbiA9IHJlcXVpcmUoXCIuL29yZGVyLWNvbmZpcm1hdGlvblwiKTtcbmNvbnN0IHNlbmRVc2VyTWFnaWNMaW5rID0gcmVxdWlyZShcIi4vdXNlci1tYWdpYy1saW5rXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VuZEVtYWlsLFxuICBzZW5kT3JkZXJDb25maXJtYXRpb24sXG4gIHNlbmRVc2VyTWFnaWNMaW5rLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gc2VuZE9yZGVyQ29uZmlybWF0aW9uKG9yZGVySWQpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBtam1sMmh0bWwgPSByZXF1aXJlKFwibWptbFwiKTtcblxuICAgIGNvbnN0IHsgZm9ybWF0Q3VycmVuY3kgfSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvY3VycmVuY3lcIik7XG4gICAgY29uc3QgeyBvcmRlcnMgfSA9IHJlcXVpcmUoXCIuLi9jcnlzdGFsbGl6ZVwiKTtcbiAgICBjb25zdCB7IHNlbmRFbWFpbCB9ID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbiAgICBjb25zdCBvcmRlciA9IGF3YWl0IG9yZGVycy5nZXQob3JkZXJJZCk7XG5cbiAgICBjb25zdCB7IGVtYWlsIH0gPSBvcmRlci5jdXN0b21lci5hZGRyZXNzZXNbMF07XG5cbiAgICBpZiAoIWVtYWlsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IFwiTm8gZW1haWwgaXMgY29ubnRlY3RlZCB3aXRoIHRoZSBjdXN0b21lciBvYmplY3RcIixcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgeyBodG1sIH0gPSBtam1sMmh0bWwoYFxuICAgICAgPG1qbWw+XG4gICAgICAgIDxtai1ib2R5PlxuICAgICAgICA8bWotc2VjdGlvbj5cbiAgICAgICAgICA8bWotY29sdW1uPlxuICAgICAgICAgICAgPG1qLXRleHQ+XG4gICAgICAgICAgICAgIDxoMT5PcmRlciBTdW1tYXJ5PC9oMT5cbiAgICAgICAgICAgICAgPHA+VGhhbmtzIGZvciB5b3VyIG9yZGVyISBUaGlzIGVtYWlsIGNvbnRhaW5zIGEgY29weSBvZiB5b3VyIG9yZGVyIGZvciB5b3VyIHJlZmVyZW5jZS48L3A+XG4gICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIE9yZGVyIE51bWJlcjogPHN0cm9uZz4jJHtvcmRlci5pZH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBGaXJzdCBuYW1lOiA8c3Ryb25nPiR7b3JkZXIuY3VzdG9tZXIuZmlyc3ROYW1lfTwvc3Ryb25nPjxiciAvPlxuICAgICAgICAgICAgICAgIExhc3QgbmFtZTogPHN0cm9uZz4ke29yZGVyLmN1c3RvbWVyLmxhc3ROYW1lfTwvc3Ryb25nPjxiciAvPlxuICAgICAgICAgICAgICAgIEVtYWlsIGFkZHJlc3M6IDxzdHJvbmc+JHtlbWFpbH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBUb3RhbDogPHN0cm9uZz4ke2Zvcm1hdEN1cnJlbmN5KHtcbiAgICAgICAgICAgICAgICAgIGFtb3VudDogb3JkZXIudG90YWwuZ3Jvc3MsXG4gICAgICAgICAgICAgICAgICBjdXJyZW5jeTogb3JkZXIudG90YWwuY3VycmVuY3ksXG4gICAgICAgICAgICAgICAgfSl9PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvbWotdGV4dD5cbiAgICAgICAgICAgIDxtai10YWJsZT5cbiAgICAgICAgICAgICAgPHRyIHN0eWxlPVwiYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlY2VkZWU7IHRleHQtYWxpZ246IGxlZnQ7XCI+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPVwicGFkZGluZzogMCAxNXB4IDAgMDtcIj5OYW1lPC90aD5cbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9XCJwYWRkaW5nOiAwIDE1cHg7XCI+UXVhbnRpdHk8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT1cInBhZGRpbmc6IDAgMCAwIDE1cHg7XCI+VG90YWw8L3RoPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAke29yZGVyLmNhcnQubWFwKFxuICAgICAgICAgICAgICAgIChpdGVtKSA9PiBgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzogMCAxNXB4IDAgMDtcIj4ke2l0ZW0ubmFtZX0gKCR7XG4gICAgICAgICAgICAgICAgICBpdGVtLnNrdVxuICAgICAgICAgICAgICAgIH0pPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6IDAgMTVweDtcIj4ke2l0ZW0ucXVhbnRpdHl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6IDAgMCAwIDE1cHg7XCI+JHtmb3JtYXRDdXJyZW5jeSh7XG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDogaXRlbS5wcmljZS5ncm9zcyAqIGl0ZW0ucXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBpdGVtLnByaWNlLmN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgfSl9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPmBcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbWotdGFibGU+XG4gICAgICAgICAgPC9tai1jb2x1bW4+XG4gICAgICAgIDwvbWotc2VjdGlvbj5cbiAgICAgICAgPC9tai1ib2R5PlxuICAgICAgPC9tam1sPlxuICAgIGApO1xuXG4gICAgYXdhaXQgc2VuZEVtYWlsKHtcbiAgICAgIHRvOiBlbWFpbCxcbiAgICAgIHN1YmplY3Q6IFwiT3JkZXIgc3VtbWFyeVwiLFxuICAgICAgaHRtbCxcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yLFxuICAgIH07XG4gIH1cbn07XG4iLCJjb25zdCB7IHNlbmRFbWFpbCB9ID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gc2VuZE1hZ2ljTGlua0xvZ2luKHsgbG9naW5MaW5rLCBlbWFpbCB9KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbWptbDJodG1sID0gcmVxdWlyZShcIm1qbWxcIik7XG4gICAgY29uc3QgeyBodG1sIH0gPSBtam1sMmh0bWwoYFxuICAgICAgPG1qbWw+XG4gICAgICAgIDxtai1ib2R5PlxuICAgICAgICAgIDxtai1zZWN0aW9uPlxuICAgICAgICAgICAgPG1qLWNvbHVtbj5cbiAgICAgICAgICAgICAgPG1qLXRleHQ+SGkgdGhlcmUhIFNpbXBseSBmb2xsb3cgdGhlIGxpbmsgYmVsb3cgdG8gbG9naW4uPC9tai10ZXh0PlxuICAgICAgICAgICAgICA8bWotYnV0dG9uIGhyZWY9XCIke2xvZ2luTGlua31cIiBhbGlnbj1cImxlZnRcIj5DbGljayBoZXJlIHRvIGxvZ2luPC9tai1idXR0b24+XG4gICAgICAgICAgICA8L21qLWNvbHVtbj5cbiAgICAgICAgICA8L21qLXNlY3Rpb24+XG4gICAgICAgIDwvbWotYm9keT5cbiAgICAgIDwvbWptbD5cbiAgICBgKTtcblxuICAgIGF3YWl0IHNlbmRFbWFpbCh7XG4gICAgICB0bzogZW1haWwsXG4gICAgICBzdWJqZWN0OiBcIk1hZ2ljIGxpbmsgbG9naW5cIixcbiAgICAgIGh0bWwsXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcixcbiAgICB9O1xuICB9XG59O1xuIiwiY29uc3QgaW52YXJpYW50ID0gcmVxdWlyZShcImludmFyaWFudFwiKTtcblxuY29uc3QgU0VOREdSSURfQVBJX0tFWSA9IHByb2Nlc3MuZW52LlNFTkRHUklEX0FQSV9LRVk7XG5jb25zdCBFTUFJTF9GUk9NID0gcHJvY2Vzcy5lbnYuRU1BSUxfRlJPTTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlbmRFbWFpbChhcmdzKSB7XG4gICAgaW52YXJpYW50KFNFTkRHUklEX0FQSV9LRVksIFwicHJvY2Vzcy5lbnYuU0VOREdSSURfQVBJX0tFWSBub3QgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoRU1BSUxfRlJPTSwgXCJwcm9jZXNzLmVudi5FTUFJTF9GUk9NIGlzIG5vdCBkZWZpbmVkXCIpO1xuXG4gICAgY29uc3Qgc2dNYWlsID0gcmVxdWlyZShcIkBzZW5kZ3JpZC9tYWlsXCIpO1xuICAgIHNnTWFpbC5zZXRBcGlLZXkoU0VOREdSSURfQVBJX0tFWSk7XG5cbiAgICByZXR1cm4gc2dNYWlsLnNlbmQoe1xuICAgICAgZnJvbTogRU1BSUxfRlJPTSxcbiAgICAgIC4uLmFyZ3MsXG4gICAgfSk7XG4gIH0sXG59O1xuIiwiLyoqXG4gKiBBbiBleGFtcGxlIG9mIGhvdyB0byBjYXB0dXJlIGFuIGFtb3VudCBmb3Igb24gYW5cbiAqIG9yZGVyLiBZb3Ugd291bGQgdHlwaWNhbGx5IGRvIHRoaXMgYXMgYSByZXNwb25zZSB0b1xuICogYW4gdXBkYXRlIG9mIGEgRnVsZmlsbWVudCBQaXBlbGFuZSBTdGFnZSBjaGFuZ2UgaW5cbiAqIENyeXN0YWxsaXplIChodHRwczovL2NyeXN0YWxsaXplLmNvbS9sZWFybi9kZXZlbG9wZXItZ3VpZGVzL29yZGVyLWFwaS9mdWxmaWxtZW50LXBpcGVsaW5lcylcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIGtsYXJuYUNhcHR1cmUoeyBjcnlzdGFsbGl6ZU9yZGVySWQgfSkge1xuICBjb25zdCBjcnlzdGFsbGl6ZSA9IHJlcXVpcmUoXCIuLi8uLi9jcnlzdGFsbGl6ZVwiKTtcbiAgY29uc3QgeyBnZXRDbGllbnQgfSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuXG4gIC8vIFJldHJpZXZlIHRoZSBDcnlzdGFsbGl6ZSBvcmRlclxuICBjb25zdCBjcnlzdGFsbGl6ZU9yZGVyID0gYXdhaXQgY3J5c3RhbGxpemUub3JkZXJzLmdldChjcnlzdGFsbGl6ZU9yZGVySWQpO1xuICBjb25zdCBrbGFybmFQYXltZW50ID0gY3J5c3RhbGxpemVPcmRlci5wYXltZW50LmZpbmQoXG4gICAgKHApID0+IHAucHJvdmlkZXIgPT09IFwia2xhcm5hXCJcbiAgKTtcbiAgaWYgKCFrbGFybmFQYXltZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBPcmRlciAke2NyeXN0YWxsaXplT3JkZXJJZH0gaGFzIG5vIEtsYXJuYSBwYXltZW50YCk7XG4gIH1cbiAgY29uc3Qga2xhcm5hT3JkZXJJZCA9IGtsYXJuYVBheW1lbnQub3JkZXJJZDtcbiAgaWYgKCFrbGFybmFPcmRlcklkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBPcmRlciAke2NyeXN0YWxsaXplT3JkZXJJZH0gaGFzIG5vIGtsYXJuYU9yZGVySWRgKTtcbiAgfVxuXG4gIGNvbnN0IGtsYXJuYUNsaWVudCA9IGF3YWl0IGdldENsaWVudCgpO1xuXG4gIC8vIENhcHR1cmUgdGhlIGZ1bGwgYW1vdW50IGZvciB0aGUgb3JkZXJcbiAgY29uc3Qge1xuICAgIGVycm9yLFxuICAgIHJlc3BvbnNlLFxuICB9ID0gYXdhaXQga2xhcm5hQ2xpZW50Lm9yZGVybWFuYWdlbWVudFYxLmNhcHR1cmVzLmNhcHR1cmUoa2xhcm5hT3JkZXJJZCk7XG5cbiAgY29uc29sZS5sb2coZXJyb3IsIHJlc3BvbnNlKTtcblxuICAvKipcbiAgICogWW91IHdvdWxkIHR5cGljYWxseSBhbHNvIG1vdmUgdGhlIG9yZGVyIGluIHRoZVxuICAgKiBmdWxmaWxtZW50IHBpcGVsaW5lIGZyb20gYSBzdGFnZSBjYWxsZWQgZS5nLlxuICAgKiBcImNyZWF0ZWRcIiB0byBcInB1cmNoYXNlZFwiIGhlcmVcbiAgICovXG59O1xuIiwiY29uc3QgS0xBUk5BX1VTRVJOQU1FID0gcHJvY2Vzcy5lbnYuS0xBUk5BX1VTRVJOQU1FO1xuY29uc3QgS0xBUk5BX1BBU1NXT1JEID0gcHJvY2Vzcy5lbnYuS0xBUk5BX1BBU1NXT1JEO1xuXG5jb25zdCB7IGdldENsaWVudCB9ID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbmNvbnN0IHJlbmRlckNoZWNrb3V0ID0gcmVxdWlyZShcIi4vcmVuZGVyLWNoZWNrb3V0XCIpO1xuY29uc3QgcHVzaCA9IHJlcXVpcmUoXCIuL3B1c2hcIik7XG5jb25zdCBjYXB0dXJlID0gcmVxdWlyZShcIi4vY2FwdHVyZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVuYWJsZWQ6IEJvb2xlYW4oS0xBUk5BX1VTRVJOQU1FICYmIEtMQVJOQV9QQVNTV09SRCksXG4gIGZyb250ZW5kQ29uZmlnOiB7fSxcbiAgZ2V0Q2xpZW50LFxuICByZW5kZXJDaGVja291dCxcbiAgcHVzaCxcbiAgY2FwdHVyZSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIGtsYXJuYVB1c2goe1xuICBjcnlzdGFsbGl6ZU9yZGVySWQsXG4gIGtsYXJuYU9yZGVySWQsXG59KSB7XG4gIGNvbnN0IHsgZ2V0Q2xpZW50IH0gPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbiAgY29uc29sZS5sb2coXCJLbGFybmEgcHVzaFwiLCB7IGNyeXN0YWxsaXplT3JkZXJJZCwga2xhcm5hT3JkZXJJZCB9KTtcblxuICBjb25zdCBrbGFybmFDbGllbnQgPSBhd2FpdCBnZXRDbGllbnQoKTtcblxuICAvLyBSZXRyaWV2ZSB0aGUgS2xhcm5hIG9yZGVyIHRvIGdldCB0aGUgcGF5bWVudCBzdGF0dXNcblxuICAvLyBBY2tub3dsZWRnZSB0aGUgS2xhcm5hIG9yZGVyXG4gIGF3YWl0IGtsYXJuYUNsaWVudC5vcmRlcm1hbmFnZW1lbnRWMS5vcmRlcnMuYWNrbm93bGVkZ2Uoa2xhcm5hT3JkZXJJZCk7XG5cbiAgLyoqXG4gICAqIFlvdSB3b3VsZCB0eXBpY2FsbHkgYWxzbyBtb3ZlIHRoZSBvcmRlciBpbiB0aGVcbiAgICogZnVsZmlsbWVudCBwaXBlbGluZSBmcm9tIGEgc3RhZ2UgY2FsbGVkIGUuZy5cbiAgICogXCJpbml0aWFsXCIgdG8gXCJjcmVhdGVkXCIgaGVyZVxuICAgKi9cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIHJlbmRlckNoZWNrb3V0KHsgY2hlY2tvdXRNb2RlbCwgY29udGV4dCB9KSB7XG4gIGNvbnN0IGNyeXN0YWxsaXplID0gcmVxdWlyZShcIi4uLy4uL2NyeXN0YWxsaXplXCIpO1xuICBjb25zdCBiYXNrZXRTZXJ2aWNlID0gcmVxdWlyZShcIi4uLy4uL2Jhc2tldC1zZXJ2aWNlXCIpO1xuXG4gIGNvbnN0IHsgZ2V0Q2xpZW50IH0gPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbiAgY29uc3QgdG9LbGFybmFPcmRlck1vZGVsID0gcmVxdWlyZShcIi4vdG8ta2xhcm5hLW9yZGVyLW1vZGVsXCIpO1xuXG4gIGNvbnN0IHtcbiAgICBiYXNrZXRNb2RlbCxcbiAgICBjdXN0b21lcixcbiAgICBjb25maXJtYXRpb25VUkwsXG4gICAgdGVybXNVUkwsXG4gICAgY2hlY2tvdXRVUkwsXG4gIH0gPSBjaGVja291dE1vZGVsO1xuICBjb25zdCB7IHNlcnZpY2VDYWxsYmFja0hvc3QsIHVzZXIgfSA9IGNvbnRleHQ7XG5cbiAgbGV0IHsgY3J5c3RhbGxpemVPcmRlcklkLCBrbGFybmFPcmRlcklkIH0gPSBiYXNrZXRNb2RlbDtcblxuICBjb25zdCBiYXNrZXQgPSBhd2FpdCBiYXNrZXRTZXJ2aWNlLmdldCh7IGJhc2tldE1vZGVsLCBjb250ZXh0IH0pO1xuXG4gIC8vIEFkZCB0aGUgaWRlbnRpZmllciBmcm9tIHRoZSBjdXJyZW50IGxvZ2dlZCBpbiB1c2VyXG4gIGNvbnN0IGN1c3RvbWVyV2l0aEN1cnJlbnRMb2dnZWRJblVzZXIgPSB7XG4gICAgLi4uY3VzdG9tZXIsXG4gIH07XG4gIGlmICh1c2VyKSB7XG4gICAgY3VzdG9tZXJXaXRoQ3VycmVudExvZ2dlZEluVXNlci5pZGVudGlmaWVyID0gdXNlci5lbWFpbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgYSBDcnlzdGFsbGl6ZSBvcmRlciBhbmQgdGhlIGZ1bGZpbG1lbnQgcGlwZWxpbmVzIHRvXG4gICAqIG1hbmFnZSB0aGUgbGlmZWN5Y2xlIG9mIHRoZSBvcmRlclxuICAgKi9cbiAgaWYgKGNyeXN0YWxsaXplT3JkZXJJZCkge1xuICAgIGF3YWl0IGNyeXN0YWxsaXplLm9yZGVycy51cGRhdGUoY3J5c3RhbGxpemVPcmRlcklkLCB7XG4gICAgICAuLi5iYXNrZXQsXG4gICAgICBjdXN0b21lcjogY3VzdG9tZXJXaXRoQ3VycmVudExvZ2dlZEluVXNlcixcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjcnlzdGFsbGl6ZU9yZGVyID0gYXdhaXQgY3J5c3RhbGxpemUub3JkZXJzLmNyZWF0ZSh7XG4gICAgICAuLi5iYXNrZXQsXG4gICAgICBjdXN0b21lcjogY3VzdG9tZXJXaXRoQ3VycmVudExvZ2dlZEluVXNlcixcbiAgICB9KTtcbiAgICBjcnlzdGFsbGl6ZU9yZGVySWQgPSBjcnlzdGFsbGl6ZU9yZGVyLmlkO1xuICB9XG5cbiAgLy8gU2V0dXAgdGhlIGNvbmZpcm1hdGlvbiBVUkxcbiAgY29uc3QgY29uZmlybWF0aW9uID0gbmV3IFVSTChcbiAgICBjb25maXJtYXRpb25VUkwucmVwbGFjZShcIntjcnlzdGFsbGl6ZU9yZGVySWR9XCIsIGNyeXN0YWxsaXplT3JkZXJJZClcbiAgKTtcbiAgY29uZmlybWF0aW9uLnNlYXJjaFBhcmFtcy5hcHBlbmQoXCJrbGFybmFPcmRlcklkXCIsIFwie2NoZWNrb3V0Lm9yZGVyLmlkfVwiKTtcblxuICBjb25zdCB2YWxpZEtsYXJuYU9yZGVyTW9kZWwgPSB7XG4gICAgLi4udG9LbGFybmFPcmRlck1vZGVsKGJhc2tldCksXG4gICAgcHVyY2hhc2VfY291bnRyeTogXCJOT1wiLFxuICAgIHB1cmNoYXNlX2N1cnJlbmN5OiBiYXNrZXQudG90YWwuY3VycmVuY3kgfHwgXCJOT0tcIixcbiAgICBsb2NhbGU6IFwibm8tbmJcIixcbiAgICBtZXJjaGFudF91cmxzOiB7XG4gICAgICB0ZXJtczogdGVybXNVUkwsXG4gICAgICBjaGVja291dDogY2hlY2tvdXRVUkwsXG4gICAgICBjb25maXJtYXRpb246IGNvbmZpcm1hdGlvbi50b1N0cmluZygpLFxuICAgICAgcHVzaDogYCR7c2VydmljZUNhbGxiYWNrSG9zdH0vd2ViaG9va3MvcGF5bWVudC1wcm92aWRlcnMva2xhcm5hL3B1c2g/Y3J5c3RhbGxpemVPcmRlcklkPSR7Y3J5c3RhbGxpemVPcmRlcklkfSZrbGFybmFPcmRlcklkPXtjaGVja291dC5vcmRlci5pZH1gLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3Qga2xhcm5hQ2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KCk7XG5cbiAgLyoqXG4gICAqIEhvbGQgdGhlIEhUTUwgc25pcHBldCB0aGF0IHdpbGwgYmUgdXNlZCBvbiB0aGVcbiAgICogZnJvbnRlbmQgdG8gZGlzcGxheSB0aGUgS2xhcm5hIGNoZWNrb3V0XG4gICAqL1xuICBsZXQgaHRtbCA9IFwiXCI7XG5cbiAgLyoqXG4gICAqIFRoZXJlIGlzIGFscmVhZHkgYSBLbGFybmEgb3JkZXIgaWQgZm9yIHRoaXMgdXNlclxuICAgKiBzZXNzaW9uLCBsZXQncyB1c2UgdGhhdCBhbmQgbm90IGNyZWF0ZSBhIG5ldyBvbmVcbiAgICovXG4gIGlmIChrbGFybmFPcmRlcklkKSB7XG4gICAgY29uc3QgeyBlcnJvciwgcmVzcG9uc2UgfSA9IGF3YWl0IGtsYXJuYUNsaWVudC5jaGVja291dFYzLnVwZGF0ZU9yZGVyKFxuICAgICAga2xhcm5hT3JkZXJJZCxcbiAgICAgIHZhbGlkS2xhcm5hT3JkZXJNb2RlbFxuICAgICk7XG5cbiAgICBpZiAoIWVycm9yKSB7XG4gICAgICBodG1sID0gcmVzcG9uc2UuaHRtbF9zbmlwcGV0O1xuICAgICAga2xhcm5hT3JkZXJJZCA9IHJlc3BvbnNlLm9yZGVyX2lkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCB7IGVycm9yLCByZXNwb25zZSB9ID0gYXdhaXQga2xhcm5hQ2xpZW50LmNoZWNrb3V0VjMuY3JlYXRlT3JkZXIoXG4gICAgICB2YWxpZEtsYXJuYU9yZGVyTW9kZWxcbiAgICApO1xuXG4gICAgaWYgKCFlcnJvcikge1xuICAgICAgaHRtbCA9IHJlc3BvbnNlLmh0bWxfc25pcHBldDtcbiAgICAgIGtsYXJuYU9yZGVySWQgPSByZXNwb25zZS5vcmRlcl9pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIENyeXN0YWxsaXplIG9yZGVyIGNyZWF0aW5nIGlzIGFzeW5jaHJvbm91cywgc28gd2UgaGF2ZVxuICAgKiB0byB3YWl0IGZvciB0aGUgb3JkZXIgdG8gYmUgZnVsbHkgcGVyc2lzdGVkXG4gICAqL1xuICBhd2FpdCBjcnlzdGFsbGl6ZS5vcmRlcnMud2FpdEZvck9yZGVyVG9CZVBlcnNpc3RhdGVkKHtcbiAgICBpZDogY3J5c3RhbGxpemVPcmRlcklkLFxuICB9KTtcblxuICAvLyBUYWcgdGhlIENyeXN0YWxsaXplIG9yZGVyIHdpdGggdGhlIEtsYXJuYSBvcmRlciBpZFxuICBhd2FpdCBjcnlzdGFsbGl6ZS5vcmRlcnMudXBkYXRlKGNyeXN0YWxsaXplT3JkZXJJZCwge1xuICAgIC4uLmJhc2tldCxcbiAgICBwYXltZW50OiBbXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGVyOiBcImtsYXJuYVwiLFxuICAgICAgICBrbGFybmE6IHtcbiAgICAgICAgICBvcmRlcklkOiBrbGFybmFPcmRlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIGh0bWwsXG4gICAga2xhcm5hT3JkZXJJZCxcbiAgICBjcnlzdGFsbGl6ZU9yZGVySWQsXG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcnlzdGFsbGl6ZVRvS2xhcm5hT3JkZXJNb2RlbChiYXNrZXQpIHtcbiAgY29uc3QgeyB0b3RhbCwgY2FydCB9ID0gYmFza2V0O1xuXG4gIGNvbnN0IG9yZGVyX2Ftb3VudCA9IHRvdGFsLmdyb3NzICogMTAwO1xuXG4gIHJldHVybiB7XG4gICAgb3JkZXJfYW1vdW50LFxuICAgIG9yZGVyX3RheF9hbW91bnQ6IG9yZGVyX2Ftb3VudCAtIHRvdGFsLm5ldCAqIDEwMCxcbiAgICBvcmRlcl9saW5lczogY2FydC5tYXAoXG4gICAgICAoe1xuICAgICAgICBza3UsXG4gICAgICAgIHF1YW50aXR5LFxuICAgICAgICBwcmljZSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICBwcm9kdWN0VmFyaWFudElkLFxuICAgICAgICBpbWFnZVVybCxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgY29uc3QgeyBncm9zcywgbmV0LCB0YXggfSA9IHByaWNlO1xuICAgICAgICBjb25zdCB1bml0X3ByaWNlID0gZ3Jvc3MgKiAxMDA7XG5cbiAgICAgICAgaWYgKHNrdS5zdGFydHNXaXRoKFwiLS12b3VjaGVyLS1cIikpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVmZXJlbmNlOiBza3UsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgcXVhbnRpdHk6IDEsXG4gICAgICAgICAgICB1bml0X3ByaWNlLFxuICAgICAgICAgICAgdG90YWxfYW1vdW50OiB1bml0X3ByaWNlLFxuICAgICAgICAgICAgdG90YWxfdGF4X2Ftb3VudDogMCxcbiAgICAgICAgICAgIHRheF9yYXRlOiAwLFxuICAgICAgICAgICAgdHlwZTogXCJkaXNjb3VudFwiLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0b3RhbF9hbW91bnQgPSB1bml0X3ByaWNlICogcXVhbnRpdHk7XG4gICAgICAgIGNvbnN0IHRvdGFsX3RheF9hbW91bnQgPSB0b3RhbF9hbW91bnQgLSBuZXQgKiBxdWFudGl0eSAqIDEwMDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgcmVmZXJlbmNlOiBza3UsXG4gICAgICAgICAgdW5pdF9wcmljZSxcbiAgICAgICAgICBxdWFudGl0eSxcbiAgICAgICAgICB0b3RhbF9hbW91bnQsXG4gICAgICAgICAgdG90YWxfdGF4X2Ftb3VudCxcbiAgICAgICAgICB0eXBlOiBcInBoeXNpY2FsXCIsXG4gICAgICAgICAgdGF4X3JhdGU6IHRheC5wZXJjZW50ICogMTAwLFxuICAgICAgICAgIGltYWdlX3VybDogaW1hZ2VVcmwsXG4gICAgICAgICAgbWVyY2hhbnRfZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnRJZCxcbiAgICAgICAgICAgIHRheEdyb3VwOiB0YXgsXG4gICAgICAgICAgfSksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgKSxcbiAgfTtcbn07XG4iLCIvKipcbiAqIFJlYWQgbW9yZSBhYm91dCBob3cgdG8gdGFsayB0byB0aGUgS2xhcm5hIEFQSSBoZXJlOlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmtsYXJuYS5jb20vYXBpLyNpbnRyb2R1Y3Rpb25cbiAqL1xuXG5jb25zdCBpbnZhcmlhbnQgPSByZXF1aXJlKFwiaW52YXJpYW50XCIpO1xuXG5jb25zdCBLTEFSTkFfVVNFUk5BTUUgPSBwcm9jZXNzLmVudi5LTEFSTkFfVVNFUk5BTUU7XG5jb25zdCBLTEFSTkFfUEFTU1dPUkQgPSBwcm9jZXNzLmVudi5LTEFSTkFfUEFTU1dPUkQ7XG5cbmxldCBjbGllbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGllbnQ6ICgpID0+IHtcbiAgICBjb25zdCB7IEtsYXJuYSB9ID0gcmVxdWlyZShcIkBjcnlzdGFsbGl6ZS9ub2RlLWtsYXJuYVwiKTtcblxuICAgIGludmFyaWFudChLTEFSTkFfVVNFUk5BTUUsIFwicHJvY2Vzcy5lbnYuS0xBUk5BX1VTRVJOQU1FIGlzIG5vdCBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChLTEFSTkFfUEFTU1dPUkQsIFwicHJvY2Vzcy5lbnYuS0xBUk5BX1BBU1NXT1JEIGlzIG5vdCBkZWZpbmVkXCIpO1xuXG4gICAgaWYgKCFjbGllbnQgJiYgS0xBUk5BX1VTRVJOQU1FICYmIEtMQVJOQV9QQVNTV09SRCkge1xuICAgICAgY2xpZW50ID0gbmV3IEtsYXJuYSh7XG4gICAgICAgIHVzZXJuYW1lOiBLTEFSTkFfVVNFUk5BTUUsXG4gICAgICAgIHBhc3N3b3JkOiBLTEFSTkFfUEFTU1dPUkQsXG4gICAgICAgIGFwaUVuZHBvaW50OiBcImFwaS5wbGF5Z3JvdW5kLmtsYXJuYS5jb21cIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBjcmVhdGVNb2xsaWVQYXltZW50KHtcbiAgY2hlY2tvdXRNb2RlbCxcbiAgY29udGV4dCxcbn0pIHtcbiAgY29uc3QgYmFza2V0U2VydmljZSA9IHJlcXVpcmUoXCIuLi8uLi9iYXNrZXQtc2VydmljZVwiKTtcbiAgY29uc3QgY3J5c3RhbGxpemUgPSByZXF1aXJlKFwiLi4vLi4vY3J5c3RhbGxpemVcIik7XG5cbiAgY29uc3QgeyBnZXRDbGllbnQgfSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuXG4gIGNvbnN0IHsgYmFza2V0TW9kZWwsIGN1c3RvbWVyLCBjb25maXJtYXRpb25VUkwgfSA9IGNoZWNrb3V0TW9kZWw7XG4gIGNvbnN0IHsgc2VydmljZUNhbGxiYWNrSG9zdCwgdXNlciB9ID0gY29udGV4dDtcblxuICAvLyBBZGQgdGhlIGlkZW50aWZpZXIgZnJvbSB0aGUgY3VycmVudCBsb2dnZWQgaW4gdXNlclxuICBjb25zdCBjdXN0b21lcldpdGhDdXJyZW50TG9nZ2VkSW5Vc2VyID0ge1xuICAgIC4uLmN1c3RvbWVyLFxuICB9O1xuICBpZiAodXNlcikge1xuICAgIGN1c3RvbWVyV2l0aEN1cnJlbnRMb2dnZWRJblVzZXIuaWRlbnRpZmllciA9IHVzZXIuZW1haWw7XG4gIH1cblxuICBjb25zdCBiYXNrZXQgPSBhd2FpdCBiYXNrZXRTZXJ2aWNlLmdldCh7IGJhc2tldE1vZGVsLCBjb250ZXh0IH0pO1xuICBjb25zdCB7IHRvdGFsIH0gPSBiYXNrZXQ7XG5cbiAgbGV0IHsgY3J5c3RhbGxpemVPcmRlcklkIH0gPSBiYXNrZXRNb2RlbDtcblxuICBjb25zdCBpc1N1YnNjcmlwdGlvbiA9IGZhbHNlO1xuXG4gIC8qIFVzZSBhIENyeXN0YWxsaXplIG9yZGVyIGFuZCB0aGUgZnVsZmlsbWVudCBwaXBlbGluZXMgdG9cbiAgICogbWFuYWdlIHRoZSBsaWZlY3ljbGUgb2YgdGhlIG9yZGVyXG4gICAqL1xuICBpZiAoY3J5c3RhbGxpemVPcmRlcklkKSB7XG4gICAgYXdhaXQgY3J5c3RhbGxpemUub3JkZXJzLnVwZGF0ZShjcnlzdGFsbGl6ZU9yZGVySWQsIHtcbiAgICAgIC4uLmJhc2tldCxcbiAgICAgIGN1c3RvbWVyOiBjdXN0b21lcldpdGhDdXJyZW50TG9nZ2VkSW5Vc2VyLFxuICAgICAgbWV0YTogW1xuICAgICAgICB7XG4gICAgICAgICAga2V5OiBcImlzU3Vic2NyaXB0aW9uXCIsXG4gICAgICAgICAgdmFsdWU6IGlzU3Vic2NyaXB0aW9uID8gXCJ5ZXNcIiA6IFwibm9cIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY3J5c3RhbGxpemVPcmRlciA9IGF3YWl0IGNyeXN0YWxsaXplLm9yZGVycy5jcmVhdGUoe1xuICAgICAgLi4uYmFza2V0LFxuICAgICAgY3VzdG9tZXI6IGN1c3RvbWVyV2l0aEN1cnJlbnRMb2dnZWRJblVzZXIsXG4gICAgICBtZXRhOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6IFwiaXNTdWJzY3JpcHRpb25cIixcbiAgICAgICAgICB2YWx1ZTogaXNTdWJzY3JpcHRpb24gPyBcInllc1wiIDogXCJub1wiLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgICBjcnlzdGFsbGl6ZU9yZGVySWQgPSBjcnlzdGFsbGl6ZU9yZGVyLmlkO1xuICB9XG5cbiAgY29uc3QgbW9sbGllQ2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KCk7XG5cbiAgY29uc3QgbW9sbGllQ3VzdG9tZXIgPSBhd2FpdCBtb2xsaWVDbGllbnQuY3VzdG9tZXJzLmNyZWF0ZSh7XG4gICAgbmFtZTogYCR7Y3VzdG9tZXIuZmlyc3ROYW1lfSAke2N1c3RvbWVyLmxhc3ROYW1lfWAudHJpbSgpIHx8IFwiSmFuZSBEb2VcIixcbiAgICBlbWFpbDogY3VzdG9tZXIuYWRkcmVzc2VzWzBdLmVtYWlsLFxuICB9KTtcblxuICBjb25zdCBjb25maXJtYXRpb24gPSBuZXcgVVJMKFxuICAgIGNvbmZpcm1hdGlvblVSTC5yZXBsYWNlKFwie2NyeXN0YWxsaXplT3JkZXJJZH1cIiwgY3J5c3RhbGxpemVPcmRlcklkKVxuICApO1xuXG4gIGNvbnN0IHZhbGlkTW9sbGllT3JkZXIgPSB7XG4gICAgYW1vdW50OiB7XG4gICAgICBjdXJyZW5jeTpcbiAgICAgICAgcHJvY2Vzcy5lbnYuTU9MTElFX0RFRkFVTFRfQ1VSUkVOQ1kgfHwgdG90YWwuY3VycmVuY3kudG9VcHBlckNhc2UoKSxcbiAgICAgIHZhbHVlOiB0b3RhbC5ncm9zcy50b0ZpeGVkKDIpLFxuICAgIH0sXG4gICAgY3VzdG9tZXJJZDogbW9sbGllQ3VzdG9tZXIuaWQsXG4gICAgc2VxdWVuY2VUeXBlOiBcImZpcnN0XCIsXG4gICAgZGVzY3JpcHRpb246IFwiTW9sbGllIHRlc3QgdHJhbnNhY3Rpb25cIixcbiAgICByZWRpcmVjdFVybDogY29uZmlybWF0aW9uLnRvU3RyaW5nKCksXG4gICAgd2ViaG9va1VybDogYCR7c2VydmljZUNhbGxiYWNrSG9zdH0vd2ViaG9va3MvcGF5bWVudC1wcm92aWRlcnMvbW9sbGllL29yZGVyLXVwZGF0ZWAsXG4gICAgbWV0YWRhdGE6IHsgY3J5c3RhbGxpemVPcmRlcklkIH0sXG4gIH07XG5cbiAgY29uc3QgbW9sbGllT3JkZXJSZXNwb25zZSA9IGF3YWl0IG1vbGxpZUNsaWVudC5wYXltZW50cy5jcmVhdGUoXG4gICAgdmFsaWRNb2xsaWVPcmRlclxuICApO1xuXG4gIGlmIChpc1N1YnNjcmlwdGlvbikge1xuICAgIGF3YWl0IG1vbGxpZUNsaWVudC5jdXN0b21lcnNfbWFuZGF0ZXMuZ2V0KG1vbGxpZU9yZGVyUmVzcG9uc2UubWFuZGF0ZUlkLCB7XG4gICAgICBjdXN0b21lcklkOiBtb2xsaWVDdXN0b21lci5pZCxcbiAgICB9KTtcblxuICAgIC8vIERlZmluZSB0aGUgc3RhcnQgZGF0ZSBmb3IgdGhlIHN1YnNjcmlwdGlvblxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgc3RhcnREYXRlLnNldERhdGUoc3RhcnREYXRlLmdldERhdGUoKSArIDE1KTtcbiAgICBzdGFydERhdGUudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG5cbiAgICBhd2FpdCBtb2xsaWVDbGllbnQuY3VzdG9tZXJzX3N1YnNjcmlwdGlvbnMuY3JlYXRlKHtcbiAgICAgIGN1c3RvbWVySWQ6IG1vbGxpZUN1c3RvbWVyLmlkLFxuICAgICAgYW1vdW50OiB2YWxpZE1vbGxpZU9yZGVyLmFtb3VudCxcbiAgICAgIHRpbWVzOiAxLFxuICAgICAgaW50ZXJ2YWw6IFwiMSBtb250aFwiLFxuICAgICAgc3RhcnREYXRlLFxuICAgICAgZGVzY3JpcHRpb246IFwiTW9sbGllIFRlc3Qgc3Vic2NyaXB0aW9uXCIsXG4gICAgICB3ZWJob29rVXJsOiBgJHtzZXJ2aWNlQ2FsbGJhY2tIb3N0fS93ZWJob29rcy9wYXltZW50LXByb3ZpZGVycy9tb2xsaWUvc3Vic2NyaXB0aW9uLXJlbmV3YWxgLFxuICAgICAgbWV0YWRhdGE6IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdWNjZXNzOiB0cnVlLFxuICAgIGNoZWNrb3V0TGluazogbW9sbGllT3JkZXJSZXNwb25zZS5fbGlua3MuY2hlY2tvdXQuaHJlZixcbiAgICBjcnlzdGFsbGl6ZU9yZGVySWQsXG4gIH07XG59O1xuIiwiY29uc3QgeyBnZXRDbGllbnQgfSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuY29uc3QgdG9DcnlzdGFsbGl6ZU9yZGVyTW9kZWwgPSByZXF1aXJlKFwiLi90by1jcnlzdGFsbGl6ZS1vcmRlci1tb2RlbFwiKTtcbmNvbnN0IGNyZWF0ZVBheW1lbnQgPSByZXF1aXJlKFwiLi9jcmVhdGUtcGF5bWVudFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVuYWJsZWQ6IEJvb2xlYW4ocHJvY2Vzcy5lbnYuTU9MTElFX0FQSV9LRVkpLFxuICBmcm9udGVuZENvbmZpZzoge30sXG4gIGdldENsaWVudCxcbiAgdG9DcnlzdGFsbGl6ZU9yZGVyTW9kZWwsXG4gIGNyZWF0ZVBheW1lbnQsXG59O1xuIiwiLyoqXG4gKiBUT0RPOiByZXZpZXcgd2hhdCBoYXBwZW5zIHRvIHRoZSBHZW5lcmFsIE9yZGVyIFZhdCBHcm91cCBvbiBtdWx0aXBsZSB0YXggZ3JvdXBzXG4gKiBvbiBvcmRlciAobXVsdC4gaXRlbXMgaGF2aW5nIGRpZmYgdmF0VHlwZXMsIGlzIGl0IGEgdGhpbmc/KVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbW9sbGllVG9DcnlzdGFsbGl6ZU9yZGVyTW9kZWwoe1xuICBtb2xsaWVPcmRlcixcbiAgbW9sbGllQ3VzdG9tZXIsXG59KSB7XG4gIGNvbnN0IGN1c3RvbWVyTmFtZSA9IG1vbGxpZUN1c3RvbWVyLm5hbWUuc3BsaXQoXCIgXCIpO1xuXG4gIHJldHVybiB7XG4gICAgY3VzdG9tZXI6IHtcbiAgICAgIGlkZW50aWZpZXI6IG1vbGxpZUN1c3RvbWVyLmVtYWlsLFxuICAgICAgZmlyc3ROYW1lOiBjdXN0b21lck5hbWVbMF0sXG4gICAgICBtaWRkbGVOYW1lOiBjdXN0b21lck5hbWUuc2xpY2UoMSwgY3VzdG9tZXJOYW1lLmxlbmd0aCAtIDEpLmpvaW4oKSxcbiAgICAgIGxhc3ROYW1lOiBjdXN0b21lck5hbWVbY3VzdG9tZXJOYW1lLmxlbmd0aCAtIDFdLFxuICAgICAgYmlydGhEYXRlOiBEYXRlLFxuICAgICAgYWRkcmVzc2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiBcImJpbGxpbmdcIixcbiAgICAgICAgICBmaXJzdE5hbWU6IGN1c3RvbWVyTmFtZVswXSxcbiAgICAgICAgICBtaWRkbGVOYW1lOiBjdXN0b21lck5hbWUuc2xpY2UoMSwgY3VzdG9tZXJOYW1lLmxlbmd0aCAtIDEpLmpvaW4oKSxcbiAgICAgICAgICBsYXN0TmFtZTogY3VzdG9tZXJOYW1lW2N1c3RvbWVyTmFtZS5sZW5ndGggLSAxXSxcbiAgICAgICAgICBzdHJlZXQ6IFwiVGVzdCBsaW5lMVwiLFxuICAgICAgICAgIHN0cmVldDI6IFwiVGVzdCBsaW5lMlwiLFxuICAgICAgICAgIHBvc3RhbENvZGU6IFwiVGVzdCBwb3N0YWxfY29kZVwiLFxuICAgICAgICAgIGNpdHk6IFwiVGVzdCBjaXR5XCIsXG4gICAgICAgICAgc3RhdGU6IFwiVGVzdCBzdGF0ZVwiLFxuICAgICAgICAgIGNvdW50cnk6IFwiVGVzdCBjb3VudHJ5XCIsXG4gICAgICAgICAgcGhvbmU6IFwiVGVzdCBQaG9uZVwiLFxuICAgICAgICAgIGVtYWlsOiBtb2xsaWVDdXN0b21lci5lbWFpbCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwiZGVsaXZlcnlcIixcbiAgICAgICAgICBmaXJzdE5hbWU6IGN1c3RvbWVyTmFtZVswXSxcbiAgICAgICAgICBtaWRkbGVOYW1lOiBjdXN0b21lck5hbWUuc2xpY2UoMSwgY3VzdG9tZXJOYW1lLmxlbmd0aCAtIDEpLmpvaW4oKSxcbiAgICAgICAgICBsYXN0TmFtZTogY3VzdG9tZXJOYW1lW2N1c3RvbWVyTmFtZS5sZW5ndGggLSAxXSxcbiAgICAgICAgICBzdHJlZXQ6IFwiVGVzdCBsaW5lMVwiLFxuICAgICAgICAgIHN0cmVldDI6IFwiVGVzdCBsaW5lMlwiLFxuICAgICAgICAgIHBvc3RhbENvZGU6IFwiVGVzdCBwb3N0YWxfY29kZVwiLFxuICAgICAgICAgIGNpdHk6IFwiVGVzdCBjaXR5XCIsXG4gICAgICAgICAgc3RhdGU6IFwiVGVzdCBzdGF0ZVwiLFxuICAgICAgICAgIGNvdW50cnk6IFwiVGVzdCBjb3VudHJ5XCIsXG4gICAgICAgICAgcGhvbmU6IFwiVGVzdCBQaG9uZVwiLFxuICAgICAgICAgIGVtYWlsOiBtb2xsaWVDdXN0b21lci5lbWFpbCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBwYXltZW50OiBbXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGVyOiBcImN1c3RvbVwiLFxuICAgICAgICBjdXN0b206IHtcbiAgICAgICAgICBwcm9wZXJ0aWVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3BlcnR5OiBcInJlc291cmNlXCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBtb2xsaWVPcmRlci5yZXNvdXJjZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3BlcnR5OiBcInJlc291cmNlX2lkXCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBtb2xsaWVPcmRlci5pZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3BlcnR5OiBcIm1vZGVcIixcbiAgICAgICAgICAgICAgdmFsdWU6IG1vbGxpZU9yZGVyLm1vZGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm9wZXJ0eTogXCJtZXRob2RcIixcbiAgICAgICAgICAgICAgdmFsdWU6IG1vbGxpZU9yZGVyLm1ldGhvZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3BlcnR5OiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICB2YWx1ZTogbW9sbGllT3JkZXIuc3RhdHVzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvcGVydHk6IFwicHJvZmlsZUlkXCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBtb2xsaWVPcmRlci5wcm9maWxlSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm9wZXJ0eTogXCJtYW5kYXRlSWRcIixcbiAgICAgICAgICAgICAgdmFsdWU6IG1vbGxpZU9yZGVyLm1hbmRhdGVJZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3BlcnR5OiBcImN1c3RvbWVySWRcIixcbiAgICAgICAgICAgICAgdmFsdWU6IG1vbGxpZU9yZGVyLmN1c3RvbWVySWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm9wZXJ0eTogXCJzZXF1ZW5jZVR5cGVcIixcbiAgICAgICAgICAgICAgdmFsdWU6IG1vbGxpZU9yZGVyLnNlcXVlbmNlVHlwZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfTtcbn07XG4iLCJjb25zdCBpbnZhcmlhbnQgPSByZXF1aXJlKFwiaW52YXJpYW50XCIpO1xuXG5jb25zdCBNT0xMSUVfQVBJX0tFWSA9IHByb2Nlc3MuZW52Lk1PTExJRV9BUElfS0VZO1xuXG5sZXQgY2xpZW50O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsaWVudDogKCkgPT4ge1xuICAgIGludmFyaWFudChNT0xMSUVfQVBJX0tFWSwgXCJwcm9jZXNzLmVudi5NT0xMSUVfQVBJX0tFWSBpcyBub3QgZGVmaW5lZFwiKTtcblxuICAgIGlmICghY2xpZW50KSB7XG4gICAgICBjb25zdCB7IGNyZWF0ZU1vbGxpZUNsaWVudCB9ID0gcmVxdWlyZShcIkBtb2xsaWUvYXBpLWNsaWVudFwiKTtcbiAgICAgIGNsaWVudCA9IGNyZWF0ZU1vbGxpZUNsaWVudCh7IGFwaUtleTogcHJvY2Vzcy5lbnYuTU9MTElFX0FQSV9LRVkgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfSxcbn07XG4iLCJhc3luYyBmdW5jdGlvbiBjb25maXJtUGF5cGFsUGF5bWVudCh7IGNoZWNrb3V0TW9kZWwsIG9yZGVySWQsIGNvbnRleHQgfSkge1xuICBjb25zdCBjaGVja291dE5vZGVKc3NkayA9IHJlcXVpcmUoXCJAcGF5cGFsL2NoZWNrb3V0LXNlcnZlci1zZGtcIik7XG4gIFxuICBjb25zdCBjcnlzdGFsbGl6ZSA9IHJlcXVpcmUoXCIuLi8uLi9jcnlzdGFsbGl6ZVwiKTtcbiAgY29uc3QgYmFza2V0U2VydmljZSA9IHJlcXVpcmUoXCIuLi8uLi9iYXNrZXQtc2VydmljZVwiKTtcbiAgY29uc3QgeyBwYXlwYWw6IFBheXBhbENsaWVudCB9ID0gcmVxdWlyZShcIi4vaW5pdC1jbGllbnRcIik7XG4gIGNvbnN0IHRvQ3J5c3RhbGxpemVPcmRlck1vZGVsID0gcmVxdWlyZShcIi4vdG8tY3J5c3RhbGxpemUtb3JkZXItbW9kZWxcIik7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IGJhc2tldE1vZGVsIH0gPSBjaGVja291dE1vZGVsO1xuICAgIGNvbnN0IGJhc2tldCA9IGF3YWl0IGJhc2tldFNlcnZpY2UuZ2V0KHsgYmFza2V0TW9kZWwsIGNvbnRleHQgfSk7XG4gIFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUGF5cGFsQ2xpZW50KCkuZXhlY3V0ZShcbiAgICAgIG5ldyBjaGVja291dE5vZGVKc3Nkay5vcmRlcnMuT3JkZXJzR2V0UmVxdWVzdChvcmRlcklkKVxuICAgICk7XG5cbiAgICBjb25zdCBvcmRlciA9IGF3YWl0IGNyeXN0YWxsaXplLm9yZGVycy5jcmVhdGUoXG4gICAgICB0b0NyeXN0YWxsaXplT3JkZXJNb2RlbChiYXNrZXQsIHJlc3BvbnNlLnJlc3VsdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBvcmRlcklkOiBvcmRlci5pZCxcbiAgICB9O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH1cbiAgXG4gIHJldHVybiB7XG4gICAgc3VjY2VzczogZmFsc2VcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25maXJtUGF5cGFsUGF5bWVudDtcbiIsIlxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGF5cGFsUGF5bWVudCh7IGNoZWNrb3V0TW9kZWwsIGNvbnRleHQgfSkge1xuICBjb25zdCBwYXlwYWwgPSByZXF1aXJlKFwiQHBheXBhbC9jaGVja291dC1zZXJ2ZXItc2RrXCIpO1xuXG4gIGNvbnN0IHsgcGF5cGFsOiBQYXlwYWxDbGllbnQgfSA9IHJlcXVpcmUoXCIuL2luaXQtY2xpZW50XCIpO1xuICBjb25zdCBiYXNrZXRTZXJ2aWNlID0gcmVxdWlyZShcIi4uLy4uL2Jhc2tldC1zZXJ2aWNlXCIpO1xuXG4gIGNvbnN0IHsgYmFza2V0TW9kZWwgfSA9IGNoZWNrb3V0TW9kZWw7XG5cbiAgLy8gR2V0IGEgdmVyaWZpZWQgYmFza2V0IGZyb20gdGhlIGJhc2tldCBzZXJ2aWNlXG4gIGNvbnN0IGJhc2tldCA9IGF3YWl0IGJhc2tldFNlcnZpY2UuZ2V0KHsgYmFza2V0TW9kZWwsIGNvbnRleHQgfSk7XG5cbiAgY29uc3QgcmVxdWVzdCA9IG5ldyBwYXlwYWwub3JkZXJzLk9yZGVyc0NyZWF0ZVJlcXVlc3QoKTtcbiAgXG4gIC8vIEdldCB0aGUgY29tcGxldGUgcmVzb3VyY2UgcmVwcmVzZW50YXRpb25cbiAgcmVxdWVzdC5wcmVmZXIoXCJyZXR1cm49cmVwcmVzZW50YXRpb25cIik7XG4gIFxuICByZXF1ZXN0LnJlcXVlc3RCb2R5KHtcbiAgICBpbnRlbnQ6IFwiQ0FQVFVSRVwiLFxuICAgIHB1cmNoYXNlX3VuaXRzOiBbXG4gICAgICB7XG4gICAgICAgIGFtb3VudDoge1xuICAgICAgICAgIGN1cnJlbmN5X2NvZGU6IGJhc2tldC50b3RhbC5jdXJyZW5jeSxcbiAgICAgICAgICB2YWx1ZTogYmFza2V0LnRvdGFsLmdyb3NzLnRvU3RyaW5nKCksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0pO1xuXG4gIGxldCBvcmRlcjtcbiAgdHJ5IHtcbiAgICBvcmRlciA9IGF3YWl0IFBheXBhbENsaWVudCgpLmV4ZWN1dGUocmVxdWVzdCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdWNjZXNzOiB0cnVlLFxuICAgIG9yZGVySWQ6IG9yZGVyLnJlc3VsdC5pZCxcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVQYXlwYWxQYXltZW50O1xuIiwiY29uc3QgY3JlYXRlUGF5cGFsUGF5bWVudCA9IHJlcXVpcmUoXCIuL2NyZWF0ZS1wYXltZW50XCIpO1xuY29uc3QgY29uZmlybVBheXBhbFBheW1lbnQgPSByZXF1aXJlKFwiLi9jb25maXJtLXBheW1lbnRcIik7XG5cbmNvbnN0IFBBWVBBTF9DTElFTlRfSUQgPSBwcm9jZXNzLmVudi5QQVlQQUxfQ0xJRU5UX0lEO1xuY29uc3QgUEFZUEFMX0NMSUVOVF9TRUNSRVQgPSBwcm9jZXNzLmVudi5QQVlQQUxfQ0xJRU5UX1NFQ1JFVDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVuYWJsZWQ6IEJvb2xlYW4oUEFZUEFMX0NMSUVOVF9JRCAmJiBQQVlQQUxfQ0xJRU5UX1NFQ1JFVCksXG4gIGZyb250ZW5kQ29uZmlnOiB7XG4gICAgY2xpZW50SWQ6IFBBWVBBTF9DTElFTlRfSUQsXG4gICAgY3VycmVuY3k6IFwiXCIsXG4gIH0sXG4gIGNyZWF0ZVBheXBhbFBheW1lbnQsXG4gIGNvbmZpcm1QYXlwYWxQYXltZW50LFxufTtcbiIsImZ1bmN0aW9uIGdldENsaWVudCgpIHtcbiAgY29uc3QgY2hlY2tvdXROb2RlSnNzZGsgPSByZXF1aXJlKFwiQHBheXBhbC9jaGVja291dC1zZXJ2ZXItc2RrXCIpO1xuXG4gIGNvbnN0IGNsaWVudElkID0gcHJvY2Vzcy5lbnYuUEFZUEFMX0NMSUVOVF9JRCB8fCBcIlBBWVBBTC1TQU5EQk9YLUNMSUVOVC1JRFwiO1xuICBjb25zdCBjbGllbnRTZWNyZXQgPVxuICAgIHByb2Nlc3MuZW52LlBBWVBBTF9DTElFTlRfU0VDUkVUIHx8IFwiUEFZUEFMLVNBTkRCT1gtQ0xJRU5ULVNFQ1JFVFwiO1xuXG4gIC8vIGNvbnN0IGNsaWVudEVudiA9XG4gIC8vICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiXG4gIC8vICAgICA/IG5ldyBjaGVja291dE5vZGVKc3Nkay5jb3JlLkxpdmVFbnZpcm9ubWVudChjbGllbnRJZCwgY2xpZW50U2VjcmV0KVxuICAvLyAgICAgOiBuZXcgY2hlY2tvdXROb2RlSnNzZGsuY29yZS5TYW5kYm94RW52aXJvbm1lbnQoY2xpZW50SWQsIGNsaWVudFNlY3JldCk7XG5cbiAgY29uc3QgY2xpZW50RW52ID0gbmV3IGNoZWNrb3V0Tm9kZUpzc2RrLmNvcmUuU2FuZGJveEVudmlyb25tZW50KFxuICAgIGNsaWVudElkLFxuICAgIGNsaWVudFNlY3JldFxuICApO1xuXG4gIHJldHVybiBuZXcgY2hlY2tvdXROb2RlSnNzZGsuY29yZS5QYXlQYWxIdHRwQ2xpZW50KGNsaWVudEVudik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBwYXlwYWw6IGdldENsaWVudCB9O1xuIiwiZnVuY3Rpb24gdG9DcnlzdGFsbGl6ZU9yZGVyTW9kZWwoYmFza2V0LCBvcmRlcikge1xuICBjb25zdCB7IHBheWVyLCBwdXJjaGFzZV91bml0cyB9ID0gb3JkZXI7XG4gIGNvbnN0IHsgc2hpcHBpbmcgfSA9IHB1cmNoYXNlX3VuaXRzWzBdO1xuICBjb25zdCB7IGFkZHJlc3MgfSA9IHNoaXBwaW5nO1xuICBjb25zdCBvcmRlcklkID0gb3JkZXIuaWQ7XG5cbiAgLyoqXG4gICAqIFVzZSBlbWFpbCBvciBwYXllciBpZCBhcyB0aGUgY3VzdG9tZXIgaWRlbnRpZmllciBpbiBDcnlzdGFsbGl6ZS5cbiAgICovXG4gIGNvbnN0IGlkZW50aWZpZXIgPSBvcmRlci5wYXllci5lbWFpbF9hZGRyZXNzIHx8IG9yZGVyLnBheWVyLnBheWVyX2lkO1xuXG4gIHJldHVybiB7XG4gICAgY2FydDogYmFza2V0LmNhcnQsXG4gICAgdG90YWw6IGJhc2tldC50b3RhbCxcbiAgICBwYXltZW50OiBbXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGVyOiBcInBheXBhbFwiLFxuICAgICAgICBwYXlwYWw6IHtcbiAgICAgICAgICBvcmRlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICAgIG1ldGE6IFtcbiAgICAgIHtcbiAgICAgICAga2V5OiBcIlBBWVBBTF9PUkRFUl9TVEFUVVNcIixcbiAgICAgICAgdmFsdWU6IG9yZGVyLnN0YXR1cyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBjdXN0b21lcjoge1xuICAgICAgaWRlbnRpZmllcixcbiAgICAgIGZpcnN0TmFtZTogcGF5ZXI/Lm5hbWU/LmdpdmVuX25hbWUgfHwgXCJcIixcbiAgICAgIG1pZGRsZU5hbWU6IFwiXCIsXG4gICAgICBsYXN0TmFtZTogcGF5ZXI/Lm5hbWU/LnN1cm5hbWUgfHwgXCJcIixcbiAgICAgIGFkZHJlc3NlczogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogXCJkZWxpdmVyeVwiLFxuICAgICAgICAgIGZpcnN0TmFtZTogcGF5ZXI/Lm5hbWU/LmdpdmVuX25hbWUgfHwgXCJcIixcbiAgICAgICAgICBtaWRkbGVOYW1lOiBcIlwiLFxuICAgICAgICAgIGxhc3ROYW1lOiBwYXllcj8ubmFtZT8uc3VybmFtZSB8fCBcIlwiLFxuICAgICAgICAgIHN0cmVldDogYWRkcmVzcz8uYWRkcmVzc19saW5lXzEsXG4gICAgICAgICAgc3RyZWV0MjogXCJcIixcbiAgICAgICAgICBwb3N0YWxDb2RlOiBhZGRyZXNzPy5wb3N0YWxfY29kZSB8fCBcIlwiLFxuICAgICAgICAgIGNpdHk6IGFkZHJlc3M/LmFkbWluX2FyZWFfMiB8fCBcIlwiLFxuICAgICAgICAgIHN0YXRlOiBhZGRyZXNzPy5hZG1pbl9hcmVhXzEgfHwgXCJcIixcbiAgICAgICAgICBjb3VudHJ5OiBhZGRyZXNzPy5jb3VudHJ5X2NvZGUgfHwgXCJcIixcbiAgICAgICAgICBwaG9uZTogXCJcIixcbiAgICAgICAgICBlbWFpbDogcGF5ZXI/LmVtYWlsX2FkZHJlc3MgfHwgXCJcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b0NyeXN0YWxsaXplT3JkZXJNb2RlbDtcbiIsIm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gY29uZmlybU9yZGVyKHtcbiAgcGF5bWVudEludGVudElkLFxuICBjaGVja291dE1vZGVsLFxuICBjb250ZXh0LFxufSkge1xuICBjb25zdCBjcnlzdGFsbGl6ZSA9IHJlcXVpcmUoXCIuLi8uLi9jcnlzdGFsbGl6ZVwiKTtcbiAgY29uc3QgYmFza2V0U2VydmljZSA9IHJlcXVpcmUoXCIuLi8uLi9iYXNrZXQtc2VydmljZVwiKTtcblxuICBjb25zdCB0b0NyeXN0YWxsaXplT3JkZXJNb2RlbCA9IHJlcXVpcmUoXCIuL3RvLWNyeXN0YWxsaXplLW9yZGVyLW1vZGVsXCIpO1xuXG4gIGNvbnN0IHsgYmFza2V0TW9kZWwgfSA9IGNoZWNrb3V0TW9kZWw7XG4gIGNvbnN0IHsgdXNlciB9ID0gY29udGV4dDtcblxuICBjb25zdCBiYXNrZXQgPSBhd2FpdCBiYXNrZXRTZXJ2aWNlLmdldCh7IGJhc2tldE1vZGVsLCBjb250ZXh0IH0pO1xuXG4gIC8vIFByZXBhcmUgYSB2YWxpZCBtb2RlbCBmb3IgQ3J5c3RhbGxpemUgb3JkZXIgaW50YWtlXG4gIGNvbnN0IGNyeXN0YWxsaXplT3JkZXJNb2RlbCA9IGF3YWl0IHRvQ3J5c3RhbGxpemVPcmRlck1vZGVsKHtcbiAgICBiYXNrZXQsXG4gICAgY2hlY2tvdXRNb2RlbCxcbiAgICBwYXltZW50SW50ZW50SWQsXG4gICAgY3VzdG9tZXJJZGVudGlmaWVyOlxuICAgICAgdXNlcj8uZW1haWwgfHwgY2hlY2tvdXRNb2RlbD8uY3VzdG9tZXI/LmFkZHJlc3Nlcz8uWzBdPy5lbWFpbCB8fCBcIlwiLFxuICB9KTtcblxuICAvKipcbiAgICogUmVjb3JkIHRoZSBvcmRlciBpbiBDcnlzdGFsbGl6ZVxuICAgKiBNYW5hZ2UgdGhlIG9yZGVyIGxpZmVjeWNsZSBieSB1c2luZyB0aGUgZnVsZmlsbWVudCBwaXBlbGluZXM6XG4gICAqIGh0dHBzOi8vY3J5c3RhbGxpemUuY29tL2xlYXJuL3VzZXItZ3VpZGVzL29yZGVycy1hbmQtZnVsZmlsbWVudFxuICAgKi9cbiAgY29uc3Qgb3JkZXIgPSBhd2FpdCBjcnlzdGFsbGl6ZS5vcmRlcnMuY3JlYXRlKGNyeXN0YWxsaXplT3JkZXJNb2RlbCk7XG5cbiAgcmV0dXJuIHtcbiAgICBzdWNjZXNzOiB0cnVlLFxuICAgIG9yZGVySWQ6IG9yZGVyLmlkLFxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGF5bWVudEludGVudCh7XG4gIGNoZWNrb3V0TW9kZWwsXG4gIGNvbmZpcm0gPSBmYWxzZSxcbiAgcGF5bWVudE1ldGhvZElkLFxuICBjb250ZXh0LFxufSkge1xuICBjb25zdCBiYXNrZXRTZXJ2aWNlID0gcmVxdWlyZShcIi4uLy4uL2Jhc2tldC1zZXJ2aWNlXCIpO1xuICBjb25zdCB7IGdldENsaWVudCB9ID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbiAgY29uc3QgeyBiYXNrZXRNb2RlbCB9ID0gY2hlY2tvdXRNb2RlbDtcblxuICBjb25zdCBiYXNrZXQgPSBhd2FpdCBiYXNrZXRTZXJ2aWNlLmdldCh7IGJhc2tldE1vZGVsLCBjb250ZXh0IH0pO1xuXG4gIGNvbnN0IHBheW1lbnRJbnRlbnQgPSBhd2FpdCBnZXRDbGllbnQoKS5wYXltZW50SW50ZW50cy5jcmVhdGUoe1xuICAgIGFtb3VudDogYmFza2V0LnRvdGFsLmdyb3NzICogMTAwLFxuICAgIGN1cnJlbmN5OiBiYXNrZXQudG90YWwuY3VycmVuY3ksXG4gICAgY29uZmlybSxcbiAgICBwYXltZW50X21ldGhvZDogcGF5bWVudE1ldGhvZElkLFxuICB9KTtcblxuICByZXR1cm4gcGF5bWVudEludGVudDtcbn07XG4iLCJjb25zdCBjcmVhdGVQYXltZW50SW50ZW50ID0gcmVxdWlyZShcIi4vY3JlYXRlLXBheW1lbnQtaW50ZW50XCIpO1xuY29uc3QgY29uZmlybU9yZGVyID0gcmVxdWlyZShcIi4vY29uZmlybS1vcmRlclwiKTtcblxuY29uc3QgU1RSSVBFX1NFQ1JFVF9LRVkgPSBwcm9jZXNzLmVudi5TVFJJUEVfU0VDUkVUX0tFWTtcbmNvbnN0IFNUUklQRV9QVUJMSVNIQUJMRV9LRVkgPSBwcm9jZXNzLmVudi5TVFJJUEVfUFVCTElTSEFCTEVfS0VZO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW5hYmxlZDogQm9vbGVhbihTVFJJUEVfU0VDUkVUX0tFWSAmJiBTVFJJUEVfUFVCTElTSEFCTEVfS0VZKSxcblxuICAvLyBUaGUgcmVxdWlyZWQgZnJvbnRlbmQgY29uZmlnXG4gIGZyb250ZW5kQ29uZmlnOiB7XG4gICAgcHVibGlzaGFibGVLZXk6IFNUUklQRV9QVUJMSVNIQUJMRV9LRVksXG4gIH0sXG4gIGNyZWF0ZVBheW1lbnRJbnRlbnQsXG4gIGNvbmZpcm1PcmRlcixcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIHN0cmlwZVRvQ3J5c3RhbGxpemVPcmRlck1vZGVsKHtcbiAgYmFza2V0LFxuICBjaGVja291dE1vZGVsLFxuICBwYXltZW50SW50ZW50SWQsXG4gIGN1c3RvbWVySWRlbnRpZmllcixcbn0pIHtcbiAgY29uc3QgeyBnZXRDbGllbnQgfSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuXG4gIGNvbnN0IHBheW1lbnRJbnRlbnQgPSBhd2FpdCBnZXRDbGllbnQoKS5wYXltZW50SW50ZW50cy5yZXRyaWV2ZShcbiAgICBwYXltZW50SW50ZW50SWRcbiAgKTtcblxuICBjb25zdCB7IGRhdGEgfSA9IHBheW1lbnRJbnRlbnQuY2hhcmdlcztcbiAgY29uc3QgY2hhcmdlID0gZGF0YVswXTtcblxuICBjb25zdCBjdXN0b21lck5hbWUgPSBjaGFyZ2UuYmlsbGluZ19kZXRhaWxzLm5hbWUuc3BsaXQoXCIgXCIpO1xuICBsZXQgZW1haWwgPSBjaGFyZ2UucmVjZWlwdF9lbWFpbDtcbiAgaWYgKCFlbWFpbCAmJiBjaGVja291dE1vZGVsLmN1c3RvbWVyICYmIGNoZWNrb3V0TW9kZWwuY3VzdG9tZXIuYWRkcmVzc2VzKSB7XG4gICAgY29uc3QgYWRkcmVzc1dpdGhFbWFpbCA9IGNoZWNrb3V0TW9kZWwuY3VzdG9tZXIuYWRkcmVzc2VzLmZpbmQoXG4gICAgICAoYSkgPT4gISFhLmVtYWlsXG4gICAgKTtcbiAgICBpZiAoYWRkcmVzc1dpdGhFbWFpbCkge1xuICAgICAgZW1haWwgPSBhZGRyZXNzV2l0aEVtYWlsLmVtYWlsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1ldGEgPSBbXTtcbiAgaWYgKHBheW1lbnRJbnRlbnQubWVyY2hhbnRfZGF0YSkge1xuICAgIG1ldGEucHVzaCh7XG4gICAgICBrZXk6IFwic3RyaXBlTWVyY2hhbnREYXRhXCIsXG4gICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkocGF5bWVudEludGVudC5tZXJjaGFudF9kYXRhKSxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2FydDogYmFza2V0LmNhcnQsXG4gICAgdG90YWw6IGJhc2tldC50b3RhbCxcbiAgICBtZXRhLFxuICAgIGN1c3RvbWVyOiB7XG4gICAgICBpZGVudGlmaWVyOiBjdXN0b21lcklkZW50aWZpZXIsXG4gICAgICBmaXJzdE5hbWU6IGN1c3RvbWVyTmFtZVswXSxcbiAgICAgIG1pZGRsZU5hbWU6IGN1c3RvbWVyTmFtZS5zbGljZSgxLCBjdXN0b21lck5hbWUubGVuZ3RoIC0gMSkuam9pbigpLFxuICAgICAgbGFzdE5hbWU6IGN1c3RvbWVyTmFtZVtjdXN0b21lck5hbWUubGVuZ3RoIC0gMV0sXG4gICAgICBiaXJ0aERhdGU6IERhdGUsXG4gICAgICBhZGRyZXNzZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwiYmlsbGluZ1wiLFxuICAgICAgICAgIGZpcnN0TmFtZTogY3VzdG9tZXJOYW1lWzBdLFxuICAgICAgICAgIG1pZGRsZU5hbWU6IGN1c3RvbWVyTmFtZS5zbGljZSgxLCBjdXN0b21lck5hbWUubGVuZ3RoIC0gMSkuam9pbigpLFxuICAgICAgICAgIGxhc3ROYW1lOiBjdXN0b21lck5hbWVbY3VzdG9tZXJOYW1lLmxlbmd0aCAtIDFdLFxuICAgICAgICAgIHN0cmVldDogY2hhcmdlLmJpbGxpbmdfZGV0YWlscy5hZGRyZXNzLmxpbmUxLFxuICAgICAgICAgIHN0cmVldDI6IGNoYXJnZS5iaWxsaW5nX2RldGFpbHMuYWRkcmVzcy5saW5lMixcbiAgICAgICAgICBwb3N0YWxDb2RlOiBjaGFyZ2UuYmlsbGluZ19kZXRhaWxzLmFkZHJlc3MucG9zdGFsX2NvZGUsXG4gICAgICAgICAgY2l0eTogY2hhcmdlLmJpbGxpbmdfZGV0YWlscy5hZGRyZXNzLmNpdHksXG4gICAgICAgICAgc3RhdGU6IGNoYXJnZS5iaWxsaW5nX2RldGFpbHMuYWRkcmVzcy5zdGF0ZSxcbiAgICAgICAgICBjb3VudHJ5OiBjaGFyZ2UuYmlsbGluZ19kZXRhaWxzLmFkZHJlc3MuY291bnRyeSxcbiAgICAgICAgICBwaG9uZTogY2hhcmdlLmJpbGxpbmdfZGV0YWlscy5waG9uZSxcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwiZGVsaXZlcnlcIixcbiAgICAgICAgICBmaXJzdE5hbWU6IGN1c3RvbWVyTmFtZVswXSxcbiAgICAgICAgICBtaWRkbGVOYW1lOiBjdXN0b21lck5hbWUuc2xpY2UoMSwgY3VzdG9tZXJOYW1lLmxlbmd0aCAtIDEpLmpvaW4oKSxcbiAgICAgICAgICBsYXN0TmFtZTogY3VzdG9tZXJOYW1lW2N1c3RvbWVyTmFtZS5sZW5ndGggLSAxXSxcbiAgICAgICAgICBzdHJlZXQ6IGNoYXJnZS5iaWxsaW5nX2RldGFpbHMuYWRkcmVzcy5saW5lMSxcbiAgICAgICAgICBzdHJlZXQyOiBjaGFyZ2UuYmlsbGluZ19kZXRhaWxzLmFkZHJlc3MubGluZTIsXG4gICAgICAgICAgcG9zdGFsQ29kZTogY2hhcmdlLmJpbGxpbmdfZGV0YWlscy5hZGRyZXNzLnBvc3RhbF9jb2RlLFxuICAgICAgICAgIGNpdHk6IGNoYXJnZS5iaWxsaW5nX2RldGFpbHMuYWRkcmVzcy5jaXR5LFxuICAgICAgICAgIHN0YXRlOiBjaGFyZ2UuYmlsbGluZ19kZXRhaWxzLmFkZHJlc3Muc3RhdGUsXG4gICAgICAgICAgY291bnRyeTogY2hhcmdlLmJpbGxpbmdfZGV0YWlscy5hZGRyZXNzLmNvdW50cnksXG4gICAgICAgICAgcGhvbmU6IGNoYXJnZS5iaWxsaW5nX2RldGFpbHMucGhvbmUsXG4gICAgICAgICAgZW1haWwsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgcGF5bWVudDogW1xuICAgICAge1xuICAgICAgICBwcm92aWRlcjogXCJzdHJpcGVcIixcbiAgICAgICAgc3RyaXBlOiB7XG4gICAgICAgICAgc3RyaXBlOiBjaGFyZ2UuaWQsXG4gICAgICAgICAgY3VzdG9tZXJJZDogY2hhcmdlLmN1c3RvbWVyLFxuICAgICAgICAgIG9yZGVySWQ6IGNoYXJnZS5wYXltZW50X2ludGVudCxcbiAgICAgICAgICBwYXltZW50TWV0aG9kOiBjaGFyZ2UucGF5bWVudF9tZXRob2RfZGV0YWlscy50eXBlLFxuICAgICAgICAgIHBheW1lbnRNZXRob2RJZDogY2hhcmdlLnBheW1lbnRfbWV0aG9kLFxuICAgICAgICAgIHBheW1lbnRJbnRlbnRJZDogY2hhcmdlLnBheW1lbnRfaW50ZW50LFxuICAgICAgICAgIHN1YnNjcmlwdGlvbklkOiBjaGFyZ2Uuc3Vic2NyaXB0aW9uLFxuICAgICAgICAgIG1ldGFkYXRhOiBcIlwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xufTtcbiIsImNvbnN0IGludmFyaWFudCA9IHJlcXVpcmUoXCJpbnZhcmlhbnRcIik7XG5cbmNvbnN0IFNUUklQRV9TRUNSRVRfS0VZID0gcHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVk7XG5cbmxldCBjbGllbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xpZW50OiAoKSA9PiB7XG4gICAgaW52YXJpYW50KFxuICAgICAgU1RSSVBFX1NFQ1JFVF9LRVksXG4gICAgICBcInByb2Nlc3MuZW52LlNUUklQRV9TRUNSRVRfS0VZIGlzIG5vdCBkZWZpbmVkXCJcbiAgICApO1xuXG4gICAgaWYgKCFjbGllbnQpIHtcbiAgICAgIGNvbnN0IHN0cmlwZVNkayA9IHJlcXVpcmUoXCJzdHJpcGVcIik7XG4gICAgICBjbGllbnQgPSBzdHJpcGVTZGsoU1RSSVBFX1NFQ1JFVF9LRVkpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiB2aXBwc0ZhbGxiYWNrKHtcbiAgY3J5c3RhbGxpemVPcmRlcklkLFxuICBvblN1Y2Nlc3NVUkwsXG4gIG9uRXJyb3JVUkwsXG59KSB7XG4gIGNvbnN0IGNyeXN0YWxsaXplID0gcmVxdWlyZShcIi4uLy4uL2NyeXN0YWxsaXplXCIpO1xuXG4gIGNvbnN0IHsgZ2V0Q2xpZW50IH0gPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxuICBsZXQgcmVkaXJlY3RUbyA9IFwiXCI7XG5cbiAgY29uc3QgdmlwcHNDbGllbnQgPSBhd2FpdCBnZXRDbGllbnQoKTtcblxuICAvLyBSZXRyaWV2ZSB0aGUgVmlwcHMgb3JkZXIgdG8gZ2V0IHRyYW5zYWN0aW9uIGRldGFpbHNcbiAgY29uc3Qgb3JkZXIgPSBhd2FpdCB2aXBwc0NsaWVudC5nZXRPcmRlckRldGFpbHMoe1xuICAgIG9yZGVySWQ6IGNyeXN0YWxsaXplT3JkZXJJZCxcbiAgfSk7XG4gIGNvbnN0IFtsYXN0VHJhbnNhY3Rpb25Mb2dFbnRyeV0gPSBvcmRlci50cmFuc2FjdGlvbkxvZ0hpc3Rvcnkuc29ydChcbiAgICAoYSwgYikgPT4gbmV3IERhdGUoYi50aW1lU3RhbXApIC0gbmV3IERhdGUoYS50aW1lU3RhbXApXG4gICk7XG5cbiAgLyoqXG4gICAqIElmIHRoZSB0cmFuc2FjdGlvbiBsb2dzIGxhc3QgZW50cnkgaGFzIHN0YXR1c1xuICAgKiBSRVNFUlZFLCB0aGVuIHRoZSBhbW91bnQgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5XG4gICAqIHJlc2VydmVkIG9uIHRoZSB1c2VyIGFjY291bnQsIGFuZCB3ZSBjYW4gc2hvd1xuICAgKiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICovXG4gIGlmIChcbiAgICBsYXN0VHJhbnNhY3Rpb25Mb2dFbnRyeS5vcGVyYXRpb24gPT09IFwiUkVTRVJWRVwiICYmXG4gICAgbGFzdFRyYW5zYWN0aW9uTG9nRW50cnkub3BlcmF0aW9uU3VjY2Vzc1xuICApIHtcbiAgICByZWRpcmVjdFRvID0gb25TdWNjZXNzVVJMO1xuXG4gICAgLyoqXG4gICAgICogQXQgdGhpcyBwb2ludCB3ZSBoYXZlIHVzZXIgZGV0YWlscyBmcm9tIFZpcHBzLCB3aGljaFxuICAgICAqIG1ha2VzIGl0IGEgZ29vZCB0aW1lIHRvIHVwZGF0ZSB0aGUgQ3J5c3RhbGxpemUgb3JkZXJcbiAgICAgKi9cbiAgICBjb25zdCB7XG4gICAgICB1c2VyRGV0YWlsczoge1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGZpcnN0TmFtZSxcbiAgICAgICAgbGFzdE5hbWUsXG4gICAgICAgIGVtYWlsLFxuICAgICAgICBtb2JpbGVOdW1iZXI6IHBob25lLFxuICAgICAgfSA9IHt9LFxuICAgICAgc2hpcHBpbmdEZXRhaWxzOiB7XG4gICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICBhZGRyZXNzTGluZTE6IHN0cmVldCxcbiAgICAgICAgICBhZGRyZXNzTGluZTI6IHN0cmVldDIsXG4gICAgICAgICAgcG9zdENvZGU6IHBvc3RhbENvZGUsXG4gICAgICAgICAgY2l0eSxcbiAgICAgICAgICBjb3VudHJ5LFxuICAgICAgICB9ID0ge30sXG4gICAgICB9ID0ge30sXG4gICAgfSA9IG9yZGVyO1xuXG4gICAgYXdhaXQgY3J5c3RhbGxpemUub3JkZXJzLnVwZGF0ZShjcnlzdGFsbGl6ZU9yZGVySWQsIHtcbiAgICAgIHBheW1lbnQ6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGVyOiBcImN1c3RvbVwiLFxuICAgICAgICAgIGN1c3RvbToge1xuICAgICAgICAgICAgcHJvcGVydGllczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IFwiUGF5bWVudFByb3ZpZGVyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiVmlwcHNcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBcIlZpcHBzIG9yZGVySWRcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogY3J5c3RhbGxpemVPcmRlcklkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IFwiVmlwcHMgdXNlcklkXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHVzZXJJZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBjdXN0b21lcjoge1xuICAgICAgICBpZGVudGlmaWVyOiBlbWFpbCxcbiAgICAgICAgZmlyc3ROYW1lLFxuICAgICAgICBsYXN0TmFtZSxcbiAgICAgICAgYWRkcmVzc2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJkZWxpdmVyeVwiLFxuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICBmaXJzdE5hbWUsXG4gICAgICAgICAgICBsYXN0TmFtZSxcbiAgICAgICAgICAgIHBob25lLFxuICAgICAgICAgICAgc3RyZWV0LFxuICAgICAgICAgICAgc3RyZWV0MixcbiAgICAgICAgICAgIHBvc3RhbENvZGUsXG4gICAgICAgICAgICBjaXR5LFxuICAgICAgICAgICAgY291bnRyeSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZWRpcmVjdFRvID0gb25FcnJvclVSTDtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShsYXN0VHJhbnNhY3Rpb25Mb2dFbnRyeSwgbnVsbCwgMikpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZWRpcmVjdFRvLFxuICB9O1xufTtcbiIsIi8qKlxuICogVmlwcHMgKGh0dHBzOi8vdmlwcHMubm8pXG4gKlxuICogR2V0dGluZyBzdGFydGVkOlxuICogaHR0cHM6Ly9jcnlzdGFsbGl6ZS5jb20vbGVhcm4vb3Blbi1zb3VyY2UvcGF5bWVudC1nYXRld2F5cy92aXBwc1xuICovXG5cbmNvbnN0IFZJUFBTX0NMSUVOVF9JRCA9IHByb2Nlc3MuZW52LlZJUFBTX0NMSUVOVF9JRDtcbmNvbnN0IFZJUFBTX0NMSUVOVF9TRUNSRVQgPSBwcm9jZXNzLmVudi5WSVBQU19DTElFTlRfU0VDUkVUO1xuY29uc3QgVklQUFNfTUVSQ0hBTlRfU0VSSUFMID0gcHJvY2Vzcy5lbnYuVklQUFNfTUVSQ0hBTlRfU0VSSUFMO1xuY29uc3QgVklQUFNfU1VCX0tFWSA9IHByb2Nlc3MuZW52LlZJUFBTX1NVQl9LRVk7XG5cbmNvbnN0IGluaXRpYXRlUGF5bWVudCA9IHJlcXVpcmUoXCIuL2luaXRpYXRlLXBheW1lbnRcIik7XG5jb25zdCBmYWxsYmFjayA9IHJlcXVpcmUoXCIuL2ZhbGxiYWNrXCIpO1xuY29uc3Qgb3JkZXJVcGRhdGUgPSByZXF1aXJlKFwiLi9vcmRlci11cGRhdGVcIik7XG5jb25zdCB1c2VyQ29uc2VudFJlbW92YWwgPSByZXF1aXJlKFwiLi91c2VyLWNvbnNlbnQtcmVtb3ZhbFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVuYWJsZWQ6IEJvb2xlYW4oXG4gICAgVklQUFNfQ0xJRU5UX0lEICYmXG4gICAgICBWSVBQU19DTElFTlRfU0VDUkVUICYmXG4gICAgICBWSVBQU19NRVJDSEFOVF9TRVJJQUwgJiZcbiAgICAgIFZJUFBTX1NVQl9LRVlcbiAgKSxcbiAgZnJvbnRlbmRDb25maWc6IHt9LFxuICBpbml0aWF0ZVBheW1lbnQsXG4gIGZhbGxiYWNrLFxuICBvcmRlclVwZGF0ZSxcbiAgdXNlckNvbnNlbnRSZW1vdmFsLFxufTtcbiIsImNvbnN0IGludmFyaWFudCA9IHJlcXVpcmUoXCJpbnZhcmlhbnRcIik7XG5cbmNvbnN0IFZJUFBTX01FUkNIQU5UX1NFUklBTCA9IHByb2Nlc3MuZW52LlZJUFBTX01FUkNIQU5UX1NFUklBTDtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBpbml0aWF0ZVZpcHBzUGF5bWVudCh7XG4gIGNoZWNrb3V0TW9kZWwsXG4gIGNvbnRleHQsXG59KSB7XG4gIGNvbnN0IGJhc2tldFNlcnZpY2UgPSByZXF1aXJlKFwiLi4vLi4vYmFza2V0LXNlcnZpY2VcIik7XG4gIGNvbnN0IGNyeXN0YWxsaXplID0gcmVxdWlyZShcIi4uLy4uL2NyeXN0YWxsaXplXCIpO1xuXG4gIGNvbnN0IHsgZ2V0Q2xpZW50IH0gPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxuICBpbnZhcmlhbnQoXG4gICAgVklQUFNfTUVSQ0hBTlRfU0VSSUFMLFxuICAgIFwicHJvY2Vzcy5lbnYuVklQUFNfTUVSQ0hBTlRfU0VSSUFMIGlzIHVuZGVmaW5lZFwiXG4gICk7XG5cbiAgY29uc3QgeyBiYXNrZXRNb2RlbCwgY3VzdG9tZXIsIGNvbmZpcm1hdGlvblVSTCwgY2hlY2tvdXRVUkwgfSA9IGNoZWNrb3V0TW9kZWw7XG4gIGNvbnN0IHsgc2VydmljZUNhbGxiYWNrSG9zdCwgdXNlciB9ID0gY29udGV4dDtcblxuICAvLyBBZGQgdGhlIGlkZW50aWZpZXIgZnJvbSB0aGUgY3VycmVudCBsb2dnZWQgaW4gdXNlclxuICBjb25zdCBjdXN0b21lcldpdGhDdXJyZW50TG9nZ2VkSW5Vc2VyID0ge1xuICAgIC4uLmN1c3RvbWVyLFxuICB9O1xuICBpZiAodXNlcikge1xuICAgIGN1c3RvbWVyV2l0aEN1cnJlbnRMb2dnZWRJblVzZXIuaWRlbnRpZmllciA9IHVzZXIuZW1haWw7XG4gIH1cblxuICBjb25zdCBiYXNrZXQgPSBhd2FpdCBiYXNrZXRTZXJ2aWNlLmdldCh7IGJhc2tldE1vZGVsLCBjb250ZXh0IH0pO1xuICBjb25zdCB7IHRvdGFsIH0gPSBiYXNrZXQ7XG5cbiAgLyogVXNlIGEgQ3J5c3RhbGxpemUgb3JkZXIgYW5kIHRoZSBmdWxmaWxtZW50IHBpcGVsaW5lcyB0b1xuICAgKiBtYW5hZ2UgdGhlIGxpZmVjeWNsZSBvZiB0aGUgb3JkZXJcbiAgICovXG4gIGNvbnN0IGNyeXN0YWxsaXplT3JkZXIgPSBhd2FpdCBjcnlzdGFsbGl6ZS5vcmRlcnMuY3JlYXRlKHtcbiAgICAuLi5iYXNrZXQsXG4gICAgY3VzdG9tZXI6IGN1c3RvbWVyV2l0aEN1cnJlbnRMb2dnZWRJblVzZXIsXG4gIH0pO1xuICBjb25zdCBjcnlzdGFsbGl6ZU9yZGVySWQgPSBjcnlzdGFsbGl6ZU9yZGVyLmlkO1xuXG4gIC8qKlxuICAgKiBUaGUgVmlwcHMgXCJmYWxsYmFja1wiIHVybCwgaXMgd2hlcmUgdGhlIHVzZXIgd2lsbCBiZSByZWRpcmVjdGVkXG4gICAqIHRvIGFmdGVyIGNvbXBsZXRpbmcgdGhlIFZpcHBzIGNoZWNrb3V0LlxuICAgKi9cbiAgY29uc3QgZmFsbEJhY2tVUkwgPSBuZXcgVVJMKFxuICAgIGAke3NlcnZpY2VDYWxsYmFja0hvc3R9L3dlYmhvb2tzL3BheW1lbnQtcHJvdmlkZXJzL3ZpcHBzL2ZhbGxiYWNrLyR7Y3J5c3RhbGxpemVPcmRlcklkfWBcbiAgKTtcbiAgZmFsbEJhY2tVUkwuc2VhcmNoUGFyYW1zLmFwcGVuZChcbiAgICBcImNvbmZpcm1hdGlvblwiLFxuICAgIGVuY29kZVVSSUNvbXBvbmVudChcbiAgICAgIGNvbmZpcm1hdGlvblVSTC5yZXBsYWNlKFwie2NyeXN0YWxsaXplT3JkZXJJZH1cIiwgY3J5c3RhbGxpemVPcmRlcklkKVxuICAgIClcbiAgKTtcbiAgZmFsbEJhY2tVUkwuc2VhcmNoUGFyYW1zLmFwcGVuZChcImNoZWNrb3V0XCIsIGVuY29kZVVSSUNvbXBvbmVudChjaGVja291dFVSTCkpO1xuXG4gIGNvbnN0IHZpcHBzQ2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KCk7XG5cbiAgY29uc3QgdmlwcHNSZXNwb25zZSA9IGF3YWl0IHZpcHBzQ2xpZW50LmluaXRpYXRlUGF5bWVudCh7XG4gICAgb3JkZXI6IHtcbiAgICAgIG1lcmNoYW50SW5mbzoge1xuICAgICAgICBtZXJjaGFudFNlcmlhbE51bWJlcjogVklQUFNfTUVSQ0hBTlRfU0VSSUFMLFxuICAgICAgICBmYWxsQmFjazogZmFsbEJhY2tVUkwudG9TdHJpbmcoKSxcbiAgICAgICAgY2FsbGJhY2tQcmVmaXg6IGAke3NlcnZpY2VDYWxsYmFja0hvc3R9L3dlYmhvb2tzL3BheW1lbnQtcHJvdmlkZXJzL3ZpcHBzL29yZGVyLXVwZGF0ZWAsXG4gICAgICAgIHNoaXBwaW5nRGV0YWlsc1ByZWZpeDogYCR7c2VydmljZUNhbGxiYWNrSG9zdH0vd2ViaG9va3MvcGF5bWVudC1wcm92aWRlcnMvdmlwcHMvc2hpcHBpbmdgLFxuICAgICAgICBjb25zZW50UmVtb3ZhbFByZWZpeDogYCR7c2VydmljZUNhbGxiYWNrSG9zdH0vd2ViaG9va3MvcGF5bWVudC1wcm92aWRlcnMvdmlwcHMvY29uc3RlbnQtcmVtb3ZhbGAsXG4gICAgICAgIHBheW1lbnRUeXBlOiBcImVDb21tIEV4cHJlc3MgUGF5bWVudFwiLFxuICAgICAgICBpc0FwcDogZmFsc2UsXG4gICAgICAgIHN0YXRpY1NoaXBwaW5nRGV0YWlsczogW1xuICAgICAgICAgIC8vIFByb3ZpZGUgYSBkZWZhdWx0IHNoaXBwaW5nIG1ldGhvZFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlzRGVmYXVsdDogXCJZXCIsXG4gICAgICAgICAgICBwcmlvcml0eTogMCxcbiAgICAgICAgICAgIHNoaXBwaW5nQ29zdDogMCxcbiAgICAgICAgICAgIHNoaXBwaW5nTWV0aG9kOiBcIlBvc3RlbiBTZXJ2aWNlcGFra2VcIixcbiAgICAgICAgICAgIHNoaXBwaW5nTWV0aG9kSWQ6IFwicG9zdGVuLXNlcnZpY2VwYWtrZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgY3VzdG9tZXJJbmZvOiB7fSxcbiAgICAgIHRyYW5zYWN0aW9uOiB7XG4gICAgICAgIG9yZGVySWQ6IGNyeXN0YWxsaXplT3JkZXJJZCxcbiAgICAgICAgYW1vdW50OiBwYXJzZUludCh0b3RhbC5ncm9zcyAqIDEwMCwgMTApLFxuICAgICAgICB0cmFuc2FjdGlvblRleHQ6IFwiQ3J5c3RhbGxpemUgdGVzdCB0cmFuc2FjdGlvblwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgY2hlY2tvdXRMaW5rOiB2aXBwc1Jlc3BvbnNlLnVybCxcbiAgICBjcnlzdGFsbGl6ZU9yZGVySWQsXG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiB2aXBwc09yZGVyVXBkYXRlKHsgY3J5c3RhbGxpemVPcmRlcklkIH0pIHtcbiAgY29uc29sZS5sb2coXCJWSVBQUyBvcmRlciB1cGRhdGVcIik7XG4gIGNvbnNvbGUubG9nKHsgY3J5c3RhbGxpemVPcmRlcklkIH0pO1xuXG4gIC8vIGNvbnN0IHsgZ2V0Q2xpZW50IH0gPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbiAgLy8gY29uc3QgdmlwcHNDbGllbnQgPSBhd2FpdCBnZXRDbGllbnQoKTtcblxuICAvLyBSZXRyaWV2ZSB0aGUgVmlwcHMgb3JkZXIgdHJhbnNhY3Rpb24gZGV0YWlsc1xuICAvLyBjb25zdCBvcmRlciA9IGF3YWl0IHZpcHBzQ2xpZW50LmdldE9yZGVyRGV0YWlscyh7XG4gIC8vICAgb3JkZXJJZDogY3J5c3RhbGxpemVPcmRlcklkLFxuICAvLyB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIHZpcHBzVXNlckNvbnNlbnRSZW1vdmFsKHsgdmlwcHNVc2VySWQgfSkge1xuICAvLyBjb25zdCB7IGdldENsaWVudCB9ID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4gIC8vIGNvbnN0IHZpcHBzQ2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KCk7XG5cbiAgY29uc29sZS5sb2coXCJWSVBQUyB1c2VyIGNvbnNlbnQgcmVtb3ZhbFwiKTtcbiAgY29uc29sZS5sb2coeyB2aXBwc1VzZXJJZCB9KTtcbn07XG4iLCJjb25zdCBpbnZhcmlhbnQgPSByZXF1aXJlKFwiaW52YXJpYW50XCIpO1xuXG5jb25zdCBWSVBQU19DTElFTlRfSUQgPSBwcm9jZXNzLmVudi5WSVBQU19DTElFTlRfSUQ7XG5jb25zdCBWSVBQU19DTElFTlRfU0VDUkVUID0gcHJvY2Vzcy5lbnYuVklQUFNfQ0xJRU5UX1NFQ1JFVDtcbmNvbnN0IFZJUFBTX1NVQl9LRVkgPSBwcm9jZXNzLmVudi5WSVBQU19TVUJfS0VZO1xuXG5sZXQgY2xpZW50O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsaWVudDogKCkgPT4ge1xuICAgIGludmFyaWFudChWSVBQU19DTElFTlRfSUQsIFwicHJvY2Vzcy5lbnYuVklQUFNfQ0xJRU5UX0lEIGlzIG5vdCBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChcbiAgICAgIFZJUFBTX0NMSUVOVF9TRUNSRVQsXG4gICAgICBcInByb2Nlc3MuZW52LlZJUFBTX0NMSUVOVF9TRUNSRVQgaXMgbm90IGRlZmluZWRcIlxuICAgICk7XG4gICAgaW52YXJpYW50KFZJUFBTX1NVQl9LRVksIFwicHJvY2Vzcy5lbnYuVklQUFNfU1VCX0tFWSBpcyBub3QgZGVmaW5lZFwiKTtcblxuICAgIGlmICghY2xpZW50KSB7XG4gICAgICBjb25zdCBWaXBwc0NsaWVudCA9IHJlcXVpcmUoXCJAY3J5c3RhbGxpemUvbm9kZS12aXBwc1wiKTtcbiAgICAgIGNsaWVudCA9IG5ldyBWaXBwc0NsaWVudCh7XG4gICAgICAgIHRlc3REcml2ZTogdHJ1ZSxcbiAgICAgICAgaWQ6IFZJUFBTX0NMSUVOVF9JRCxcbiAgICAgICAgc2VjcmV0OiBWSVBQU19DTElFTlRfU0VDUkVULFxuICAgICAgICBzdWJzY3JpcHRpb25JZDogVklQUFNfU1VCX0tFWSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH0sXG59O1xuIiwiY29uc3QgaW52YXJpYW50ID0gcmVxdWlyZShcImludmFyaWFudFwiKTtcblxuY29uc3QgY3J5c3RhbGxpemUgPSByZXF1aXJlKFwiLi4vY3J5c3RhbGxpemVcIik7XG5cbi8qKlxuICogVG9kbzogbGluayB0byBnb29kIEpXVCBpbnRyb1xuICovXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVDtcblxuLy8gQ29va2llIGNvbmZpZyBmb3IgdXNlciBKV1RzXG5jb25zdCBDT09LSUVfVVNFUl9UT0tFTl9OQU1FID0gXCJ1c2VyLXRva2VuXCI7XG5jb25zdCBDT09LSUVfVVNFUl9UT0tFTl9NQVhfQUdFID0gNjAgKiA2MCAqIDI0O1xuY29uc3QgQ09PS0lFX1JFRlJFU0hfVE9LRU5fTkFNRSA9IFwidXNlci10b2tlbi1yZWZyZXNoXCI7XG5jb25zdCBDT09LSUVfUkVGUkVTSF9UT0tFTl9NQVhfQUdFID0gNjAgKiA2MCAqIDI0ICogNztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0VXNlcih7IGNvbnRleHQgfSkge1xuICBjb25zdCB1c2VySW5Db250ZXh0ID0gY29udGV4dC51c2VyO1xuXG4gIGNvbnN0IHVzZXIgPSB7XG4gICAgaXNMb2dnZWRJbjogQm9vbGVhbih1c2VySW5Db250ZXh0ICYmIFwiZW1haWxcIiBpbiB1c2VySW5Db250ZXh0KSxcbiAgICBlbWFpbDogdXNlckluQ29udGV4dCAmJiB1c2VySW5Db250ZXh0LmVtYWlsLFxuICAgIGxvZ291dExpbms6IGAke2NvbnRleHQucHVibGljSG9zdH0vdXNlci9sb2dvdXRgLFxuICB9O1xuXG4gIGlmICh1c2VyICYmIHVzZXIuaXNMb2dnZWRJbikge1xuICAgIGNvbnN0IGNyeXN0YWxsaXplQ3VzdG9tZXIgPSBhd2FpdCBjcnlzdGFsbGl6ZS5jdXN0b21lcnMuZ2V0KHtcbiAgICAgIGlkZW50aWZpZXI6IHVzZXIuZW1haWwsXG4gICAgfSk7XG4gICAgaWYgKGNyeXN0YWxsaXplQ3VzdG9tZXIpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odXNlciwgY3J5c3RhbGxpemVDdXN0b21lcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVzZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDT09LSUVfVVNFUl9UT0tFTl9OQU1FLFxuICBDT09LSUVfUkVGUkVTSF9UT0tFTl9OQU1FLFxuICBDT09LSUVfVVNFUl9UT0tFTl9NQVhfQUdFLFxuICBDT09LSUVfUkVGUkVTSF9UT0tFTl9NQVhfQUdFLFxuICBhdXRoZW50aWNhdGUodG9rZW4pIHtcbiAgICBpbnZhcmlhbnQoSldUX1NFQ1JFVCwgXCJwcm9jZXNzLmVudi5KV1RfU0VDUkVUIGlzIG5vdCBkZWZpbmVkXCIpO1xuXG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGp3dCA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XG4gICAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgSldUX1NFQ1JFVCk7XG4gICAgICBpZiAoIWRlY29kZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVtYWlsOiBkZWNvZGVkLmVtYWlsLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIHNlbmRNYWdpY0xpbmsoeyBlbWFpbCwgcmVkaXJlY3RVUkxBZnRlckxvZ2luLCBjb250ZXh0IH0pIHtcbiAgICBpbnZhcmlhbnQoSldUX1NFQ1JFVCwgXCJwcm9jZXNzLmVudi5KV1RfU0VDUkVUIGlzIG5vdCBkZWZpbmVkXCIpO1xuXG4gICAgY29uc3QgeyBwdWJsaWNIb3N0IH0gPSBjb250ZXh0O1xuXG4gICAgY29uc3QgY3J5c3RhbGxpemVDdXN0b21lciA9IGF3YWl0IGNyeXN0YWxsaXplLmN1c3RvbWVycy5nZXQoe1xuICAgICAgaWRlbnRpZmllcjogZW1haWwsXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGVyZSBpcyBubyBjdXN0b21lciByZWNvcmQgaW4gQ3J5c3RhbGxpemUsIHdlIHdpbGxcbiAgICAgKiBjcmVhdGUgb25lLlxuICAgICAqXG4gICAgICogWW91IGNhbiBjaG9vc2UgTk9UIHRvIGNyZWF0ZSBhIGN1c3RvbWVyIGF0IHRoaXMgcG9pbnQsXG4gICAgICogYW5kIHByb2hpYml0IGxvZ2lucyBmb3Igbm9uZSBjdXN0b21lcnNcbiAgICAgKi9cbiAgICBpZiAoIWNyeXN0YWxsaXplQ3VzdG9tZXIpIHtcbiAgICAgIC8vIHJldHVybiB7XG4gICAgICAvLyAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgLy8gICBlcnJvcjogXCJDVVNUT01FUl9OT1RfRk9VTkRcIixcbiAgICAgIC8vIH07XG4gICAgICBjb25zdCBlbWFpbFBhcnRzID0gZW1haWwuc3BsaXQoXCJAXCIpO1xuICAgICAgYXdhaXQgY3J5c3RhbGxpemUuY3VzdG9tZXJzLmNyZWF0ZSh7XG4gICAgICAgIGlkZW50aWZpZXI6IGVtYWlsLFxuICAgICAgICBmaXJzdE5hbWU6IGVtYWlsUGFydHNbMF0sXG4gICAgICAgIGxhc3ROYW1lOiBlbWFpbFBhcnRzWzFdLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgcGFnZSByZXNwb25zaWJsZSBvZiByZWNlaXZpbmcgdGhlIG1hZ2ljXG4gICAgICogbGluayB0b2tlbiwgYW5kIHRoZW4gY2FsbGluZyB0aGUgdmFsaWRhdGVNYWdpY0xpbmtUb2tlblxuICAgICAqIGZ1bmN0aW9uIGZyb20gdXNlclNlcnZpY2UuXG4gICAgICovXG4gICAgY29uc3QgbG9naW5MaW5rID0gbmV3IFVSTChgJHtwdWJsaWNIb3N0fS91c2VyL2xvZ2luLW1hZ2ljLWxpbmtgKTtcblxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgSldUIHRvIHRoZSBjYWxsYmFjayB1cmxcbiAgICAgKiBXaGVuIHRoZSBsaW5rIGlzIHZpc2l0ZWQsIHdlIGNhbiB2YWxpZGF0ZSB0aGUgdG9rZW5cbiAgICAgKiBhZ2FpbiBpbiB0aGUgdmFsaWRhdGVNYWdpY0xpbmtUb2tlbiBtZXRob2RcbiAgICAgKi9cbiAgICBjb25zdCBqd3QgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpO1xuICAgIGxvZ2luTGluay5zZWFyY2hQYXJhbXMuYXBwZW5kKFxuICAgICAgXCJ0b2tlblwiLFxuICAgICAgand0LnNpZ24oeyBlbWFpbCwgcmVkaXJlY3RVUkxBZnRlckxvZ2luIH0sIEpXVF9TRUNSRVQsIHtcbiAgICAgICAgZXhwaXJlc0luOiBcIjFoXCIsXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBlbWFpbFNlcnZpY2UgPSByZXF1aXJlKFwiLi4vZW1haWwtc2VydmljZVwiKTtcblxuICAgIGNvbnN0IHsgc3VjY2VzcyB9ID0gYXdhaXQgZW1haWxTZXJ2aWNlLnNlbmRVc2VyTWFnaWNMaW5rKHtcbiAgICAgIGxvZ2luTGluazogbG9naW5MaW5rLnRvU3RyaW5nKCksXG4gICAgICBlbWFpbCxcbiAgICB9KTtcblxuICAgIHJldHVybiB7IHN1Y2Nlc3MgfTtcbiAgfSxcbiAgdmFsaWRhdGVNYWdpY0xpbmtUb2tlbih0b2tlbikge1xuICAgIGludmFyaWFudChKV1RfU0VDUkVULCBcInByb2Nlc3MuZW52LkpXVF9TRUNSRVQgaXMgbm90IGRlZmluZWRcIik7XG5cbiAgICAvKipcbiAgICAgKiBIZXJlIHdlIHdvdWxkIHdhbnQgdG8gZmV0Y2ggYW4gZW50cnkgbWF0Y2hpbmcgdGhlIHByb3ZpZGVkIHRva2VuIGZyb20gb3VyXG4gICAgICogZGF0YXN0b3JlLiBUaGlzIGJvaWxlcnBsYXRlIGRvZXMgbm90IGhhdmUgYSBkYXRhc3RvcmUgY29ubmVjdGVkIHRvIGl0IHlldFxuICAgICAqIHNvIHdlIHdpbGwganVzdCBhc3N1bWUgdGhlIHRva2VuIGlzIGZvciBhIHJlYWwgdXNlciBhbmQgc2lnbiBhIGxvZ2luIHRva2VuXG4gICAgICogYWNjb3JkaW5nbHkuXG4gICAgICovXG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgand0ID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTtcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBKV1RfU0VDUkVUKTtcbiAgICAgIGNvbnN0IHsgZW1haWwsIHJlZGlyZWN0VVJMQWZ0ZXJMb2dpbiB9ID0gZGVjb2RlZDtcblxuICAgICAgY29uc3Qgc2lnbmVkTG9naW5Ub2tlbiA9IGp3dC5zaWduKHsgZW1haWwgfSwgSldUX1NFQ1JFVCwge1xuICAgICAgICBleHBpcmVzSW46IENPT0tJRV9VU0VSX1RPS0VOX01BWF9BR0UsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHNpZ25lZExvZ2luUmVmcmVzaFRva2VuID0gand0LnNpZ24oeyBlbWFpbCB9LCBKV1RfU0VDUkVULCB7XG4gICAgICAgIGV4cGlyZXNJbjogQ09PS0lFX1JFRlJFU0hfVE9LRU5fTUFYX0FHRSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBzaWduZWRMb2dpblRva2VuLFxuICAgICAgICBDT09LSUVfVVNFUl9UT0tFTl9NQVhfQUdFLFxuICAgICAgICBzaWduZWRMb2dpblJlZnJlc2hUb2tlbixcbiAgICAgICAgcmVkaXJlY3RVUkxBZnRlckxvZ2luLFxuICAgICAgICBDT09LSUVfUkVGUkVTSF9UT0tFTl9NQVhfQUdFLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yLFxuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gIHZhbGlkYXRlUmVmcmVzaFRva2VuKHsgcmVmcmVzaFRva2VuLCBlbWFpbCB9KSB7XG4gICAgaWYgKCFyZWZyZXNoVG9rZW4gfHwgIWVtYWlsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGp3dCA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XG4gICAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeShyZWZyZXNoVG9rZW4sIEpXVF9TRUNSRVQpO1xuICAgICAgaWYgKGRlY29kZWQuZW1haWwgPT09IGVtYWlsKSB7XG4gICAgICAgIHJldHVybiBqd3Quc2lnbih7IGVtYWlsIH0sIEpXVF9TRUNSRVQsIHtcbiAgICAgICAgICBleHBpcmVzSW46IENPT0tJRV9VU0VSX1RPS0VOX01BWF9BR0UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgZ2V0VXNlcixcbiAgYXN5bmMgdXBkYXRlKHsgY29udGV4dCwgaW5wdXQgfSkge1xuICAgIGNvbnN0IHsgdXNlciB9ID0gY29udGV4dDtcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHVzZXIgZm91bmQgaW4gY29udGV4dFwiKTtcbiAgICB9XG4gICAgYXdhaXQgY3J5c3RhbGxpemUuY3VzdG9tZXJzLnVwZGF0ZSh7XG4gICAgICBpZGVudGlmaWVyOiB1c2VyLmVtYWlsLFxuICAgICAgY3VzdG9tZXI6IGlucHV0LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGdldFVzZXIoeyBjb250ZXh0IH0pO1xuICB9LFxufTtcbiIsImNvbnN0IHsgY2FsbENhdGFsb2d1ZUFwaSB9ID0gcmVxdWlyZShcIi4uL2NyeXN0YWxsaXplL3V0aWxzXCIpO1xuXG4vKipcbiAqIEV4YW1wbGUgb2YgaG93IHRvIHVzZSBDcnlzdGFsbGl6ZSB0byBzdG9yZSBhbmRcbiAqIG1hbmFnZSB2b3VjaGVycy5cbiAqXG4gKiBFeHBlY3RlZCBjYXRhbG9ndWUgc3RydWN0dXJlOlxuICogX3ZvdWNoZXJzXG4gKiAgLSB2b3VjaGVyXzFcbiAqICAtIHZvdWNoZXJfMlxuICogIC0gLi4uXG4gKiAgLSB2b3VjaGVyX25cbiAqXG4gKiBFYWNoIHZvdWNoZXIgaXMgYmFzZWQgb24gdGhlIGZvbGxvd2luZyBzaGFwZVxuICogY29kZSAoc2luZ2xlTGluZSlcbiAqIGRpc2NvdW50IChjaG9pY2VDb21wb25lbnQpXG4gKiAgLSBwZXJjZW50IChudW1lcmljKVxuICogIC0gYW1vdW50IChudW1lcmljKVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIGdldENyeXN0YWxsaXplVm91Y2hlcnMoKSB7XG4gIGNvbnN0IHZvdWNoZXJzRnJvbUNyeXN0YWxsaXplID0gYXdhaXQgY2FsbENhdGFsb2d1ZUFwaSh7XG4gICAgcXVlcnk6IGBcbiAgICAgIHtcbiAgICAgICAgY2F0YWxvZ3VlKGxhbmd1YWdlOiBcImVuXCIsIHBhdGg6IFwiL3ZvdWNoZXJzXCIpIHtcbiAgICAgICAgICBjaGlsZHJlbiB7XG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBjb2RlOiBjb21wb25lbnQoaWQ6IFwiY29kZVwiKSB7XG4gICAgICAgICAgICAgIGNvbnRlbnQge1xuICAgICAgICAgICAgICAgIC4uLiBvbiBTaW5nbGVMaW5lQ29udGVudCB7XG4gICAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNjb3VudDogY29tcG9uZW50KGlkOiBcImRpc2NvdW50XCIpIHtcbiAgICAgICAgICAgICAgY29udGVudCB7XG4gICAgICAgICAgICAgICAgLi4uIG9uIENvbXBvbmVudENob2ljZUNvbnRlbnQge1xuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb21wb25lbnQge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi4gb24gTnVtZXJpY0NvbnRlbnQge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgfSk7XG5cbiAgaWYgKFxuICAgICF2b3VjaGVyc0Zyb21DcnlzdGFsbGl6ZS5kYXRhIHx8XG4gICAgIXZvdWNoZXJzRnJvbUNyeXN0YWxsaXplLmRhdGEuY2F0YWxvZ3VlXG4gICkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiB2b3VjaGVyc0Zyb21DcnlzdGFsbGl6ZS5kYXRhLmNhdGFsb2d1ZS5jaGlsZHJlbi5tYXAoXG4gICAgKHZvdWNoZXJGcm9tQ3J5c3RhbGxpemUpID0+IHtcbiAgICAgIGNvbnN0IGRpc2NvdW50Q29tcG9uZW50ID1cbiAgICAgICAgdm91Y2hlckZyb21DcnlzdGFsbGl6ZS5kaXNjb3VudC5jb250ZW50LnNlbGVjdGVkQ29tcG9uZW50O1xuXG4gICAgICBsZXQgZGlzY291bnRBbW91bnQgPSBudWxsO1xuICAgICAgbGV0IGRpc2NvdW50UGVyY2VudCA9IG51bGw7XG4gICAgICBpZiAoZGlzY291bnRDb21wb25lbnQuaWQgPT09IFwicGVyY2VudFwiKSB7XG4gICAgICAgIGRpc2NvdW50UGVyY2VudCA9IGRpc2NvdW50Q29tcG9uZW50LmNvbnRlbnQubnVtYmVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzY291bnRBbW91bnQgPSBkaXNjb3VudENvbXBvbmVudC5jb250ZW50Lm51bWJlcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogdm91Y2hlckZyb21DcnlzdGFsbGl6ZS5jb2RlLmNvbnRlbnQudGV4dCxcbiAgICAgICAgZGlzY291bnRBbW91bnQsXG4gICAgICAgIGRpc2NvdW50UGVyY2VudCxcbiAgICAgICAgb25seUZvckF1dGhvcmlzZWRVc2VyOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuICApO1xufTtcbiIsImNvbnN0IGdldENyeXN0YWxsaXplVm91Y2hlcnMgPSByZXF1aXJlKFwiLi9jcnlzdGFsbGl6ZS12b3VjaGVycy1leGFtcGxlXCIpO1xuXG4vKipcbiAqIEV4YW1wbGUgb2YgYSB2b3VjaGVyIHJlZ2lzdGVyXG4gKiBZb3UgY2FuIGN1c3RvbWlzZSB0aGlzIHRvIGNhbGwgYW4gZXh0ZXJuYWwgc2VydmljZVxuICogb3Iga2VlcCBzdGF0aWMgdm91Y2hlcnMgbGlrZSB0aGlzXG4gKi9cbmNvbnN0IHZvdWNoZXJSZWdpc3RlciA9IFtcbiAge1xuICAgIGNvZGU6IFwib2stZGVhbFwiLFxuICAgIGRpc2NvdW50QW1vdW50OiAyLFxuICAgIGRpc2NvdW50UGVyY2VudDogbnVsbCxcbiAgICBvbmx5Rm9yQXV0aG9yaXNlZFVzZXI6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgY29kZTogXCJmYWlyLWRlYWxcIixcbiAgICBkaXNjb3VudEFtb3VudDogbnVsbCxcbiAgICBkaXNjb3VudFBlcmNlbnQ6IDUsXG4gICAgb25seUZvckF1dGhvcmlzZWRVc2VyOiBmYWxzZSxcbiAgfSxcbiAge1xuICAgIGNvZGU6IFwiYXdlc29tZS1kZWFsLWxvZ2dlZC1pblwiLFxuICAgIGRpc2NvdW50QW1vdW50OiBudWxsLFxuICAgIGRpc2NvdW50UGVyY2VudDogMTAsXG4gICAgb25seUZvckF1dGhvcmlzZWRVc2VyOiB0cnVlLFxuICB9LFxuICB7XG4gICAgY29kZTogXCJnb29kLWRlYWwtbG9nZ2VkLWluXCIsXG4gICAgZGlzY291bnRBbW91bnQ6IDEwMCxcbiAgICBkaXNjb3VudFBlcmNlbnQ6IG51bGwsXG4gICAgb25seUZvckF1dGhvcmlzZWRVc2VyOiB0cnVlLFxuICB9LFxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFzeW5jIGdldCh7IGNvZGUsIGNvbnRleHQgfSkge1xuICAgIGNvbnN0IHsgdXNlciB9ID0gY29udGV4dDtcblxuICAgIGNvbnN0IGlzQW5vbnltb3VzVXNlciA9ICF1c2VyIHx8ICF1c2VyLmlzTG9nZ2VkSW47XG5cbiAgICBjb25zdCBhbGxDcnlzdGFsbGl6ZVZvdWNoZXJzID0gYXdhaXQgZ2V0Q3J5c3RhbGxpemVWb3VjaGVycygpO1xuXG4gICAgY29uc3QgYWxsVm91Y2hlcnMgPSBbLi4udm91Y2hlclJlZ2lzdGVyLCAuLi5hbGxDcnlzdGFsbGl6ZVZvdWNoZXJzXTtcblxuICAgIC8vIEFzIGRlZmF1bHQsIG5vdCBhbGwgdGhlIHZvdWNoZXJzIHdvcmsgZm9yIGFub255bW91cyB1c2Vycy5cbiAgICAvLyBBcyB5b3UnbGwgc2VlIGluIHRoZSBjb25maWd1cmF0aW9uIGFib3ZlLCBzb21lIG5lZWQgdGhlIHVzZXIgdG8gYmUgbG9nZ2VkIGluXG4gICAgaWYgKGlzQW5vbnltb3VzVXNlcikge1xuICAgICAgY29uc3Qgdm91Y2hlciA9IGFsbFZvdWNoZXJzXG4gICAgICAgIC5maWx0ZXIoKHYpID0+ICF2Lm9ubHlGb3JBdXRob3Jpc2VkVXNlcilcbiAgICAgICAgLmZpbmQoKHYpID0+IHYuY29kZSA9PT0gY29kZSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzVmFsaWQ6IEJvb2xlYW4odm91Y2hlciksXG4gICAgICAgIHZvdWNoZXIsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFNlYXJjaCBhbGwgdm91Y2hlcnMgZm9yIGF1dGhlbnRpY2F0ZWQgdXNlcnNcbiAgICBsZXQgdm91Y2hlciA9IGFsbFZvdWNoZXJzLmZpbmQoKHYpID0+IHYuY29kZSA9PT0gY29kZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXNWYWxpZDogQm9vbGVhbih2b3VjaGVyKSxcbiAgICAgIHZvdWNoZXIsXG4gICAgfTtcbiAgfSxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAY3J5c3RhbGxpemUvbm9kZS1rbGFybmFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGNyeXN0YWxsaXplL25vZGUtdmlwcHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG1vbGxpZS9hcGktY2xpZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBwYXlwYWwvY2hlY2tvdXQtc2VydmVyLXNka1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAc2VuZGdyaWQvbWFpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLW1pY3JvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdyYXBocWwtdGFnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImludmFyaWFudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWptbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLWZldGNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0cmlwZVwiKTsiXSwibmFtZXMiOlsiYWxsb3dDb3JzIiwiZm4iLCJyZXEiLCJyZXMiLCJzZXRIZWFkZXIiLCJoZWFkZXJzIiwib3JpZ2luIiwibWV0aG9kIiwic3RhdHVzIiwiZW5kIiwiQXBvbGxvU2VydmVyIiwiY29ycyIsImNyZWF0ZUdyYXBoUUxTZXJ2ZXJDb25maWciLCJ1c2VyU2VydmljZSIsImFwb2xsb1NlcnZlciIsImFwaVBhdGhQcmVmaXgiLCJub3JtYWxpc2VSZXF1ZXN0IiwicmVmcmVzaFVzZXJUb2tlbiIsIm5ld1VzZXJUb2tlbiIsIkNPT0tJRV9VU0VSX1RPS0VOX05BTUUiLCJDT09LSUVfVVNFUl9UT0tFTl9NQVhfQUdFIiwiY29uZmlnIiwiYXBpIiwiYm9keVBhcnNlciIsImNyZWF0ZUhhbmRsZXIiLCJwYXRoIiwicmVxdWlyZSIsImdldEhvc3QiLCJtb2R1bGUiLCJleHBvcnRzIiwiY3JlYXRlQ29udGV4dCIsImNvbnRleHQiLCJhcmdzIiwiY29va2llcyIsInVzZXIiLCJhdXRoZW50aWNhdGUiLCJ2YWxpZGF0ZVJlZnJlc2hUb2tlbiIsInJlZnJlc2hUb2tlbiIsIkNPT0tJRV9SRUZSRVNIX1RPS0VOX05BTUUiLCJlbWFpbCIsInB1YmxpY0hvc3QiLCJzZXJ2aWNlQ2FsbGJhY2tIb3N0IiwicHJvY2VzcyIsImVudiIsIlNFUlZJQ0VfQ0FMTEJBQ0tfSE9TVCIsImVuZHNXaXRoIiwicmVzb2x2ZXJzIiwidHlwZURlZnMiLCJjcmVhdGVHcmFwaHFsU2VydmVyQ29uZmlnIiwiaW50cm9zcGVjdGlvbiIsInBsYXlncm91bmQiLCJlbmRwb2ludCIsInNldHRpbmdzIiwic3Vic2NyaXB0aW9ucyIsImNyeXN0YWxsaXplIiwiYmFza2V0U2VydmljZSIsInZvdWNoZXJTZXJ2aWNlIiwic3RyaXBlU2VydmljZSIsIm1vbGxpZVNlcnZpY2UiLCJ2aXBwc1NlcnZpY2UiLCJrbGFybmFTZXJ2aWNlIiwicGF5cGFsU2VydmljZSIsInBheW1lbnRQcm92aWRlclJlc29sdmVyIiwic2VydmljZSIsImVuYWJsZWQiLCJmcm9udGVuZENvbmZpZyIsIlF1ZXJ5IiwibXlDdXN0b21CdXNpbmVzc1RoaW5nIiwid2hhdElzVGhpcyIsImJhc2tldCIsInBhcmVudCIsImdldCIsImdldFVzZXIiLCJvcmRlcnMiLCJwYXltZW50UHJvdmlkZXJzIiwidm91Y2hlciIsIk15Q3VzdG9tQnVzaW5uZXNzUXVlcmllcyIsImR5bmFtaWNSYW5kb21JbnQiLCJjb25zb2xlIiwibG9nIiwicGFyc2VJbnQiLCJNYXRoIiwicmFuZG9tIiwiUGF5bWVudFByb3ZpZGVyc1F1ZXJpZXMiLCJzdHJpcGUiLCJrbGFybmEiLCJ2aXBwcyIsIm1vbGxpZSIsInBheXBhbCIsIk9yZGVyUXVlcmllcyIsImlkIiwiTXV0YXRpb24iLCJVc2VyTXV0YXRpb25zIiwic2VuZE1hZ2ljTGluayIsInVwZGF0ZSIsIlBheW1lbnRQcm92aWRlcnNNdXRhdGlvbnMiLCJTdHJpcGVNdXRhdGlvbnMiLCJjcmVhdGVQYXltZW50SW50ZW50IiwiY29uZmlybU9yZGVyIiwiS2xhcm5hTXV0YXRpb25zIiwicmVuZGVyQ2hlY2tvdXQiLCJNb2xsaWVNdXRhdGlvbnMiLCJjcmVhdGVQYXltZW50IiwiVmlwcHNNdXRhdGlvbnMiLCJpbml0aWF0ZVBheW1lbnQiLCJQYXlwYWxNdXRhdGlvbiIsImNyZWF0ZVBheXBhbFBheW1lbnQiLCJjb25maXJtUGF5bWVudCIsImNvbmZpcm1QYXlwYWxQYXltZW50IiwiZ3FsIiwiZm9ybWF0Q3VycmVuY3kiLCJhbW91bnQiLCJjdXJyZW5jeSIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJzdHlsZSIsImZvcm1hdCIsInhwcm90b2NvbCIsInhob3N0IiwiSE9TVF9VUkwiLCJIb3N0IiwiaG9zdCIsInN0YXJ0c1dpdGgiLCJWRVJDRUxfVVJMIiwiRXJyb3IiLCJ0cnVuY2F0ZURlY2ltYWxzT2ZOdW1iZXIiLCJvcmlnaW5hbE51bWJlciIsIm51bWJlck9mRGVjaW1hbHMiLCJhbW91bnRUcnVuY2F0ZWQiLCJ0b0ZpeGVkIiwicGFyc2VGbG9hdCIsImNhbGN1bGF0ZVZvdWNoZXJEaXNjb3VudEFtb3VudCIsImlzRGlzY291bnRBbW91bnQiLCJCb29sZWFuIiwiZGlzY291bnRBbW91bnQiLCJhbW91bnRUb0Rpc2NvdW50IiwiZGlzY291bnRQZXJjZW50IiwiZ2V0UHJvZHVjdHNGcm9tQ3J5c3RhbGxpemUiLCJwYXRocyIsImxhbmd1YWdlIiwibGVuZ3RoIiwiY2FsbENhdGFsb2d1ZUFwaSIsInJlc3BvbnNlIiwicXVlcnkiLCJtYXAiLCJpbmRleCIsIl8iLCJpIiwiZGF0YSIsImZpbHRlciIsInAiLCJnZXRUb3RhbHMiLCJjYXJ0IiwidmF0VHlwZSIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJxdWFudGl0eSIsInByaWNlIiwicHJpY2VUb1VzZSIsImRpc2NvdW50ZWQiLCJncm9zcyIsIm5ldCIsInRheCIsImRpc2NvdW50IiwiYmFza2V0TW9kZWwiLCJsb2NhbGUiLCJ2b3VjaGVyQ29kZSIsImJhc2tldEZyb21DbGllbnQiLCJjb2RlIiwiaXNWYWxpZCIsInByb2R1Y3REYXRhRnJvbUNyeXN0YWxsaXplIiwiY3J5c3RhbGxpemVDYXRhbG9ndWVMYW5ndWFnZSIsIml0ZW1Gcm9tQ2xpZW50IiwicHJvZHVjdCIsImZpbmQiLCJ2YXJpYW50cyIsInNvbWUiLCJ2Iiwic2t1IiwidmFyaWFudCIsInByaWNlVmFyaWFudHMiLCJwdiIsImlkZW50aWZpZXIiLCJwcmljZVZhcmlhbnRJZGVudGlmaWVyIiwicGVyY2VudCIsInByb2R1Y3RJZCIsInByb2R1Y3RWYXJpYW50SWQiLCJ0b3RhbCIsImNhcnRXaXRoVm91Y2hlciIsImNhcnRJdGVtIiwicG9ydGlvbk9mVG90YWwiLCJwb3J0aW9uT2ZEaXNjb3VudCIsImNhbGxQaW1BcGkiLCJnZXRUZW5hbnRJZCIsImNyZWF0ZUN1c3RvbWVyIiwiY3VzdG9tZXIiLCJ0ZW5hbnRJZCIsInZhcmlhYmxlcyIsImlucHV0IiwiY3JlYXRlIiwiZ2V0Q3VzdG9tZXIiLCJleHRlcm5hbFJlZmVyZW5jZSIsInVwZGF0ZUN1c3RvbWVyIiwicmVzdCIsImN1c3RvbWVycyIsImNhbGxPcmRlcnNBcGkiLCJub3JtYWxpc2VPcmRlck1vZGVsIiwiY3JlYXRlT3JkZXIiLCJnZXRPcmRlciIsIm9yZGVyIiwid2FpdEZvck9yZGVyVG9CZVBlcnNpc3RhdGVkIiwidXBkYXRlT3JkZXIiLCJyZXRyaWVzIiwibWF4UmV0cmllcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hlY2siLCJzZXRUaW1lb3V0IiwiaW52YXJpYW50IiwiZmV0Y2giLCJDUllTVEFMTElaRV9URU5BTlRfSURFTlRJRklFUiIsIkNSWVNUQUxMSVpFX0FDQ0VTU19UT0tFTl9JRCIsIkNSWVNUQUxMSVpFX0FDQ0VTU19UT0tFTl9TRUNSRVQiLCJjcmVhdGVBcGlDYWxsZXIiLCJ1cmkiLCJjYWxsQXBpIiwib3BlcmF0aW9uTmFtZSIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwianNvbiIsImVycm9ycyIsImhhbmRsZU9yZGVyQ2FydEl0ZW0iLCJpdGVtIiwiaW1hZ2VzIiwibmFtZSIsImltYWdlVXJsIiwidXJsIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJhZGRyZXNzZXMiLCJ0eXBlIiwidW5kZWZpbmVkIiwidGVuYW50SWRSZXNwb25zZSIsInRlbmFudCIsImNhbGxTZWFyY2hBcGkiLCJzZW5kRW1haWwiLCJzZW5kT3JkZXJDb25maXJtYXRpb24iLCJzZW5kVXNlck1hZ2ljTGluayIsIm9yZGVySWQiLCJtam1sMmh0bWwiLCJzdWNjZXNzIiwiZXJyb3IiLCJodG1sIiwidG8iLCJzdWJqZWN0Iiwic2VuZE1hZ2ljTGlua0xvZ2luIiwibG9naW5MaW5rIiwiU0VOREdSSURfQVBJX0tFWSIsIkVNQUlMX0ZST00iLCJzZ01haWwiLCJzZXRBcGlLZXkiLCJzZW5kIiwiZnJvbSIsImtsYXJuYUNhcHR1cmUiLCJjcnlzdGFsbGl6ZU9yZGVySWQiLCJnZXRDbGllbnQiLCJjcnlzdGFsbGl6ZU9yZGVyIiwia2xhcm5hUGF5bWVudCIsInBheW1lbnQiLCJwcm92aWRlciIsImtsYXJuYU9yZGVySWQiLCJrbGFybmFDbGllbnQiLCJvcmRlcm1hbmFnZW1lbnRWMSIsImNhcHR1cmVzIiwiY2FwdHVyZSIsIktMQVJOQV9VU0VSTkFNRSIsIktMQVJOQV9QQVNTV09SRCIsInB1c2giLCJrbGFybmFQdXNoIiwiYWNrbm93bGVkZ2UiLCJjaGVja291dE1vZGVsIiwidG9LbGFybmFPcmRlck1vZGVsIiwiY29uZmlybWF0aW9uVVJMIiwidGVybXNVUkwiLCJjaGVja291dFVSTCIsImN1c3RvbWVyV2l0aEN1cnJlbnRMb2dnZWRJblVzZXIiLCJjb25maXJtYXRpb24iLCJVUkwiLCJyZXBsYWNlIiwic2VhcmNoUGFyYW1zIiwiYXBwZW5kIiwidmFsaWRLbGFybmFPcmRlck1vZGVsIiwicHVyY2hhc2VfY291bnRyeSIsInB1cmNoYXNlX2N1cnJlbmN5IiwibWVyY2hhbnRfdXJscyIsInRlcm1zIiwiY2hlY2tvdXQiLCJ0b1N0cmluZyIsImNoZWNrb3V0VjMiLCJodG1sX3NuaXBwZXQiLCJvcmRlcl9pZCIsImNyeXN0YWxsaXplVG9LbGFybmFPcmRlck1vZGVsIiwib3JkZXJfYW1vdW50Iiwib3JkZXJfdGF4X2Ftb3VudCIsIm9yZGVyX2xpbmVzIiwidW5pdF9wcmljZSIsInJlZmVyZW5jZSIsInRvdGFsX2Ftb3VudCIsInRvdGFsX3RheF9hbW91bnQiLCJ0YXhfcmF0ZSIsImltYWdlX3VybCIsIm1lcmNoYW50X2RhdGEiLCJ0YXhHcm91cCIsImNsaWVudCIsIktsYXJuYSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJhcGlFbmRwb2ludCIsImNyZWF0ZU1vbGxpZVBheW1lbnQiLCJpc1N1YnNjcmlwdGlvbiIsIm1ldGEiLCJrZXkiLCJ2YWx1ZSIsIm1vbGxpZUNsaWVudCIsIm1vbGxpZUN1c3RvbWVyIiwidHJpbSIsInZhbGlkTW9sbGllT3JkZXIiLCJNT0xMSUVfREVGQVVMVF9DVVJSRU5DWSIsInRvVXBwZXJDYXNlIiwiY3VzdG9tZXJJZCIsInNlcXVlbmNlVHlwZSIsImRlc2NyaXB0aW9uIiwicmVkaXJlY3RVcmwiLCJ3ZWJob29rVXJsIiwibWV0YWRhdGEiLCJtb2xsaWVPcmRlclJlc3BvbnNlIiwicGF5bWVudHMiLCJjdXN0b21lcnNfbWFuZGF0ZXMiLCJtYW5kYXRlSWQiLCJzdGFydERhdGUiLCJEYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwiY3VzdG9tZXJzX3N1YnNjcmlwdGlvbnMiLCJ0aW1lcyIsImludGVydmFsIiwiY2hlY2tvdXRMaW5rIiwiX2xpbmtzIiwiaHJlZiIsInRvQ3J5c3RhbGxpemVPcmRlck1vZGVsIiwiTU9MTElFX0FQSV9LRVkiLCJtb2xsaWVUb0NyeXN0YWxsaXplT3JkZXJNb2RlbCIsIm1vbGxpZU9yZGVyIiwiY3VzdG9tZXJOYW1lIiwibWlkZGxlTmFtZSIsInNsaWNlIiwiam9pbiIsImJpcnRoRGF0ZSIsInN0cmVldCIsInN0cmVldDIiLCJwb3N0YWxDb2RlIiwiY2l0eSIsInN0YXRlIiwiY291bnRyeSIsInBob25lIiwiY3VzdG9tIiwicHJvcGVydGllcyIsInByb3BlcnR5IiwicmVzb3VyY2UiLCJtb2RlIiwicHJvZmlsZUlkIiwiY3JlYXRlTW9sbGllQ2xpZW50IiwiYXBpS2V5IiwiY2hlY2tvdXROb2RlSnNzZGsiLCJQYXlwYWxDbGllbnQiLCJleGVjdXRlIiwiT3JkZXJzR2V0UmVxdWVzdCIsInJlc3VsdCIsImVyciIsInJlcXVlc3QiLCJPcmRlcnNDcmVhdGVSZXF1ZXN0IiwicHJlZmVyIiwicmVxdWVzdEJvZHkiLCJpbnRlbnQiLCJwdXJjaGFzZV91bml0cyIsImN1cnJlbmN5X2NvZGUiLCJQQVlQQUxfQ0xJRU5UX0lEIiwiUEFZUEFMX0NMSUVOVF9TRUNSRVQiLCJjbGllbnRJZCIsImNsaWVudFNlY3JldCIsImNsaWVudEVudiIsImNvcmUiLCJTYW5kYm94RW52aXJvbm1lbnQiLCJQYXlQYWxIdHRwQ2xpZW50IiwicGF5ZXIiLCJzaGlwcGluZyIsImFkZHJlc3MiLCJlbWFpbF9hZGRyZXNzIiwicGF5ZXJfaWQiLCJnaXZlbl9uYW1lIiwic3VybmFtZSIsImFkZHJlc3NfbGluZV8xIiwicG9zdGFsX2NvZGUiLCJhZG1pbl9hcmVhXzIiLCJhZG1pbl9hcmVhXzEiLCJjb3VudHJ5X2NvZGUiLCJwYXltZW50SW50ZW50SWQiLCJjcnlzdGFsbGl6ZU9yZGVyTW9kZWwiLCJjdXN0b21lcklkZW50aWZpZXIiLCJjb25maXJtIiwicGF5bWVudE1ldGhvZElkIiwicGF5bWVudEludGVudCIsInBheW1lbnRJbnRlbnRzIiwicGF5bWVudF9tZXRob2QiLCJTVFJJUEVfU0VDUkVUX0tFWSIsIlNUUklQRV9QVUJMSVNIQUJMRV9LRVkiLCJwdWJsaXNoYWJsZUtleSIsInN0cmlwZVRvQ3J5c3RhbGxpemVPcmRlck1vZGVsIiwicmV0cmlldmUiLCJjaGFyZ2VzIiwiY2hhcmdlIiwiYmlsbGluZ19kZXRhaWxzIiwicmVjZWlwdF9lbWFpbCIsImFkZHJlc3NXaXRoRW1haWwiLCJhIiwibGluZTEiLCJsaW5lMiIsInBheW1lbnRfaW50ZW50IiwicGF5bWVudE1ldGhvZCIsInBheW1lbnRfbWV0aG9kX2RldGFpbHMiLCJzdWJzY3JpcHRpb25JZCIsInN1YnNjcmlwdGlvbiIsInN0cmlwZVNkayIsInZpcHBzRmFsbGJhY2siLCJvblN1Y2Nlc3NVUkwiLCJvbkVycm9yVVJMIiwicmVkaXJlY3RUbyIsInZpcHBzQ2xpZW50IiwiZ2V0T3JkZXJEZXRhaWxzIiwibGFzdFRyYW5zYWN0aW9uTG9nRW50cnkiLCJ0cmFuc2FjdGlvbkxvZ0hpc3RvcnkiLCJzb3J0IiwiYiIsInRpbWVTdGFtcCIsIm9wZXJhdGlvbiIsIm9wZXJhdGlvblN1Y2Nlc3MiLCJ1c2VyRGV0YWlscyIsInVzZXJJZCIsIm1vYmlsZU51bWJlciIsInNoaXBwaW5nRGV0YWlscyIsImFkZHJlc3NMaW5lMSIsImFkZHJlc3NMaW5lMiIsInBvc3RDb2RlIiwiVklQUFNfQ0xJRU5UX0lEIiwiVklQUFNfQ0xJRU5UX1NFQ1JFVCIsIlZJUFBTX01FUkNIQU5UX1NFUklBTCIsIlZJUFBTX1NVQl9LRVkiLCJmYWxsYmFjayIsIm9yZGVyVXBkYXRlIiwidXNlckNvbnNlbnRSZW1vdmFsIiwiaW5pdGlhdGVWaXBwc1BheW1lbnQiLCJmYWxsQmFja1VSTCIsImVuY29kZVVSSUNvbXBvbmVudCIsInZpcHBzUmVzcG9uc2UiLCJtZXJjaGFudEluZm8iLCJtZXJjaGFudFNlcmlhbE51bWJlciIsImZhbGxCYWNrIiwiY2FsbGJhY2tQcmVmaXgiLCJzaGlwcGluZ0RldGFpbHNQcmVmaXgiLCJjb25zZW50UmVtb3ZhbFByZWZpeCIsInBheW1lbnRUeXBlIiwiaXNBcHAiLCJzdGF0aWNTaGlwcGluZ0RldGFpbHMiLCJpc0RlZmF1bHQiLCJwcmlvcml0eSIsInNoaXBwaW5nQ29zdCIsInNoaXBwaW5nTWV0aG9kIiwic2hpcHBpbmdNZXRob2RJZCIsImN1c3RvbWVySW5mbyIsInRyYW5zYWN0aW9uIiwidHJhbnNhY3Rpb25UZXh0IiwidmlwcHNPcmRlclVwZGF0ZSIsInZpcHBzVXNlckNvbnNlbnRSZW1vdmFsIiwidmlwcHNVc2VySWQiLCJWaXBwc0NsaWVudCIsInRlc3REcml2ZSIsInNlY3JldCIsIkpXVF9TRUNSRVQiLCJDT09LSUVfUkVGUkVTSF9UT0tFTl9NQVhfQUdFIiwidXNlckluQ29udGV4dCIsImlzTG9nZ2VkSW4iLCJsb2dvdXRMaW5rIiwiY3J5c3RhbGxpemVDdXN0b21lciIsIk9iamVjdCIsImFzc2lnbiIsInRva2VuIiwiand0IiwiZGVjb2RlZCIsInZlcmlmeSIsImUiLCJyZWRpcmVjdFVSTEFmdGVyTG9naW4iLCJlbWFpbFBhcnRzIiwic2lnbiIsImV4cGlyZXNJbiIsImVtYWlsU2VydmljZSIsInZhbGlkYXRlTWFnaWNMaW5rVG9rZW4iLCJzaWduZWRMb2dpblRva2VuIiwic2lnbmVkTG9naW5SZWZyZXNoVG9rZW4iLCJnZXRDcnlzdGFsbGl6ZVZvdWNoZXJzIiwidm91Y2hlcnNGcm9tQ3J5c3RhbGxpemUiLCJjYXRhbG9ndWUiLCJjaGlsZHJlbiIsInZvdWNoZXJGcm9tQ3J5c3RhbGxpemUiLCJkaXNjb3VudENvbXBvbmVudCIsImNvbnRlbnQiLCJzZWxlY3RlZENvbXBvbmVudCIsIm51bWJlciIsInRleHQiLCJvbmx5Rm9yQXV0aG9yaXNlZFVzZXIiLCJ2b3VjaGVyUmVnaXN0ZXIiLCJpc0Fub255bW91c1VzZXIiLCJhbGxDcnlzdGFsbGl6ZVZvdWNoZXJzIiwiYWxsVm91Y2hlcnMiXSwic291cmNlUm9vdCI6IiJ9