
module.exports = {
    host: process.env.HOSTMAIL,
    port: process.env.PORTMAIL,
    secureConnection: process.env.SECURECONNECTION,
    auth:{
        user: process.env.USERMAILL,
        pass: process.env.PASSWORDMAIL
    }
}