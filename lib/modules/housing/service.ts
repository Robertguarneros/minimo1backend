import { ObjectId } from 'mongoose';
import { IHousing } from './model';
import housing from './schema';
import { FilterQuery } from 'mongoose';

export default class HousingService {
    
    public async createHouse(housing_params: IHousing): Promise<IHousing> {
        try {
            const session = new housing(housing_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterOneHouse(query: any): Promise<IHousing | null> {
        try {
            return await housing.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async filterHousing(query: any, page: number, pageSize: number): Promise<IHousing[] | null> {
        try {
            const skipCount = (page - 1) * pageSize;
            const updatedQuery = { ...query, house_deactivated: { $ne: true } };
            return await housing.find(updatedQuery).skip(skipCount).limit(pageSize);
        } catch (error) {
            throw error;
        }
    }
    public async filterHousingEvenDeactivated(query: any, page: number, pageSize: number): Promise<IHousing[] | null> {
        try {
            const skipCount = (page - 1) * pageSize;
            const updatedQuery = { query };
            return await housing.find(updatedQuery).skip(skipCount).limit(pageSize);
        } catch (error) {
            throw error;
        }
    }

    public async updateHousing(housing_params: IHousing): Promise<void> {
        try {
            const query = { _id: housing_params._id };
            await housing.findOneAndUpdate(query, housing_params);
        } catch (error) {
            throw error;
        }
    }

    public async updateSchedule(_id: ObjectId, day: string, updateSchedule: string ): Promise<void>{
        try {
            const exist = await housing.exists({_id});
            if (exist){
                const house = await housing.findById(_id);
                for (const key in house.schedule) {
                    if(Object.prototype.hasOwnProperty.call(house.schedule, key)){
                        if (key === day){
                            house.schedule[day] = updateSchedule;
                        }
                    }
                }
                await house.save();
            }
        } catch (error) {
            throw error;
        }
    }

    public async verifyHouse(_id: ObjectId): Promise<void> {
        try {
            const exist = await housing.exists({_id});
            if (exist){
                const house_verified = housing.findByIdAndUpdate(_id, {verified: true});
            }
        } catch (error) {
            throw error;
        }
    }

    public async deactivateHouse(housing_paramsPartial: Partial<IHousing>, housing_filter: FilterQuery<IHousing>): Promise<void> {
        try {
            await housing.findOneAndUpdate(housing_filter, housing_paramsPartial);
        } catch (error) {
            throw error;
        }
    }

}