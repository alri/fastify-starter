
//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const UserController = requiree('/app/api/controllers/UserController');
const TodoController = requiree('/app/api/controllers/TodoController');

//-------------------------------------------
//---------- Import Middleware & Validator
//-------------------------------------------
const TokenAuthCheck=requiree('/app/api/middlewares/auth/TokenAuthCheck');
const UserValidator= requiree('/app/api/validators/UserValidator')
const TodoValidator= requiree('/app/api/validators/TodoValidator')


//####################################
//####################################
//############ Begin Route    ########
//####################################
//####################################
async function apiRoutes(fastify, opts,done){

    //-----------------------------------------------------
    //---------------- User Routes
    //-----------------------------------------------------
    fastify.post('/login',UserController.loginSubmit);

    const panelOptions={
        preValidation:TokenAuthCheck,
    }
    fastify.post('/user/panel',panelOptions,UserController.panel)


    //-----------------------------------------------------
    //---------------- Todo Routes
    //-----------------------------------------------------
    fastify.get('todo/create', TodoController.create); //for genetare form csrf
    const todoCreateOptions={
        preValidation:TodoValidator.create,
    }
    fastify.post('todo/create',todoCreateOptions, TodoController.createSubmit);

    fastify.get('todo/update',TodoController.update); //for genetare form csrf
    const todoUpdateOptions={
        preValidation:TodoValidator.update,
    }
    fastify.post('todo/update',todoUpdateOptions, TodoController.updateSubmit);

    fastify.get('todo/read', TodoController.read);

    fastify.post('todo/delete/:id', TodoController.delSubmit);


    done()
}

module.exports = apiRoutes