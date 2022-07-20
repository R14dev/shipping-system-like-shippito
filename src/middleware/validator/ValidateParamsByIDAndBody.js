
const yup = require('yup')
module.exports = class ValidateParamsByIDAndBody{
    static async  Package_singup (req,res,next){
        const packageSchema = yup.object({
            body: yup.object({
                package_parcel: yup.string().required(),
                status: yup.string().required(),
                description: yup.string().required(),
                size: yup.string().required(),
                id: yup.number().required()
            })
        })
       try {
        await packageSchema.validate(req.body);   
        next();
       } catch (error) {
           return res.status(500).json({type:error.name,message:error.message})
       }  
    }
    //const {aptsuite,zip,country,phonenumber,alternative} = req.body;
    static async _adress_validate(req,res,next){
        const adressSchema = yup.object({
            body: yup.object({
                aptsuite: yup.string().required(),
                zip: yup.string().required(),
                country: yup.string().required(),
                phonenumber: yup.string().required(),
                alternative:yup.string()
            })
        })
        try{ 
        await adressSchema.validate({
            body:{
                aptsuite: req.body.aptsuite,
                zip: req.body.zip,
                country: req.body.country,
                phonenumber: req.body.phonenumber,
                alternative:req.body.alternative
            }
        })
        next()
        }catch(error){
            return res.status(500).json({type:error.name,message:error.message})
        }
    }
    static async update_package_price(req,res,next){
        const schema = yup.object({
            body: yup.object({
                price: yup.number().required()
            }),
            params: yup.object({
                id: yup.number().required()
            })
        })
        try{
            await schema.validate(
                {body: {price: req.body.price}},
                {params: { id: req.params.id }})
            next()
        }catch(error){
            return res.status(500).json({type:error.name,message:error.message})
        }
    }
    static async validate_id_params (req,res,next){
        try{
            const packages_chema = yup.object({
                params: yup.object({
                   id: yup.number().required() 
                })
            })
            await packages_chema.validate({params:{id: req.params.id}})
            next()
        }catch(error){
            return res.status(500).json({type:error.name,message:error.message})
        }
    }
}