
module.exports={
    useDefaults: true,
    directives: {
        "defaultSrc":["'self'"],
        "imgSrc":["'self'"],
        "scriptSrc" : ["'self'","'unsafe-inline'","'unsafe-eval'"],
        "styleSrc":["'self'","'unsafe-inline'"],
        "objectSrc": ["'none'"],
        "fontSrc":["'self'"],
        "connectSrc": ["'self'","ws://localhost:3000"],
      },
    reportOnly: false,
}