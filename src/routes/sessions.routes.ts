import { Router } from 'express';
import AuthenticUserService from '../services/AuthenticateUser';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticUserService();

    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });

    return response.json({ user, token });
});

export default sessionsRouter;
