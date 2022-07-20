const Users = require("../../models/Users/Users");
const bcrypt = require('bcrypt');
const Adress = require("../../models/Adresses/Adress.model");
const Packages = require("../../models/packages/Package.model");
const Ivoice = require("../../models/ivoice/Ivoice.models");
const PackageDetalhes = require("../../models/package_detalhes/PackageDetalhes.model");
const SendMail = require("../../service/Mail/SendMail.mail");
const templates = require("../../utils/templates/templates");
const Auth = require("../../middleware/auth/auth");
const Token = require("../../models/Token/Token");
const AppError = require("../../utils/AppError/AppError");
const { date_exp, getPagination, getDataPagination } = require("../../utils/utils");
class UserController {
    async user_login (req,res){
      
        try {
            
            const {email,password} = req.body;
            const user = await Users.findOne({where:{'email':email}});
           
           
            if(user){
            const user_password_compare = await bcrypt.compare(password,user.password);
            
            if(user_password_compare){

            const token =  await Auth.CreateToken({'user_id':user.id});
            await Token.create({'token':date_exp(7,0),'refreshtoken':token,'user_id':user.id})

            return res.status(200).json({
                token:token,
                user: user.nome,
                email: user.email,
                adress: user.adress,
                phonenumber: user.phonenumber
            })

            }else{
                throw new AppError('email or password invalid !',401)
            }
        }
        }catch(error){
            return res.status(401).json({type:error.name,message:error.message})
        }
    }

    
    async user_register (req,res){
       try {

        const {nome,email,password,adress,phone_number} = req.body;
        const hash = await bcrypt.hash(password,8);
        const tokens = await bcrypt.hash(Math.random()+Date.now().toString(),2);


        const user_create = await Users.create(
            {
                nome,email,
                'password':hash,
                adress,
                phone_number,
                'token':tokens})
        
            new SendMail(
            process.env.Noreply,
            process.env.SITENAME,
            email,templates(nome,`por favor verifica sua conta clicando no link abaixo,para ativar.<br /><a href='${process.env.LINKSITE}/user/${tokens}' style='color:#fff;background:green;font-weight:bold;' />please click here<>`)).init()
       
            return res.status(201).json(user_create);

       } catch (error) {

        return res.status(400).json(
            {
                type:error.name,
                message:error.message
            }
            );
       } 
    }

    async adress_register (req,res){
        try {

        const user_id = req.params.id;

        const data = {
            aptsuite:req.body.aptsuite,
            zip: req.body.zip,
            country: req.body.country,
            phonenumber: req.body.phonenumber,
            alternative: req.body.alternative,
            'user_id': user_id
        }
        const find_user = await Users.findByPk(req.params.id)

        if(!find_user)
            throw new AppError('User not found !',404)

        const adress = await Adress.create(data)
        return res.status(200).json(adress);
        } catch (error) {
            return res.status(401).json({type:error.name,message:error.message})
        }
    }


    async invoice(req,res){
        try {
            const invoice = await Ivoice.findAll({where:
                {user_id:req.params.id,},
                include:[{association:'packages'}]})
                return res.status(200).json({invoice})
        } catch (error) {
            return res.status(401).json({type:error.name,message:error.message})
        }
    }


    async invoice_id (req,res){
        try{
            const get_invoice_by_id = await Ivoice.findOne ({where:{id:req.params.id}})
            
            if(get_invoice_by_id)
                return res.status(200).json({get_invoice_by_id})
            else
                return res.status(404).json({message: "invalid id invoices !"})
        
        }catch(error){
            return res.status().json({type:error.name,message:error.message})
        }
    }


