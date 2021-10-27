const validator = requiree('/config/validate');


 async function testValidation(request,reply,done){

    const data=req.body;

     const rules = {
        "formUser": "required|string",
        "formPassword": "required|string|min:6",
    }
    const messages ={
        "required.formUser":"فیلد نام کاربری الزامی است",
    }


    //--- Fixed Section
    validator(data, rules, messages, (err, status) => {
        if (!status) {

            for (const property in err.errors) {
               
                let error = property+"Error"
                //console.log(error);
                request.flash(error,err.errors[property]);
            }
            //console.log(req.flash('formFieldError'))
            reply.redirect('/my-address')
        } else {
            done();
        }
    });


}

module.exports={
    testValidation
}