
const yup = require('yup')
const Users = require('../../models/Users/Users')

module.exports = class UserSiginValidator {
    static async  ValidatorSigIn (req,res,next){
    
        const objectSchema = yup.object({
            body: yup.object({
                email: yup.string().email().required(),
                password: yup.string().required(),
            })
        })
       try{
           
        await objectSchema.validate({
            body:{
                email: req.body.email,
                password: req.body.password
            }
        })
        const find = await Users.findOne({where:{'email':req.body.email}});
       
        const _check_mail_verify = new String(find.token)

        if(_check_mail_verify.length != 0){
            return res.status(401).json({message:' please verify you account !'}) 
        }
           
        if(!find){
            return res.status(401).json({message:'email or password invalid!'})
        }
         
        next()
        
       }catch(error){
           return res.status(500).json({type:error.name,message:error.message})
       }
    }
}