import { Application, Request, Response, NextFunction } from 'express';
import { PoiContoller } from 'controllers/poiController';
import  {authJWT}  from '../middlewares/authJWT';
import { AuthController } from '../controllers/authController';

export class PoiRoutes {

    private poi_controller: PoiContoller = new PoiContoller();
    private AuthJWT: authJWT = new authJWT();
    private auth_controller: AuthController = new AuthController();

    public route(app: Application) {
        
        app.post('/poi', (req: Request, res: Response) => {
            this.poi_controller.create_poi(req, res);
        });

        app.get('/poi/:id', (req: Request, res: Response) => {
            this.poi_controller.get_poi(req, res);
        });

        //For the routes The page and pageSize parameters can be provided as query parameters:
        // e.g., /users?page=2&pageSize=10, to specify the page number and the number of users per page. 
        //If these parameters are not provided, default values will be used (page 1, pageSize 10).
        app.get('/poi', (req: Request, res: Response) => {
            this.poi_controller.get_pois(req, res);
        });

        app.put('/poi/:id', (req: Request, res: Response) => {
            this.poi_controller.update_poi(req, res);
        });

        app.delete('/poi/:id', (req: Request, res: Response) => {
            this.poi_controller.delete_poi(req, res);
        });
    }
}
