const validator = requiree('/config/validate');

let signup =(req,res,next)=>{

     const validationRule = {
        "username": "required|string",
        "password": "required|string|min:6|confirmed",
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });

}

module.expots={
    signup,
}