    async package_get (req,res){
        try {
            const package_get = await Packages.findAll({
                where:{
                    id_user:req.params.id,
                    status: 'Ready'
                }
            })
            return res.status(200).json(package_get);
        } catch (error) {
            return res.status(400).json({type:error.name,message:error.message})
        }
    }
    async package_pagination(req,res){
         
        try {

            var page = 1;

            if(req.params.page){
                page = req.params.page;
            }

            const {pages,totalItem} = getPagination(page,10); 

            const user = await Users.findByPk(req.params.id)

            if(user){
                throw new AppError("user not found !",404)
            }

            const packages = await Packages.findAndCountAll({
                where:{
                    user_id: req.params.id
                },
                limit: totalItem,
                offset: pages,
                order:[
                    ['id','DESC']
                ]
            });

            if( !packages){
                throw new AppError("packages  not found ! ",404)
            }

            return res.status(200).json(packages)


        } catch (error) {
            return res.status(400).json({type:error.name,message:error.message})
        }
    }
    async package (req,res){
        try {
         const packages = await Packages.findAll(
             {
             where:{'id_user': req.params.id,status:'Ready'},
             include:[{association:'packageDetalhes'}],
             limit:10,
             offset:10,
             order:[
                 ['id' ,'DESC']
                ]
            })
            const data = getDataPagination(packages,1,10);

            return res.status(200).json(data)

        } catch (error) {
            return res.status(400).json({type:error.name,message:error.message}) 
        }
    }

 async  getSpecialPackage_by_Colletion(req,res){
        try {

            const {colletion} = req.query;
            var Objects_id = (colletion).match(/\d/g);
            var addPackage = []

            for (const key in Objects_id) {
                    const packa_collect = await Packages.findOne({where:{id:Objects_id[key]} , id_user: req.params.id})
                    const detalhes = await PackageDetalhes.findOne({ where:{package_id:packa_collect.id} ,include:[{association:'categories'}]})
                    addPackage.push({"Package":packa_collect,"Description":detalhes})
            }
            return res.status(200).json(addPackage);
        } catch (error) {
            return res.status(401).json({type:error.name,message:error.message}) 
        }
    }
    async package_register(req,res){
        try {


            const { packages_parcel,status,description,size,id} = req.body;

            const user = await Users.findOne({where:{'id':id}});


            if(user){
                throw new AppError("user not found",400)
            }

            const packages = await Packages.create({'package':packages_parcel,status,id,'status':'Ready'})

            

            await PackageDetalhes.create({description,size,'package_id':packages.id})

            new SendMail(process.env.Noreply,'Package arrived ',
            user.email,
            templates(user.name,"Arrived packages in you suite please, check yoc account!")
            ).init()
          
        } catch (error) {
            return res.status(401).json({type:error.name,message:error.message}) 
        }
    }



    async delete_adress (req,res){
        try {

            const delete_adress = await Adress.destroy({where:{id:req.body}})
            
            if(!delete_adress)
               return res.status(400).json({message:'Algo deu errado tente mais tarde !'})

            return res.status(200).json();
       
        } catch (error) {
            return res.status(500).json({type:error.name,message:error.message})
        }
    }
    async package_delete_id(req,res){
        try{

            const pgk_ =   await Packages.destroy({where:{'id':req.params.id},include:[{
                    association: 'packageDetalhes'
            }]})

            if(!pgk_)
                return res.status(400).json({message: "error try later ...."})
            
            return res.status(200).json()
        }
        catch(error){
            return res.status(500).json({type:error.name,message:error.message})
        }
    }
    async package_update(req,res){
        try {

            await Packages.update({'price_package':req.body.price},{where:{id:req.params.id}})

            return res.status(200).json({message:'package update price success !'})

        } catch (error) {
            return res.status(200).json({type:error.name,message:error.message})
        }
    }
    async getadress(req,res){
        try{

        const user_verify = await Users.findOne({where:{id:req.params.id}});
        
        if(!user_verify)
            throw new AppError('user not found !!',404)

        const adress = await Adress.findAll({where:{'id_user':req.params.id}})
        return res.status(200).json(adress)

        }catch (error){
            return res.status(401).json({type:error.name,message:error.message})
        }
    }

}
module.exports = UserController