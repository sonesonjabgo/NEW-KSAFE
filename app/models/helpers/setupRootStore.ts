import { applySnapshot, IDisposer, onSnapshot } from "mobx-state-tree"

import { logDevError } from "@/utils/logDevError"

import * as storage from "../../utils/storage"
import { RootStore, RootStoreSnapshot } from "../RootStore"

const ROOT_STATE_STORAGE_KEY = "root-v1"

let _disposer: IDisposer | undefined

export async function setupRootStore(rootStore: RootStore) {
  let restoredState: RootStoreSnapshot | undefined | null

  try {
    restoredState = ((await storage.load(ROOT_STATE_STORAGE_KEY)) ?? {}) as RootStoreSnapshot
    applySnapshot(rootStore, restoredState)
  } catch (e) {
    if (__DEV__) {
      if (e instanceof Error) logDevError("setupRootStore", e.message)
    }
  }

  if (_disposer) _disposer()

  _disposer = onSnapshot(rootStore, (snapshot) => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

  const unsubscribe = () => {
    _disposer?.()
    _disposer = undefined
  }

  return { rootStore, restoredState, unsubscribe }
}
