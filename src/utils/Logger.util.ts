import { Logger, ISettingsParam, ILogObj } from 'tslog';
import { ILogObjMeta } from 'tslog/dist/types/interfaces';
const { name: appName, version } = require(process.cwd() + '/package.json');

// according to: https://github.com/fullstack-build/tslog/issues/155
export enum LogLevel {
    silly,
    trace,
    debug,
    info,
    warn,
    error,
    fatal
}

export type TLogLevelName = keyof typeof LogLevel;
type LoggerType = 'json' | 'pretty' | 'hidden' | undefined;

function jsonStringifyRecursive(obj: unknown): string {
    const cache = new Set();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                // Circular reference found, discard key
                return '[Circular]';
            }
            // Store value in our collection
            cache.add(value);
        }
        return value;
    });
}

export function getLoggerSettings(): ISettingsParam<ILogObj> {
    const logLevelName = (process.env.LOG_LEVEL as TLogLevelName) || 'info';
    let settings: ISettingsParam<ILogObj>;
    switch (process.env.APP_ENV) {
        case 'development':
        case 'staging':
        case 'production':
            settings = {
                type: 'json',
                name: appName,
                minLevel: LogLevel[logLevelName],
                maskValuesOfKeys: ['authentication', 'authorization'],
                maskValuesRegEx: [new RegExp('Bearer.*')],
                overwrite: {
                    transportJSON: (json) => {
                        const logJsonObject = json as ILogObjMeta;
                        if (logJsonObject['_meta'].logLevelId > LogLevel.info) {
                            process.stderr.write(jsonStringifyRecursive(json) + `\n`);
                        } else {
                            process.stdout.write(jsonStringifyRecursive(json) + `\n`);
                        }
                    }
                }
            };
            break;
        default:
            settings = {
                type: (process.env.LOG_TYPE as LoggerType) || 'pretty',
                name: appName,
                minLevel: LogLevel[logLevelName],
                maskValuesOfKeys: ['authentication', 'authorization'],
                maskValuesRegEx: [new RegExp('Bearer.*')]
            };
            break;
    }

    return settings;
}

export const logger = new Logger<ILogObj>(getLoggerSettings(), {
    release: () => version
});
