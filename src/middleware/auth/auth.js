const Users = require("../../models/Users/Users");
const jwt = require('jsonwebtoken');
const Token = require("../../models/Token/Token.js");
const AppError = require("../../utils/AppError/AppError");
const { date_exp } = require("../../utils/utils");

class Auth {
   // LEVEL_SYSTEM = [1,2,3]
   static async CreateToken({user_id}) {
       const PrivateKey = process.env.PrivateKey;
       const token = await  jwt.sign({
           user_id: user_id
       },PrivateKey,{
           expiresIn:'1d'
       });
       return token;
   }

   static async auth(req,res,next) {
    try {
        const authorization = req.headers.authorization;
        if(!authorization){
            throw new AppError('Not authenticated',401);
        }
        let token = authorization.split(' ')[1];

        if(token == 'undefined')
            throw new AppError('Not authenticated',401)

        const verify = await jwt.verify(token,process.env.PrivateKey);
        if(verify) {   next();}
    } catch (error) {
       return res.status(401).json({type:error.name,message:error.message})
    }
   }
   static async refreashToken_auth (req,res){

        const authorization = req.body.token || req.query.token || req.headers.authorization;

        if(!authorization){
            throw new AppError('Error token invalid !',401)
        }
        
        const bearer = authorization.split(' ')[1]
        const {user_id} = await jwt.verify(bearer,process.env.PrivateKey);

        try{
            const find_token = await Token.findOne({where:{'refreshtoken':bearer,'user_id':user_id},include:[{association:'Users'}]});
            if(find_token){
                
                const date_fim = new Date(find_token.token).toISOString();
                const date_fim_valid = new String(date_fim).slice(0,10).match(/\d/g).join('');
               
                if(parseInt(date_fim_valid) < parseInt(date_exp(30,1))){
                    await Token.destroy({where:{id:find_token.id}})
                    throw new AppError('token expired or invaliid !')
                }
                await Token.destroy({where:{id:find_token.id}})
                const PrivateKey = process.env.PrivateKey;
                const token_new =  await jwt.sign({user_id},`${PrivateKey}`,{
                    expiresIn:"1d"
                })
                await Token.create({'token':date_exp(1,0),'refreshtoken':token_new,'user_id':user_id})
    
                return res.status(200).json(token_new);
            }else{
                throw new AppError('token expired or invaliid !')
            }
        }catch(error){
          return  res.status(401).json({type:error.name,message:error.message})
        }
        
   }
  
}
module.exports = Auth;