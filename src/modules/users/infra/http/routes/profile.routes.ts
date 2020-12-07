import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const profileController = new ProfileController();

const profileRouter = Router();

profileRouter.use(ensureAuthentication);

profileRouter.get('/', profileController.show);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            oldPassword: Joi.string(),
            password: Joi.string(),
            passwordConfirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    profileController.update,
);

export default profileRouter;
