module.exports =  (req, reply, done)=>{
  //console.log("session auth work done !")
  // we can add check user agent
  if (req.session && req.session.get('user') && req.session.get('user').isAdmin  ) {
    done()
  } else {
    const err = new Error('You must be logged in to view this page.');
    err.status = 401;
    done(err);
  }
}