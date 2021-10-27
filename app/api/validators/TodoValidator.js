const validator = requiree('/config/validate');

let create =(request,reply,done)=>{

    const data=request.body;

    const validationRule = {
        "formContent": "required|alpha",
    }
    const messages ={
        "required.formContent":"فیلد نام کاربری الزامی است",
        "alpha.formContent":"فقط حروف قابل قبول است",
    }

    validator(data, validationRule,messages, (err, status) => {
        if (!status) {
            reply.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            done();
        }
    });
}


let update =(request,reply,done)=>{

    const data=request.body;

    const validationRule = {
        "formContent": "required|alpha",
    }
    const messages ={
        "required.formContent":"فیلد نام کاربری الزامی است",
        "alpha.formContent":"فقط حروف قابل قبول است",
    }

    validator(data, validationRule,messages, (err, status) => {
        if (!status) {
            reply.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            done();
        }
    });
}

module.exports={
    create,
    update,
}