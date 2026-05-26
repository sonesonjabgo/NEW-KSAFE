import { consoleTransport, logger } from "react-native-logs"

const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    } as const,
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  enabled: __DEV__,
}

const noop = () => undefined
const noopLogger = {
  debug: noop,
  info: noop,
  warn: noop,
  error: noop,
}

export const log = (__DEV__ ? logger.createLogger(defaultConfig) : noopLogger) as ReturnType<
  typeof logger.createLogger
>
