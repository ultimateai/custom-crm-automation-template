import { NextFunction, Response, Request } from 'express';

function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction): void {
    const status: number = error?.status || error?.code || 500;
    const message: string = error?.message || 'Something went wrong';
    res.status(status).json({ message });
    next();
}

export default errorMiddleware;
