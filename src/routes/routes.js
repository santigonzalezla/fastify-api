import {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer
} from "../controllers/player.controller.js";

const routes = async (fastify, options) =>
{
    fastify.get("/", getAllPlayers);
    fastify.get("/:id", getPlayerById);
    fastify.post("/", createPlayer);
    fastify.patch("/:id", updatePlayer);
    fastify.delete("/:id", deletePlayer);
}

export default routes;