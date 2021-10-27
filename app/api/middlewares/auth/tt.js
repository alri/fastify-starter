const jwt = require('jsonwebtoken')

module.exports=(req,reply,done)=>{
    //get token
    const token = req.body.apiToken || req.query.apiToken || req.headers['x-access-token'] || req.headers['authorization'];

    // Remove Bearer from string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    //decode token
    if(token)
    {
        // verifies secret and checks exp
        jwt.verify(token, process.env.APP_SECRET, function(err, decoded) {
            if (err) {
                return reply.status(401).send({"status":"error", "message": 'Unauthorized access.' });
            }
            req.decodedToken = decoded; // get token in controller with : req.decodedToken
            res.locals.decodedToken=decoded; // get token in controller with : res.locals.decodedToken
            done();
        });
    }
    else{
        const err = new Error('api token not exist !');
        err.status = 403;
        done(err);
    }
}