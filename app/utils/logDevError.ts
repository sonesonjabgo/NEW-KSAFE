import { log } from "./logger"

type ErrorWithDetails = Error & {
  status?: number
  code?: string
  fieldErrors?: unknown
}

const normalizeLogArg = (arg: unknown) => {
  if (!(arg instanceof Error)) {
    return arg
  }

  const detailedError = arg as ErrorWithDetails

  return {
    name: detailedError.name,
    message: detailedError.message,
    status: detailedError.status,
    code: detailedError.code,
    fieldErrors: detailedError.fieldErrors,
    stack: detailedError.stack,
  }
}

export const logDevError = (...args: Parameters<typeof console.error>) => {
  if (__DEV__) {
    const normalizedArgs = args.map(normalizeLogArg)

    console.error(...normalizedArgs)

    const stackTrace = new Error(
      normalizedArgs.map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg))).join(" "),
    ).stack

    if (stackTrace) {
      log.error(stackTrace)
    }
  }
}
