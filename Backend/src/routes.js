import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import FileController from './app/controllers/FileController';
import CouriersController from './app/controllers/CouriersController';
import OrdersController from './app/controllers/OrdersController';
import DeliveryManController from './app/controllers/DeliveryManController';
import ProblemsController from './app/controllers/ProblemsController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get(
  '/deliveryman/:id/pendingdeliveries',
  DeliveryManController.indexPending
);
routes.get(
  '/deliveryman/:id/completeddeliveries',
  DeliveryManController.indexCompleted
);
routes.get('/problems/:id', ProblemsController.indexId);
routes.post('/problems', ProblemsController.store);
routes.get('/couriers/:id', CouriersController.getByid);
routes.get('/order/:id', OrdersController.getById);
routes.put('/orders/:id', OrdersController.updateDates);
routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);
routes.get('/orders', OrdersController.index);
routes.get('/problemorder', OrdersController.getOrderWithProblems);
routes.get('/couriers', CouriersController.index);
routes.get('/allrecipients', RecipientsController.index);
routes.get('/problems', ProblemsController.indexall);
routes.put('/users', UserController.update);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);
routes.get('/recipients', RecipientsController.getForRegister);
routes.get('/recipients/:name', RecipientsController.getByNameForRegister);

routes.get('/searchrecipients/:name', RecipientsController.getByNameForSearch);
routes.get('/searchrecipientid/:id', RecipientsController.getById);

routes.get('/registerCourier/:name', CouriersController.getByNameForRegister);
routes.get('/registercourier', CouriersController.getForRegister);
routes.get('/searchcouriers/:name', CouriersController.getByNameForSearch);
routes.post('/couriers', CouriersController.store);
routes.put('/couriers/:id', CouriersController.update);
routes.delete('/couriers/:id', CouriersController.delete);

routes.put('/updateorder/:id', OrdersController.update);
routes.post('/orders', OrdersController.store);
routes.get('/orderproduct/:product', OrdersController.getByName);

routes.delete('/recipients/:id', RecipientsController.delete);
routes.delete('/orders/:id', OrdersController.delete);

export default routes;
