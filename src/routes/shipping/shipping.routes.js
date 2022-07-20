const { Router } = require("express");
const Shipping = require("../../Controllers/shipping/shipping.controllers");
const Auth = require("../../middleware/auth/auth");
const ShippingValidator = require("../../middleware/validator/shippingValidationAll");
const ShippingRouter =  Router();

// /shipping/:user_id/users/package/ register shipping to country POST
// /shipping/pagination/:id/page/:page get all order shipping pagination
// /shipping/:id/users/ get all shipping by id user GET
// /shipping/progress/:id/ get shipping order progress by id GET
// /shipping/progress/:id/pagination/:page/ get pagination progress order shipping
// /shipping/:id/users/:id_user get SHIPPING ORDER by ID GET
// /shipping/send/ update order status an send you order to country

ShippingRouter.post('/shipping/:user_id/users/package/',Auth.auth,ShippingValidator.shipping_create,Shipping.Create_Shipping_parcel)
ShippingRouter.get('/shipping/pagination/:id/page/:page',Auth.auth,ShippingValidator.validate_page_params,Shipping.getAllshippingPagination)
ShippingRouter.get('/shipping/:id/users/',Auth.auth,ShippingValidator.validate_id,Shipping.getAllshipping)

ShippingRouter.get('/shipping/progress/:id/',Auth.auth,ShippingValidator.validate_id,Shipping.getProgress)
ShippingRouter.get('/shipping/progress/:id/pagination/:page/',Auth.auth,ShippingValidator.validate_page_params,Shipping.getProgressPagination)
ShippingRouter.get('/shipping/:id/users/:id_user',Auth.auth,ShippingValidator.validate_user_id,Shipping.GetShipping_by_id)


ShippingRouter.put('/shipping/send/',Auth.auth,ShippingValidator.update_status,Shipping.update_shipping)

module.exports = ShippingRouter