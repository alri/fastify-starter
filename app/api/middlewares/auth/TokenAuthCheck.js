const jwt = require('jsonwebtoken')

module.exports=(req,reply,done)=>{
    //get token
if(req.body!=null)
{
    const token = req.body.apiToken || req.query.apiToken || req.headers['x-access-token'] || req.headers['authorization'];

    //decode token
    if(token)
    {
        // Remove Bearer from string
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        // verifies secret and checks exp
        jwt.verify(token, process.env.APP_SECRET, function(err, decoded) {
            if (err) {
                return reply.status(401).send({"status":"error", "message": 'Unauthorized access ! or token is expired' });
            }
            req.decodedToken = decoded; // get token in controller with : req.decodedToken
            reply.locals = {}
            reply.locals.decodedToken=decoded; // get token in controller with : res.locals.decodedToken
            done();
        });
    }
    else{
        const err = new Error('api token not exist ! . send request with token');
        err.status = 403;
        done(err);
    }
}else{
    const err = new Error('request is not true !');
    err.status = 403;
    done(err);
}
    
}