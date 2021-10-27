//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const HomeController = requiree('/app/http/controllers/HomeController');


//-------------------------------------------
//---------- Import Middleware & Validator
//-------------------------------------------

async function homeRoutes(fastify, opts, done) {

    //-------------------------------
    //---------------- Home Routes
    //-------------------------------

    fastify.get('/', HomeController.index),
    fastify.get('spa', HomeController.spa);

    done()
}

module.exports = homeRoutes