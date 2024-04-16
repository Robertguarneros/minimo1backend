import { IPointOfInterest } from './model';
import pointsOfInterest from './schema';
import { FilterQuery } from 'mongoose';

export default class PointsOfInterestService {
    
    public async createPoI(poi_params: IPointOfInterest): Promise<IPointOfInterest> {
        try {
            const session = new pointsOfInterest(poi_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterOnePoI(query: any): Promise<IPointOfInterest | null> {
        try {
            return await pointsOfInterest.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async filterPoIs(query: any, page: number, pageSize: number): Promise<IPointOfInterest[] | null> {
        try {
            const skipCount = (page - 1) * pageSize;
            return await pointsOfInterest.find(query).skip(skipCount).limit(pageSize);
        } catch (error) {
            throw error;
        }
    }
    

    public async updatePoI(poi_params: IPointOfInterest): Promise<void> {
        try {
            const query = { _id: poi_params._id };
            await pointsOfInterest.findOneAndUpdate(query, poi_params);
        } catch (error) {
            throw error;
        }
    }

    public async deletePoi(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await pointsOfInterest.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }

}