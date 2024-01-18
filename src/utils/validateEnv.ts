import { cleanEnv, port, str } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        APP_ENV: str(),
        APP_NAME: str(),
        NODE_ENV: str(),
        PORT: port()
    });
}

export default validateEnv;
