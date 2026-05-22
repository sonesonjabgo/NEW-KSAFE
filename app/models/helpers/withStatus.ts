import { IObservableValue, observable } from "mobx"

export type StatusType = "init" | "pending" | "success" | "error"

export const withStatus = () => {
  const status: IObservableValue<string> = observable.box("init")
  return {
    views: {
      get status() {
        return status.get() as StatusType
      },
      set status(value: StatusType) {
        status.set(value)
      },
    },
    actions: {
      setStatus: (value: StatusType) => {
        status.set(value)
      },
      resetStatus: () => {
        status.set("init")
      },
    },
  }
}
