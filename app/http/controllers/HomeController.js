//-----------------------------------------
//-----------------------------------------
//------------- HTTP HomeController
//------------------------------------------
//-----------------------------------------


//--------------------------
//------- import Libs & Models
//--------------------------


//--------------------------------------
//----------- Home Controller Functions
//---------------------------------------

function index(request,reply)
{
    let data={
        'mongo':'MongoDB',
        'fastify':'Fatify',
        'vue':'VueJS',
        'node':'NodeJS'
    }

    return reply.view('index.njk',data);
}

function spa(request,reply)
{
    //reply.send("test");
    return reply.view('layouts/spa/master.njk');
}

function test(request,reply)
{
   return reply.send("test");
}

function checkLogin(req,res)
{
   return reply.send("test");
}

//---------------------------- Export Controller
module.exports={
    index,
    spa,
    test,
    checkLogin
}