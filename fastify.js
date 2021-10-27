require('dotenv').config();
const path = require('path'),
      fs = require('fs'),
      POV = require('point-of-view'),          //-- template config
      helmet = require('fastify-helmet'),      //-- helmet security
      nunjucks = require('nunjucks'),          //-- template engine
      fastifyStatic =require('fastify-static'), //-- serve public folder 
      favicon =require('fastify-favicon'),
      minifier = require('html-minifier'),     //-- minify html
      cors = require('fastify-cors'),
      fastifySecureSession = require('fastify-secure-session'),
      fastifyFlash = require('fastify-flash'),
      fastifyAuth = require('fastify-auth'),
      fileUpload = require('fastify-file-upload'),
      helper  = require('./config/helper.js'),  //--template helper
      csp = require('./config/csp.js'); //-- for helmet config


//##################################################
//########## Starter Config ############
//##################################################


const fastify = require('fastify')({
        logger: {
                prettyPrint: true,
                level: 'error',
              }
})

global.requiree = require('app-root-path').require;



//##################################################
//########## Request ############
//##################################################

//form
fastify.register(require('fastify-formbody'))


//session
fastify.register(fastifySecureSession, {
        // the name of the session cookie, defaults to 'session'
        //cookieName: 'sessionId',
        // adapt this to point to the directory where secret-key is located
        key: fs.readFileSync(path.join(__dirname, 'secret-key')),
        cookie: {
         
          path: '/',
          httpOnly: true,
          secure:false, //true with https
          maxAge:10*60
        },
      }) 

//session flash
fastify.register(fastifyFlash)

//file
fastify.register(fileUpload, {
        limits: { fileSize: 50 * 1024 * 1024 },
});


//##################################################
//########## Template Engine ############
//##################################################
// Set Static files path
fastify.register(fastifyStatic, {
        root: path.join(__dirname, 'public'),
})

//fav icon
fastify.register(favicon,{
        path:  path.join(__dirname, '/public'), name: 'favicon.ico'
})

// configure template
fastify.register(POV, {
        engine: {
                nunjucks:nunjucks,
        },
        includeViewExtension: true,
        root: path.join(__dirname, '/resources/views'),
        options: {
                onConfigure: (env) => {
                        // do whatever you want on nunjucks env
                        // add helper for template
                        env.addGlobal('url', helper.url);
                        env.addGlobal('css', helper.css);
                        env.addGlobal('js', helper.js);
                        env.addGlobal('img', helper.img);
                        env.addGlobal('cssSpa', helper.cssSpa);
                        env.addGlobal('jsSpa', helper.jsSpa);
                        env.addGlobal('imgSpa', helper.imgSpa);
                        env.addGlobal('dist', helper.dist);
                        env.addGlobal('test', helper.test);
                        env.addFilter('shorten', function(str, count) {
                                return str.slice(0, count || 5);
                        });
                        
                },
                useHtmlMinifier: minifier,
                htmlMinifierOptions:{
                        removeComments: true,
                        removeCommentsFromCDATA: true,
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true,
                        removeAttributeQuotes: true,
                        removeEmptyAttributes: true
                }
        }
})

//##################################################
//########## Security & Auth ############
//##################################################
//helmet

fastify.register(helmet,{
        contentSecurityPolicy:false,

})

fastify.register(cors, { 
        // put your options here
        origin: "*",
        methods: ["POST","GET"]
      })


fastify.register(fastifyAuth)

//##################################################  
//##################################################
//########## Use Application Hook & Plugin & Decorator ############
//##################################################
//##################################################
   

//##################################################
//########## import Routes & Use Routes ############
//##################################################

const webRoute= require('./routes/web');
const apiRoute= require('./routes/api');


fastify.register(apiRoute,{prefix:'/api/v1/'});
fastify.register(webRoute,{prefix:'/'});




//##################################################
//########## Error Handler & Logger ############
//##################################################


//--- error handeling
fastify
  .register(require('fastify-sensible'))
  .after(() => {
    fastify.setErrorHandler(function (error, request, reply) {
         // Log error
        this.log.error(error)
        // Send error
        reply.send(error)
    })
  })



module.exports = fastify;