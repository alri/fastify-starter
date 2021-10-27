//-----------------------------------------
//-----------------------------------------
//------------- HTTP TodoController
//------------------------------------------
//-----------------------------------------


//--------------------------
//------- import Models & Libs
//--------------------------
const path = require('path');
const Todo = requiree('./models/TodoModel')


//--------------------------------------
//----------- Todo Controller Functions
//---------------------------------------

//-------------------------HTTP
function index(req,reply)
{
    reply.view('index.njk');
}

function createForm(req,reply)
{
    reply.view('todo/create.njk');
}

async function create(req,reply)
{
    const record= new Todo({
        'content':req.body.formContent
    })

    try{
        let doc = await record.save();
        req.flash('success','رکورد ایجاد شد');
        return reply.redirect('/todo/create')
    }catch(er){
        //console.log(pe.render(err));
        //res.end("See Error In Console !")
        req.flash('error','رکورد از قبل وجود دارد');
        return reply.redirect('/todo/create')
    }
}

async function read(req,reply)
{
    //--------- check curent page and pages
    (req.params.page) ? curentPage=req.params.page : curentPage=1
    
    try{

        //--------------pagination
        const options = {
            page: curentPage,
            limit: 5,
          };
        let result = await Todo.paginate({},options);
         
        //console.log(result)
        
        //redirect if page not found
        if(curentPage > result.totalPages){
           return reply.redirect('/todo/read');
        }
        

        //----------- create response
        let data={
            pagination:result,
            route:'todo/read'
        }
        //console.log(result)
        return reply.view("todo/read.njk",data);
        
    }catch(err){
        //console.log(pe.render(err));
        return new Error(err)
    }
    
}

async function updateForm(req,reply)
{
    try{
        let doc = await Todo.findOne({id:req.params.id})
        let data={
            doc:doc
        }
        return reply.view("todo/update.njk",data)
    }catch(err){
        console.log(err)
        return reply.send("See Error In Console !")
    }
}

async function update(req,reply)
{
    const address="/todo/update/"+req.body.id
    try{
        let doc = await Todo.findOneAndUpdate({
                id:req.body.id
            },{
                content:req.body.formContent
            },{
                new: true, 
                runValidators: true,
                context: 'query'
            })

        data={
            doc:doc
        }
       
        req.flash('success','رکورد ویرایش شد');
        reply.redirect(address)

    }catch(err){
        //console.log(pe.render(err))
        //res.end("See Error In Console !")
        req.flash('error','این نام قبلا انتخاب شده است');
        reply.redirect(address)
    }
    
}

async function del(req,reply)
{
    // check ajax request
    if(req.raw.rawHeaders.includes("XMLHttpRequest")){    
        
        const id = req.body.formId


        try{
            let doc = await Todo.findOneAndRemove({
                id:id
            })

            let data={
                "code":"200",
                "status":"success",
                "message":"عملیات حذف انجام شد",
                "id":id
            }

            return reply.status(200).send(data)

        }catch(err){
             //console.log(pe.render(err))
             //res.end("See Error In Console !")
            let data={
                "code":"500",
                "status":"error",
                "message":"عملیات حذف انجام نشد",
            }
           return reply.status(500).send(data)
        }
       
    }
    return 2
}


function uploadForm(req,reply){
    reply.view("todo/upload")
}

function upload(req,reply){

    
    //--- check exist file
    if (!req.raw.files || Object.keys(req.raw.files).length === 0) {
        req.flash('error','فایلی برای آپلود یافت نشد');
        return reply.redirect('upload')
    }

    //console.log(req.raw.files)
    

    let file = req.raw.files.formFile;
    console.log(file)

    try{
        let uploadDir= path.join('public/files/') + file.name
        file.mv(uploadDir);

        req.flash('success','فایل آپلود شد');
        reply.redirect('upload')

    }catch(err){
         console.log(err)
         res.end("See Error In Console !")
        //req.flash('error','این نام قبلا انتخاب شده است');
       // req.session.save(()=>{res.redirect('back');})
    }

}

//-------------------------------------------------
//--------------------------------JQ
//-------------------------------------------------

function jqCreateForm(req,reply)
{
    reply.view('todo/jq/create.njk');
}

async function jqCreate(req,reply)
{
    // ajax request
    if(req.raw.rawHeaders.includes("XMLHttpRequest")){  
         /*
        //----- server side validation
        let errors=["خطای اول","خطای دوم"]
        let data={
            "code":"200",
            "status":"error",
            "type":"server side validation",
            "message":"عملیات ایجاد انجام نشد",
            "errors":errors
        }
        return res.status(200).json(data)
        */

        //----------- DB
        const record= new Todo({
            'content':req.body.formContent
        })
    
        try{
            let doc = await record.save();

            let data={
                "code":"200",
                "status":"success",
                "message":"رکورد جدید ایجاد شد",
            }
            reply.status(200).send(data)
        }catch(er){
            let data={
                "code":"500",
                "status":"error",
                "type":"database error",
                "message":"رکورد قبلا ایجاد شده است",
            }
            reply.status(500).send(data)
        }
    }

}

