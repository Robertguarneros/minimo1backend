import * as mongoose from 'mongoose';

export interface IPointOfInterest {
    _id?: mongoose.Types.ObjectId; // Optional _id field
    title: string;
    reviews?: mongoose.Types.ObjectId[];
    coords: {
        latitude: number;
        longitude: number;
    };
    creation_date: Date;
    modified_date: Date;
}