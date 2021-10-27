const path = require('path'),
    autoload = require('fastify-autoload'); //-- for load plugins


//-------------------------------------------
//---------- Import Public Web Middleware & Hook
//-------------------------------------------
const flashMessage = requiree("/app/http/middlewares/session/FlashMessage.js");
const testMiddle = requiree("/app/http/middlewares/Test.js");


async function webRoutes(fastify, opts, done) {


    //-------------------------------------------
    //----------- Add Hook To All Routes
    fastify.addHook('preHandler', flashMessage)


    //-----------------------------------------------------
    //-------------------- Import HTTP Routes
    fastify.register(autoload, {
        dir: path.join(__dirname, 'web')
    })


    done()
}

module.exports = webRoutes