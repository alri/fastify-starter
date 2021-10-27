
module.exports = function  (req, reply, done) {
    reply.locals = {}
    reply.locals.flashMessage = reply.flash()
    //console.log(reply.locals.flashMessage)
    done();
  };
  