const Packages = require("../../models/packages/Package.model");
const Shippings = require("../../models/Shippings/Shippings");
const Users = require("../../models/Users/Users");
const SendMail = require("../../service/Mail/SendMail.mail");
const AppError = require("../../utils/AppError/AppError");
const { getPagination, getDataPagination } = require("../../utils/utils");

module.exports = class Shipping {

    static async Create_Shipping_parcel(req,res){
        try {
            const data = {
                user_id: req.params.user_id,
                pg_id: req.query.pg_id,
                id_method:req.body.id_method,
                adress_id: req.body.adress_id,
                size: req.body.size,
                price_total: req.body.price,
                status: 'Progress'
            }

            var colletion  = req.query.pg_id;
            var Objects_id = (colletion).match(/\d/g);
            for (const key in Objects_id) {
                await Packages.update({status:'send'},{where:{id:Objects_id[key]}})
            }

        await Shippings.create(data)


        return res.status(201).send()
        } catch (error) {
            return res.status(500).json({type:error.name,message:error.message})
        }
    }

    static async getAllshippingPagination(req,res){
        try {
            var page = 1;
            if(req.params.page){
                page = req.params.page;
            }
            const {pages,totalItem} = getPagination(page,10);

            const packages_shipping = await Shippings.findAndCountAll({
                where:{
                    user_id: req.params.id
                },
                limit:totalItem,
                offset: pages,
                order:[
                    ['id','DESC']
                ],
                include:[{association:'adresses',association:'users',association:'method_shipping'}]
            })

            if(!packages_shipping)
                throw new AppError("not found !",404) 

            const data = getDataPagination(packages_shipping,page,pages)
       
            return res.status(200).json(data)

        } catch (error) {
            return res.status(500).json({type:error.name,message:error.message})
        }
    }
    static async getAllshipping(req,res){
        try {
            const allshipping = await Shippings.findAndCountAll(
                {where:{user_id:req.params.id},
                include:[
                    {
                        association:'users',
                        association:'packages',
                        association: 'adresses',
                        association: 'method_shipping'
                        
                    }],
                limit:10,offset:0
            })
            const Pagination = getDataPagination(allshipping,1,10);
            if(!allshipping)
                throw new AppError('not package found !',404)

            return res.status(200).json(Pagination)

        } catch (error) {
            return res.status(500).json({type:error.name,message:error.message})
        }
    }

    static async update_shipping(req,res){
        try{

            const {tracker,shipping_id} = req.body;

            const update_shipping_status = await Shippings.findOne({id:shipping_id})
            
            if(!update_shipping_status)
                throw new AppError('error shipping not found !!')
            
            await Shippings.update({tracker:tracker,status:'send'},{where:{id:shipping_id}})

            const user = await Users.findByPk(update_shipping_status.user_id)

            new SendMail(process.env.Noreply,'Shipping order status',
            user.email,
            templates(user.name,`Thanks , you order#${shipping_id} as updated check you account !`)
            ).init()

            return res.status(201).send()

        }catch(error){
            return res.status(500).json({type:error.name,message:error.message})   
        }
    }
    static async getProgressPagination(req,res){
        try {
            let page = 1;
            if(req.params.page){
                page = req.params.page;
            }

            page - 1;

            const {pages,totalItem} = getPagination(page,10);

            const packages_shipping = await Shippings.findAndCountAll({
                where:{
                    user_id: req.params.id,
                    'status':'Progress'
                },
                limit:totalItem,
                offset: pages,
                order:[
                    ['id','DESC']
                ]
            })

            if(!packages_shipping)
                throw new AppError("not found !",404) 

            const data = getDataPagination(packages_shipping,page,pages)
       
            return res.status(200).json(data)


        } catch (error) {
            return res.status(500).json({type:error.name,message:error.message})
        }
    }
    static async getProgress(req,res){
        try {

            const pakage_count = await Shippings.findAndCountAll(
                {  
                    limit:10,
                    offset:0, 
                    where:{
                        user_id: req.params.id,
                        'status':'Progress'
                    }
                    }
            )

            if(pakage_count)
                throw new AppError("no package in progress",404)
            
            const Pagination = getDataPagination(pakage_count,1,10);
                        
            return res.status(200).json(Pagination)
        
        } catch (error) {
            return res.status(500).json({type:error.name,message:error.message})
        }      
    }

    static async GetShipping_by_id(req,res){
       try{
   
            const get_shiping = await Shippings.findOne({where:{
                'user_id':req.params.id_user,
                'id':req.params.id
            },include:[
                {
                    association: 'adresses',
                    association: 'method_shipping'
                }]})


            if(!get_shiping){
                throw new AppError('package not found !!',404)
            }


            return res.status(200).json(get_shiping)

       }catch(error){
        return res.status(error.statusCode).json({type:error.name,message:error.message})
       }
    }
}