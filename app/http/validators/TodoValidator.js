const Validator = require('validatorjs');

//----setup Validator Extra Work


//------ Begin Validation

const create = async function(request,reply,done){

    const data=request.body;

     const rules = {
        "formContent": "required|alpha",
    }
    const messages ={
        "required.formContent":"فیلد نام کاربری الزامی است",
        "alpha.formContent":"فقط حروف قابل قبول است",
    }

    let validation = await new Validator(data, rules ,messages);

    if(validation.passes())  // true
    done()

    if(validation.fails())  // false
    {
        //ajax call
        if(request.raw.rawHeaders.includes("XMLHttpRequest")){  
            //---check ahax request
             //console.log(req.raw.rawHeaders)
           
            let data={
                'code':422,
                'status':'error',
                'message':'validation errors',
                'validation':validation.errors.all()
            }
            return reply.status(422).send(data)
       }else{
          
           //------------ http request
        //console.log(validation.errors.all())
        for (const property in validation.errors.all()) {
               
                let error = property+"Error"
                request.flash(error,validation.errors.all()[property]);
            }
            reply.redirect('/todo/create')
        }

    } 
}



const update = async function(request,reply,done){

    const data=request.body;

     const rules = {
        "formContent": "required|alpha",
    }
    const messages ={
        "required.formContent":"فیلد نام کاربری الزامی است",
        "alpha.formContent":"فقط حروف قابل قبول است",
    }

    let validation = await new Validator(data, rules ,messages);

    if(validation.passes())  // true
    done()

    if(validation.fails())  // false
    {
         //---check ajax request
        if(request.raw.rawHeaders.includes("XMLHttpRequest")){  
           
            //console.log(req.raw.rawHeaders)
            
           
            let data={
                'code':422,
                'status':'error',
                'message':'validation errors',
                'validation':validation.errors.all()
            }
            return reply.status(422).send(data)
       }else{
            //------ http request

             //console.log(validation.errors.all())
            for (const property in validation.errors.all()) {
               
                let error = property+"Error"
                request.flash(error,validation.errors.all()[property]);
            }

            res.redirect('/todo/update')
        }

    } 
}

module.exports={
    create,
    update,
}