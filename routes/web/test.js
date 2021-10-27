//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const TestController = requiree('/app/http/controllers/TestController');

//-------------------------------------------
//---------- Import Middleware & Validator
//-------------------------------------------


async function testRoutes(fastify, opts, done) {


    //-------------------------------
    //---------------- Test Routes
    //-------------------------------
    fastify.get('test/hello', async function (request, reply) {
            return {
                hello: 'hello world'
            }
        }),

        fastify.get('test/bye', async function (request, reply) {
            return {
                bye: 'good bye'
            }
        })


    //-----------  Mongo DB 
    fastify.get('test/db', TestController.index);
    fastify.get('test/db/insert', TestController.dbInsert);
    fastify.get('test/db/read', TestController.dbRead);
    fastify.get('test/db/read/all', TestController.dbReadAll);
    fastify.get('test/db/update', TestController.dbUpdate);
    fastify.get('test/db/delete', TestController.dbDelete);

    //------------ Session FlashSession
    fastify.get('test/session/set', TestController.setSession);
    fastify.get('test/session/get', TestController.getSession);
    fastify.get('test/flash/set', TestController.setFlash);
    fastify.get('test/flash/get', TestController.getFlash);

    done()
}

module.exports = testRoutes