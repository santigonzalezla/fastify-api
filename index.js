import Fastify from 'fastify';
import dotenv from 'dotenv';
import { connectDB } from "./src/database/database.js";
import routes from "./src/routes/routes.js";

const fastify = Fastify({ logger: true });
dotenv.config();

fastify.register(routes, { prefix: "/api/players" });

const start = async () =>
{
    try
    {
        await connectDB(process.env.MONGU_URI);
        await fastify.listen({ port: process.env.PORT || 5000 });
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    }
    catch (err)
    {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();