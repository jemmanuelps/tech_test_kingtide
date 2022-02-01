import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../db.connection';
import User from '../models/user';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await collections.users?.find({}).toArray();

        res.status(200).send(result);
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    } 
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.users?.findOne(query);

        if (result) {
            res.status(200).send(result);
        }
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    } 
}

const saveUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = req.body as User;
        newUser.createdAt = new Date();
        newUser.updatedAt = new Date();
        if (!newUser.files) {
            newUser.files = [];
        }

        const result = await collections.users?.insertOne(newUser);

        result
            ? res.status(201).send(`User created with id ${result.insertedId}`)
            : res.status(500).send('Failed to save user')
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    } 
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.params?.id;
    try {
        const updatedUser = req.body as User;
        updatedUser.updatedAt = new Date();

        const query = { _id: new ObjectId(id) };

        const result = await collections.users?.updateOne(query, { $set: updatedUser });

        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    } 
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.users?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(200).send(`Successfully removed user with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`User with id ${id} does not exist`);
        }
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    } 
}

export default { getUsers, saveUser, updateUser, getUserById, deleteUser };