import { ObjectId } from 'mongodb';

export default class File {
    constructor(
        public file: string,
        public type: string,
        public originalname: string,
        public createdAt: Date,
        public updatedAt: Date,
        public id?: ObjectId,
    ) { }
}
