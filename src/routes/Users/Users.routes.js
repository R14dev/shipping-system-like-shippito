const RouterUser = require('express').Router();
const Auth = require('../../middleware/auth/auth.js')
const UserSingupvalidator = require('../../middleware/validator/UserSingupvalidator.js')
const UserController = require('../../Controllers/UserController/User.controller.js');
const UserSiginValidator = require('../../middleware/validator/UsersiginValidator.js');
const ValidateParamsByIDAndBody = require('../../middleware/validator/ValidateParamsByIDAndBody.js');
const ShippingValidator = require('../../middleware/validator/shippingValidationAll.js');
const Controllers = new UserController();

// login user /login_user POST
// singup user /singup_user POST
RouterUser.post('/login_user',UserSiginValidator.ValidatorSigIn,Controllers.user_login);
RouterUser.post('/singup_user',UserSingupvalidator.ValidatorSingup,UserSingupvalidator.VerifySingUp_Validator,Controllers.user_register);
//invoice get by id /ivoice/:id/
//invoice get by user /user/:id/ivoice/
RouterUser.get('/ivoice/:id/',Auth.auth,ValidateParamsByIDAndBody.validate_id_params,Controllers.invoice_id)
RouterUser.get('/user/:id/ivoice/',Auth.auth,ValidateParamsByIDAndBody.validate_id_params,Controllers.invoice)

// adress delete getby id /adress/:id
// register adress /adress/:id/adress 
// get adress by id user /adress/:id
RouterUser.delete('/adress/:id',Auth.auth,ValidateParamsByIDAndBody.validate_id_params,Controllers.delete_adress);
RouterUser.post('/adress/:id/adress',Auth.auth,ValidateParamsByIDAndBody.validate_id_params,ValidateParamsByIDAndBody._adress_validate,Controllers.adress_register)
RouterUser.get('/adress/:id',Auth.auth,ValidateParamsByIDAndBody.validate_id_params,Controllers.getadress)

// refreash token post
RouterUser.post('/refreash',Auth.refreashToken_auth);



// /package/:id/pagination/:page/ get pagination packages by id user
// /package/:id/colletion // get detalhe package by user id and query params pg_id=[1,2,3]
// user/:id/packages/ get package by id user all package
// /packages/:id/ get package by id GET
// /packages/ REGISTER PACKAGE POST
// /package/:id DELETE delete package by id
// /package/:price package update price
RouterUser.get('/package/:id/pagination/:page/',Auth.auth,ShippingValidator.validate_page_params,Controllers.package_pagination)
RouterUser.get('/package/:id/colletion',Controllers.getSpecialPackage_by_Colletion)
RouterUser.get('user/:id/packages/',Auth.auth,ValidateParamsByIDAndBody.validate_id_params,Controllers.package_get)
RouterUser.get('/packages/:id/',Auth.auth,ValidateParamsByIDAndBody.validate_id_params,Controllers.package)
RouterUser.post('/packages/',Auth.auth,ValidateParamsByIDAndBody.Package_singup,Controllers.package_register)
RouterUser.delete("/package/:id",ValidateParamsByIDAndBody.validate_id_params,Controllers.package_delete_id)
RouterUser.put('/package/:price',Auth.auth,ValidateParamsByIDAndBody.update_package_price,Controllers.package_update)



module.exports = RouterUser