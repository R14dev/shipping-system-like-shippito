const yup  = require('yup');
const Users = require('../../models/Users/Users');
 class UserSingupvalidator {
   static async ValidatorSingup (req,res,next) {
        const SchemaUserSingup = yup.object({
            body: yup.object({
                nome: yup.string().required(),
                email: yup.string().email().required(),
                password: yup.string().required(),
                adress: yup.string().required(),
                phone_number: yup.string().required(),
               
            })
        })
        try{
        await SchemaUserSingup.validate({body:req.body})
        next();
        } catch (error){
            return res.status(500).json({type: error.name,message: error.message})
        }
    }
    static async VerifySingUp_Validator(req,res,next){
        try {

        const find = await Users.findAll()
        const email_alreads = find.find(email=> email.email == req.body.email);
        if(email_alreads) 
         return res.status(200).json({Message: 'User alread existics !'})
        return next()
        } 
        catch (error) {return res.status(500).json({type: error.name,message: error.message})}   
    }

}
module.exports = UserSingupvalidator;