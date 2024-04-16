import { Application, Request, Response, NextFunction } from 'express';
import { HousingController } from '../controllers/housingController';
import  {authJWT}  from '../middlewares/authJWT';


export class HousingRoutes {

    private housing_controller: HousingController = new HousingController();
    private AuthJWT: authJWT = new authJWT();


    public route(app: Application) {
        
        app.post('/housing', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.housing_controller.create_house(req, res);
            });
        });

        app.get('/housing/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.housing_controller.get_house(req, res);
            });
        });

        app.get('/housing', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.housing_controller.get_housing(req, res);
            });
        });

        app.get('/housing/admin', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.AuthJWT.isAdmin(req, res, (err?: any) => {
                    if (err) {
                        return next(err); // Short-circuit if isAdmin check fails
                    }
                    this.housing_controller.get_housing_even_deactivated(req, res);
                });
            });
        });

        // Update housing by ID
        app.put('/housing/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.AuthJWT.isOwner(req, res, (err?: any) => {
                    if (err) {
                        return next(err); // Short-circuit if isOwner check fails
                    }
                    this.housing_controller.update_house(req, res);
                }, 'Housing');
            });
        });

        // Delete housing by ID
        app.delete('/housing/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.AuthJWT.isOwner(req, res, (err?: any) => {
                    if (err) {
                        return next(err); // Short-circuit if isOwner check fails
                    }
                    this.housing_controller.deactivate_house(req, res);
                }, 'Housing');
            });
        });


    }
}