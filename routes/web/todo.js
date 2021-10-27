//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const TodoController = requiree('/app/http/controllers/TodoController');


//-------------------------------------------
//---------- Import Middleware & Validator
//-------------------------------------------
const TodoValidator = requiree("/app/http/validators/TodoValidator.js");




async function todoRoutes(fastify, opts, done) {

    //-------------------------------
    //---------------- Todo Routes
    //-------------------------------

    //------------------- Http 
    fastify.get('/todo/create', TodoController.createForm);
    const todoCreateOptions = {
        preValidation: TodoValidator.create,
    }
    fastify.post('/todo/create', todoCreateOptions, TodoController.create);


    fastify.get('/todo/update/:id(^[0-9]{1,5}$)', TodoController.updateForm);
    const todoUpdateOptions = {
        preValidation: TodoValidator.update,
    }
    fastify.post('/todo/update', todoUpdateOptions, TodoController.update);


    const readSchema = {
        schema: {
            params: {
                type: 'object',
                required: ['page'],
                properties: {
                    page: {
                        type: 'string',
                        pattern: "^[0-9]{1,5}$"
                    }
                }
            }
        }
    }
    fastify.get('/todo/read/:page', readSchema, TodoController.read);
    fastify.post('/todo/delete', TodoController.del);

    fastify.get('/todo/upload', TodoController.uploadForm);
    fastify.post('/todo/upload', TodoController.upload);



    //------------------- JQ Ajax 
    fastify.get('/todo/jq/create', TodoController.jqCreateForm);
    fastify.post('/todo/jq/create', todoCreateOptions, TodoController.jqCreate);

    fastify.get('/todo/jq/update/:id(^[0-9]{1,5}$)', TodoController.jqUpdateForm);
    fastify.post('/todo/jq/update', todoUpdateOptions, TodoController.jqUpdate);

    fastify.get('/todo/jq/read/:page', TodoController.jqRead);
    fastify.post('/todo/jq/delete', TodoController.jqDel);


    //------------------- Vue Ajax 
    fastify.get('/todo/vue', TodoController.vueCurd);
    fastify.post('/todo/vue/create', todoCreateOptions, TodoController.vueCreate);
    /*
    webRoute.get('/todo/vue/update', TodoController.vueUpdateForm);
    webRoute.put('/todo/vue/update', TodoController.vueUpdate);
    */
    fastify.post('/todo/vue/delete', TodoController.vueDelete);


    done()
}

module.exports = todoRoutes