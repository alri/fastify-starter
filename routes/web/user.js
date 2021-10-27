//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const UserController = requiree('/app/http/controllers/UserController');


//-------------------------------------------
//---------- Import Middleware & Validator
//-------------------------------------------
const sessionAuthCheck = requiree("/app/http/middlewares/auth/SessionAuthCheck.js")
const userValidator = requiree("/app/http/validators/UserValidator.js");




async function userRoutes(fastify, opts, done) {

    //-------------------------------
    //---------------- User Routes
    //-------------------------------

    fastify.get('/signin', UserController.signinForm)
    const signinOptions = {
        //onRequest:testMiddle,
        preValidation: userValidator.signin,
    }
    fastify.post('/signin', signinOptions, UserController.signinSubmit);


    fastify.get('/signup', UserController.signupForm);
    const signupOptions = {
        //onRequest:testMiddle,
        preValidation: userValidator.signup,
    }
    fastify.post('/signup', signupOptions, UserController.signupSubmit);


    const panelOptions = {
        onRequest: sessionAuthCheck,
    }
    fastify.get('/user/panel', panelOptions, UserController.panel)


    fastify.get('/signout', UserController.signout);


    done()
}

module.exports = userRoutes