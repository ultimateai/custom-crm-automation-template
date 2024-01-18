import promBundle from 'express-prom-bundle';
import { Response } from 'express';

function normalizeStatusCode(res: Response): string {
    const status = res.statusCode;
    if (status >= 200 && status < 300) {
        return '2XX';
    }
    if (status >= 300 && status < 400) {
        return '3XX';
    }
    if (status >= 400 && status < 500) {
        return '4XX';
    }
    return '5XX';
}

export default function handlerStats(): promBundle.Middleware {
    const opts: promBundle.Opts = {
        customLabels: {
            raw_status_code: null,
            app: process.env.APP_NAME,
            env: process.env.APP_ENV
        },
        transformLabels: (labels, req, res) => {
            const rawStatusCode = res.statusCode;
            Object.assign(labels, { raw_status_code: rawStatusCode });
        },
        includeMethod: true,
        includePath: true,
        metricType: 'histogram',
        includeStatusCode: true,
        formatStatusCode: normalizeStatusCode,
        buckets: [0.03, 0.1, 0.3, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 5, 8, 10, 15, 20, 30, 45]
    };

    return promBundle(opts);
}