async function jqRead(req,reply)
{
    //--------- check curent page and pages
    (req.query.page) ? curentPage=req.query.page : curentPage=1
       
    try{

        //--------------pagination
        const options = {
            page: curentPage,
            limit: 5
          };
        let result = await Todo.paginate({},options);
        
         //console.log(result)
        
        //redirect if page not found
        if(curentPage > result.totalPages){
           return reply.redirect('/todo/jq/read');
        }
        
        //console.log(result)

        //----------- create response
        let data={
            pagination:result,
            route:'todo/jq/read'
        }


        // ajax request
        if(req.raw.rawHeaders.includes("XMLHttpRequest")){  
            //console.log(req.raw.rawHeaders)
            //return "ajax"
            return reply.status(200).send(data)
        }else{
           //return "http" 
           return reply.view("todo/jq/read.njk",data);
        }
        
    }catch(err){
        console.log(err);
        return reply.send("See Error In Console !")
    }

}

async function jqUpdateForm(req,reply)
{
    try{
        let doc = await Todo.findOne({id:req.params.id})
        let data={
            doc:doc
        }
        return reply.view("todo/jq/update.njk",data)
    }catch(err){
        console.log(err)
        return reply.send("See Error In Console !")
    }
}

async function jqUpdate(req,reply)
{
    if(req.raw.rawHeaders.includes("XMLHttpRequest")){  
        /*
       //----- server side validation
       let errors=["خطای اول","خطای دوم"]
       let data={
           "code":"200",
           "status":"error",
           "type":"server side validation",
           "message":"عملیات ایجاد انجام نشد",
           "errors":errors
       }
       return res.status(200).json(data)
       */

       //----------- DB
   
       try{
            let doc = await Todo.findOneAndUpdate({
                id:req.body.id
            },{
                content:req.body.formContent
            },{
                new: true, 
                runValidators: true,
                context: 'query'
            })

           let data={
               "code":"200",
               "status":"success",
               "message":"رکورد ویرایش شد",
               "id":doc.id
           }
           return reply.status(200).send(data)
       }catch(err){
        //console.log(pe.render(err))
        //res.end("See Error In Console !")
           let data={
               "code":"500",
               "status":"error",
               "type":"database error",
               "message":"این نام قبلا رزرو شده است",
           }
          return reply.status(500).send(data)
       }
   }
}

async function jqDel(req,reply)
{
    if(req.raw.rawHeaders.includes("XMLHttpRequest")){  

        const id = req.body.formId

        try{
            let doc = await Todo.findOneAndRemove({
                id:id
            })

            let data={
                "code":"200",
                "status":"success",
                "message":"عملیات حذف انجام شد",
                "id":id
            }

            return reply.status(200).send(data)

        }catch(err){
            let data={
                "code":"500",
                "status":"error",
                "message":"عملیات حذف انجام نشد",
            }
            return reply.status(500).send(data)
        }
       
    }
}


async function vueCurd (req,reply){

    //--- get contents
    try{
        let contents = await Todo.find()
        let data={
            contents:contents
        }
        return reply.view('todo/vue/curd.njk',data);

    }catch(err){
        console.log(pe.render(err))
        return reply.send("See Error In Console !")
    }
}

async function vueCreate(req,reply)
{
    if(req.raw.rawHeaders.includes("XMLHttpRequest")){  
         /*
        //----- server side validation
        let errors=["خطای اول","خطای دوم"]
        let data={
            "code":"200",
            "status":"error",
            "type":"server side validation",
            "message":"عملیات ایجاد انجام نشد",
            "errors":errors
        }
        return res.status(200).json(data)
        */

        //----------- DB
        const record= new Todo({
            'content':req.body.formContent
        })

    
        try{
            let doc = await record.save();
            let contents = await Todo.find();

            let data={
                "code":"200",
                "status":"success",
                "message":"رکورد جدید ایجاد شد",
                "contents":contents
            }
             reply.status(200).send(data)
        }catch(err){
            console.log(err)
            let data={
                "code":"500",
                "status":"error",
                "type":"database error",
                "message":"رکورد قبلا ایجاد شده است",
            }
             reply.status(200).send(data)
        }
    }

}


async function vueDelete(req,reply)
{
    if(req.raw.rawHeaders.includes("XMLHttpRequest")){  

        const id = req.body.formId

        try{
            let doc = await Todo.findOneAndRemove({
                id:id
            })

            let contents = await Todo.find();

            let data={
                "code":"200",
                "status":"success",
                "message":"عملیات حذف انجام شد",
                "contents":contents
            }

            return reply.status(200).send(data)

        }catch(err){
            let data={
                "code":"500",
                "status":"error",
                "message":"عملیات حذف انجام نشد",
            }
            return reply.status(500).send(data)
        }
       
    }
}

//---------------------------- Export Controller
module.exports={
    index,
    createForm,
    create,
    read,
    updateForm,
    update,
    del,
    uploadForm,
    upload,
    jqCreateForm,
    jqCreate,
    jqRead,
    jqUpdateForm,
    jqUpdate,
    jqDel,
    vueCurd,
    vueCreate,
    vueDelete
}