const Validator = require('validatorjs');

//----setup Validator Extra Work
const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[-# -/:-@\[-`{-~]).{6,64}$/;

Validator.register('password_policy', value => passwordRegex.test(value),
    'انتخاب یک عدد و یک کاراکتر خاص نظیر @ الزامی است');


//------ Begin Validation

async function testValidation(request,reply,done){

    const data=request.body;

     const rules = {
        "formUser": "required|string",
        "formPassword": "required|string|min:6|confirmed",
    }
    const messages ={
        "required.formUser":"فیلد نام کاربری الزامی است",
    }

    let validation = await new Validator(data, rules ,messages);

    if(validation.passes())  // true
    done()

    if(validation.fails())  // false
    {
        if(req.raw.rawHeaders.includes("XMLHttpRequest")){  
            //---check ajax request
            //console.log(req.raw.rawHeaders)
           
            let data={
                'code':422,
                'status':'error',
                'message':'validation errors',
                'validation':validation.errors.all()
            }
            return reply.status(422).json(data)
       }else{
           //---------- http request
        //console.log(validation.errors.all())
        for (const property in validation.errors.all()) {
               
                let error = property+"Error"
                //console.log(error);
                request.flash(error,validation.errors.all()[property]);
            }

         reply.redirect('/my-address')
        }
    } 
}

module.exports={
    testValidation
}