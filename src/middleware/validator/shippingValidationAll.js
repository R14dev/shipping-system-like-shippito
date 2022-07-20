const yup = require('yup')
class ShippingValidator {

   static async validate_page_params(req,res,next){
    const schema_shipping = yup.object({
        params: yup.object({
            page: yup.number().required(),
            id: yup.number().required()
        }),
    })
    try {
        await schema_shipping.validate({
            params:{
                page: req.params.page,
                id: req.params.id
            }
        })
    } catch (error) {
        return res.status(error.statusCode).json({type:error.name,message:error.message})
    }
    }


    static async validate_user_id (req,res,next){
        const schema = yup.object({
            params: yup.object({
                id_user:yup.number().required(),
                id: yup.number().required()
            })
        })
        try {
            await schema.validate({
                params:{
                    id_user: req.params.id_user,
                    id: req.params.id
                }
            })
            next()
        } catch (error) {
            return res.status(error.statusCode).json({type:error.name,message:error.message})
        }
    }


    static async validate_id(req,res,next){
        try {
            const schema_params = yup.object({params:{id: yup.number().required()}})
            await schema_params.validate({params:{id: req.params.id}})
            next()
        } catch (error) {
            return res.status(error.statusCode).json({type:error.name,message:error.message})
        }
    }

    static async update_status (req,res,next){
        try {
            const schema = yup.object({
                body: yup.object({
                    tracker:yup.string().required(),
                    shipping_id: yup.number().required()
                })
            })
            await schema.validate({
                body:{
                    tracker:req.body.tracker,
                    shipping_id: req.body.shipping_id
                }
            })
            next()
        } catch (error) {
            return res.status(error.statusCode).json({type:error.name,message:error.message})
        }
    }
   static async  shipping_create(req,res,next){

        const schema_shipping = yup.object({
            body:yup.object({
                adress_id: yup.number().required(),
                size: yup.number().required(),
                id_method: yup.number().required(),
                price_total: yup.number().required()
            }),
            params: yup.object({
                user_id: yup.number().required()
            }),
            query: yup.object({
                pg_id: yup.string().required()
            })
        })

        try {

            await schema_shipping.validate({
                body:{
                    adress_id: req.body.adress_id,
                    size: req.body.size,
                    id_method: req.body.id_method,
                    price_total: req.body.price,
                },
                params:{
                    user_id: req.params.user_id
                },
                query:{
                    pg_id: req.query.pg_id
                }
            })
            next()
        } catch (error) {
            return res.status(error.statusCode).json({type:error.name,message:error.message})
        }  
    }


}

module.exports = ShippingValidator