import { ObjectId } from 'mongodb';
import File from './file';

export default class User {
    constructor(
        public _id: ObjectId,
        public name: string,
        public lastName: number,
        public surName: string,
        public rfc: string,
        public birthday: Date,
        public createdAt: Date,
        public updatedAt: Date,
        public profilePicture?: string,
        public files?: File[]
    ) { }
}
