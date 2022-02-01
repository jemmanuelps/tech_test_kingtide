import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../db.connection';
import File from '../models/file';
import User from '../models/user';

const saveFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.body?.id;
        const query = { _id: new ObjectId(id) };
        const uploadedFile = req?.file;
        if (uploadedFile?.mimetype === 'application/pdf' || uploadedFile?.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const foundUser = await collections.users?.findOne(query) as unknown as User;
            foundUser.updatedAt = new Date();
            const newFile: File = new File(
                uploadedFile?.path ?? '',
                uploadedFile?.mimetype ?? '',
                uploadedFile?.originalname ?? '',
                new Date(),
                new Date()
            );
            if (!foundUser.files) {
                foundUser.files = [];
            }
            foundUser?.files?.push(newFile);
            const result = await collections.users?.updateOne(query, { $set: foundUser });
    
            result
                ? res.status(200).send(`Successfully updated user with id ${id}`)
                : res.status(304).send(`User with id: ${id} not updated`);
        } else {
            res.status(415).send('Format file not allowed');
        }
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    } 
}

const saveProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req?.body?.id;

        const uploadedFile = req?.file;
        if (uploadedFile?.mimetype === 'image/jpeg' || uploadedFile?.mimetype === 'image/png') {
            const query = { _id: new ObjectId(id) };

            const foundUser = await collections.users?.findOne(query) as unknown as User;
            foundUser.profilePicture = uploadedFile?.path;
    
            const result = await collections.users?.updateOne(query, { $set: foundUser });
    
            result
                ? res.status(200).send(`Successfully updated user with id ${id}`)
                : res.status(304).send(`User with id: ${id} not updated`);
        } else {
            res.status(415).send('Format file not allowed');
        }

    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    } 
}

export default { saveFile, saveProfilePicture }
