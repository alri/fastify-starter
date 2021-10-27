//-----------------------------------------
//-----------------------------------------
//------------- HTTP SampleController
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- import Models & Libs
//--------------------------
const faker = require("faker");
const Sample = requiree('/models/SampleModel');

//--------------------------------------
//----------- Test Controller Functions
//---------------------------------------

function index(req, reply) {
    return (faker.name.findName())
}


//------------------------------------------
//------------------------------------------
//----------------- Session & Flash Message
//------------------------------------------
//------------------------------------------
async function setSession(request,reply){
    request.session.set('user',{username:'alireza',password:'58300'})
    return "User Session Is Set"
} 

async function getSession(request,reply){

    return {
        'msg':"cookie is live",
        'user':request.session.get('user'),
    }
    
} 

function setFlash(req,reply){
    req.flash('info', 'Welcome back Message')
    reply.redirect('/sample/flash/get')

}
async function getFlash(req,reply){
 
        //or
    /*
            const flash=reply.flash('info')
            if(flash.length!=''){
                return message
            }else{
                return "Flash Message Not Exist !"
            }
        
     */
        //or
        reply.view('test/flash.njk');
 
}



//------------------------------------------
//------------------------------------------
//----------------- Database
//------------------------------------------
//------------------------------------------
async function dbInsert(req, reply) {   
    //'name': faker.name.firstName(),
    //'familly': faker.name.lastName()
    try {
        const record = new Sample({
            'name': faker.name.firstName(),
            'familly': faker.name.lastName()
        });
        let doc = await record.save()
        return(doc);

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }

}


async function dbRead(req, reply) {
    try {
        let doc = await Sample.find({
            name: 'alirezaa' // search query
        })
        if(doc.length!=0){
            reply.send(doc)
        }else{
            return({'message':'not record find'})
            //reply.send({'message':'not record find'})
        }
        

    } catch (err) {
        reply.send(err)
    }
}


async function dbReadAll(req, reply) {
    try {
        let docs = await Sample.find()
        if(docs.length!=0){
            reply.send(docs)
        }else{
            return({'message':'not records find'})
            //reply.send({'message':'not record find'})
        }
    } catch (err) {
        reply.send(err)
    }
}


async function dbUpdate(re, reply) {
    try {

        let doc = await Sample.findOneAndUpdate({
            id: 1 // search query
        }, {
            name: 'alri' // field:values to update
        }, {
            new: true, // return updated doc
            runValidators: true // validate before update
        })
        reply.send(doc)

    } catch (err) {
        return err
    }

}



async function dbDelete(re, reply) {
    try {
        let doc = await Sample.findOneAndRemove({
            name: 'alireza'
        })
        reply.send(doc)

    } catch (err) {
        return err
    }

}

//------------------------------------------
//------------------------------------------
//----------------- Promise
//------------------------------------------
//------------------------------------------
function dbInsertPromise(req, reply) {
    const record = new Sample({
        'name': 'alireza',
        'familly': 'abyari'
    });

    record.save()
        .then(doc => {
            reply.send(doc);
        })
        .catch(err => {
            reply.send(err);
        })
}


function dbReadPromise(req, reply) {
    Sample
        .find({
            name: 'alireza' // search query
        })
        .then(doc => {
            reply.send(doc)
        })
        .catch(err => {
            reply.send(err)
        })

}

function dbUpdatePromise(re, reply) {
    //---------- find one record
    Sample
        .findOneAndUpdate({
            name: 'alireza' // search query
        }, {
            name: 'alri' // field:values to update
        }, {
            new: true, // return updated doc
            runValidators: true // validate before update
        })
        .then(doc => {
            reply.send(doc)
        })
        .catch(err => {
            console.error(err)
        })

}



function dbDeletePromise(req, reply) {
    //----- find one record
    Sample
        .findOneAndRemove({
            name: 'alireza'
        })
        .then(doc => {
            reply.send(doc)
        })
        .catch(err => {
            console.error(err)
        })

}

//---------------------------- Export Controller
module.exports = {
    index,
    setFlash,
    getFlash,
    setSession,
    getSession,
    dbInsert,
    dbRead,
    dbReadAll,
    dbUpdate,
    dbDelete,
    dbInsertPromise,
    dbReadPromise,
    dbUpdatePromise,
    dbDeletePromise
}

//##########################################
//######################################
//####################### Use Service Model
//######################################
//###########################################

const SampleService = requiree("./app/services/SampleService");

 class SampleController{

    static async apiGetAllSamples(req, reply){
        try {
          const samples = await SampleService.getAllArticles();
          if(!samples){
             res.status(404).json("There are no article published yet!")
          }
          reply.json(samples);
        } catch (error) {
            reply.status(500).json({error: error})
        }
 
    }
 
    static async apiGetSampleById(req, reply){
       try {
          let id = req.params.id || {};
          const sample = await SampleService.getSamplebyId(id);
          reply.json(sample);
       } catch (error) {
        reply.status(500).json({error: error})
       }
    }
 
    static async apiCreateSample(req, reply){
       try {
          const createdSample =  await SampleService.createSample(req.body);
          reply.json(createdSample);
       } catch (error) {
        reply.status(500).json({error: error});
       }
    }
 
    static async apiUpdateArticle(req, reply){
       try {
          const comment = {}
          comment.title        = req.body.title;
          comment.body         = req.body.body;
          comment.articleImage = req.body.article_image
 
          const updatedSample = await SampleService.updateSample(comment);
 
          if(updatedSample.modifiedCount === 0){
             throw new Error("Unable to update article, error occord");
          }
 
          reply.json(updatedSample);
 
       } catch (error) {
        reply.status(500).json({error: error});
       }
    }
 
    static async apiDeleteSample(req, reply){
          try {
             const sampleId = req.params.id;
             const deleteResponse =  await SampleService.deleteSample(sampleId)
             reply.json(deleteResponse);
          } catch (error) {
            reply.status(500).json({error: error})
          }
    }
 
 }
 
