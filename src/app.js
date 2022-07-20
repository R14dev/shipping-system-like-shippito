const Express = require('express');
const ShippingRouter = require('./routes/shipping/shipping.routes');
const RouterUser = require('./routes/Users/Users.routes.js');
require('express-async-errors')
const AppError = require('./utils/AppError/AppError.js');
require('./database/database.js')
require('dotenv/config')
const App = Express();
App.use(Express.json())


App.use(RouterUser)
App.use(ShippingRouter)

App.use((err,req,res,next)=>{
    if( err instanceof AppError){
        return res.status(err.statusCode).json({message:err.message})
    }
    return err.status(500).json({
        status: 'Error',
        message: `Intenal server Error ${err.message}`
    })
})
App.listen(3000, ()=>{ console.log('Server runnig...')})