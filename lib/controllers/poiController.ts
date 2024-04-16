import { Request, Response } from 'express';
import { IPointOfInterest } from '../modules/pointsOfInterest/model';
import PointsOfInterestService from '../modules/pointsOfInterest/service';
import * as mongoose from 'mongoose';

export class PoiContoller {

    private poiservice: PointsOfInterestService = new PointsOfInterestService();

    public async create_poi(req: Request, res: Response) {
        try{
            // this check whether all the filds were send through the request or not
            if (req.body.title 
                && req.body.coords 
                ) {
                const poi_params: IPointOfInterest = {
                    title: req.body.title,
                    coords:{
                        latitude: req.body.coords.latitude,
                        longitude: req.body.coords.longitude,
                      },
                    creation_date: new Date(),
                    modified_date: new Date(),
                };
                const poi_data = await this.poiservice.createPoI(poi_params);
                return res.status(201).json(poi_data );
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async get_poi(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const poi_filter = { _id: req.params.id };
                // Fetch poi
                const poi_data = await this.poiservice.filterOnePoI(poi_filter);
                // Send success response
                return res.status(200).json(poi_data);
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async get_pois(req: Request, res: Response) {
        try {
            // Extract pagination parameters from query string or use default values
            const page = req.query.page ? parseInt(req.query.page as string) : 1;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
    
            // Fetch users based on pagination parameters
            const poi_data = await this.poiservice.filterPoIs({}, page, pageSize);
    
            // Send success response
            return res.status(200).json(poi_data);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    
    public async update_poi(req: Request, res: Response) {
        try {
            if (req.params.id) {
                const poi_filter = { _id: req.params.id };
                
                const poi_data = await this.poiservice.filterOnePoI(poi_filter);
                const objectid = new mongoose.Types.ObjectId(req.params.id);
    
                
                const poi_params: IPointOfInterest = {
                    _id: objectid, 
                    title: req.body.title || poi_data.title,
                    coords: {
                        latitude: req.body.coords.latitude || poi_data.coords.latitude,
                        longitude: req.body.coords.longitude || poi_data.coords.longitude,
                    },
                    creation_date: poi_data.creation_date,
                    modified_date: new Date(),
                };
                // Update 
                await this.poiservice.updatePoI(poi_params);
                //get new user data
                const new_poi_params = await this.poiservice.filterOnePoI(poi_filter);
                // Send success response
                return res.status(200).json(new_poi_params);
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing ID parameter' });
            }
        } catch (error) {
            // Catch and handle any errors
            console.error("Error updating:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async delete_poi(req: Request, res: Response) {
        try {
            if (req.params.id) {
                // Delete 
                const delete_details = await this.poiservice.deletePoi(req.params.id);
                if (delete_details.deletedCount !== 0) {
                    // Send success response if user deleted
                    return res.status(200).json({ message: 'Successful'});
                } else {
                    // Send failure response if user not found
                    return res.status(400).json({ error: 'User not found' });
                }
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing Id' });
            }
        } catch (error) {
            // Catch and handle any errors
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

}