import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import ProvidersController from '../controllers/ProvidersController';
import ProvidersDayController from '../controllers/ProviderDayAvailabilityController';
import ProvidersMonthController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providersDayController = new ProvidersDayController();
const providersMonthController = new ProvidersMonthController();

providersRouter.use(ensureAuthentication);

providersRouter.get('/', providersController.index);

providersRouter.get(
    '/:providerId/month-availability',
    celebrate({
        [Segments.PARAMS]: {
            providerId: Joi.string().uuid().required(),
        },
    }),
    providersMonthController.index,
);

providersRouter.get(
    '/:providerId/day-availability',
    celebrate({
        [Segments.PARAMS]: {
            providerId: Joi.string().uuid().required(),
        },
    }),
    providersDayController.index,
);

export default providersRouter;
