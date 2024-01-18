import ReqUser from '../src/models/service/ReqUser.model';

declare global {
    namespace Express {
        interface Request {
            user?: ReqUser;
        }
    }
}
