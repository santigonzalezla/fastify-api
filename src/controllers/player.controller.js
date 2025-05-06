import { Player } from "../models/player.model.js";

const getAllPlayers = async (request, reply) =>
{
    try
    {
        const players = await Player.find();
        reply.status(200).send({
            data: players,
            message: "Players fetched successfully",
            success: true
        });
    }
    catch (error)
    {
        reply.status(500).send({
            message: "Error fetching players",
            success: false,
            error: error.message
        });
    }
}

const getPlayerById = async (request, reply) =>
{
    try
    {
        const { id } = request.params;
        const player = await Player.findById(id);

        if (!player)
        {
            return reply.status(404).send({
                message: `Player with id ${id} not found`,
                success: false
            });
        }

        reply.status(200).send({
            data: player,
            message: "Player fetched successfully",
            success: true
        });
    }
    catch (error)
    {
        reply.status(500).send({
            message: "Error fetching player",
            success: false,
            error: error.message
        });
    }
}

const createPlayer = async (request, reply) =>
{
    try
    {
        const player = request.body;
        const newPlayer = await Player.create(player);

        reply.status(201).send({
            data: newPlayer,
            message: "Player created successfully",
            success: true
        });
    }
    catch (error)
    {
        if (error.name === "ValidationError")
        {
            const errors = Object.values(error.errors).map(error => error.message);
            return reply.status(400).send({
                message: `Validation error: ${errors.join(", ")}`,
                success: false,
                error: error.message
            });
        }
        else
        {
            reply.status(500).send({
                message: "Error creating player",
                success: false,
                error: error.message
            });
        }
    }
}

const updatePlayer = async (request, reply) =>
{
    try
    {
        const { id } = request.params;
        const player = request.body;
        const updatedPlayer = await Player.findOneAndUpdate({ _id: id }, player, { new: true, runValidators: true });

        if (!updatedPlayer)
        {
            return reply.status(404).send({
                message: `Player with id ${id} not found`,
                success: false
            });
        }

        reply.status(200).send({
            data: updatedPlayer,
            message: "Player updated successfully",
            success: true
        });
    }
    catch (error)
    {
        if (error.name === "ValidationError")
        {
            const errors = Object.values(error.errors).map(error => error.message);
            return reply.status(400).send({
                message: `Validation error: ${errors.join(", ")}`,
                success: false,
                error: error.message
            });
        }
        else
        {
            reply.status(500).send({
                message: "Error creating player",
                success: false,
                error: error.message
            });
        }
    }
}

const deletePlayer = async (request, reply) =>
{
    try
    {
        const { id } = request.params;
        const player = await Player.findByIdAndDelete(id, { runValidators: true });

        if (!player)
        {
            return reply.status(404).send({
                message: `Player with id ${id} not found`,
                success: false
            });
        }

        reply.status(200).send({
            data: player,
            message: "Player fetched successfully",
            success: true
        });
    }
    catch (error)
    {
        reply.status(500).send({
            message: "Error fetching player",
            success: false,
            error: error.message
        });
    }
}

export {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer
};