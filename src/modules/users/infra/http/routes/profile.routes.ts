import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const profileController = new ProfileController();

const profileRouter = Router();

profileRouter.use(ensureAuthentication);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
