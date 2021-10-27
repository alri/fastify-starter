var server = require('../fastify')

// Run the server!
const start = async () => {

    const port=process.env.APP_PORT || 3000;
    const host=process.env.APP_HOST || "localhost";

    try {
      await server.listen(port,host)
      console.log("################## SERVER RUN ###############")
      console.log("Fastify is Running in : http://"+host+":"+port);
    } catch (err) {
      server.log.error(err)
      await server.close()
      process.exit(1)
    }
  }
  start()