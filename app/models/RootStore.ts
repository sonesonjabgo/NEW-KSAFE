import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { createSafeBoardStoreDefaultModel } from "./SafeBoardStore"

export const RootStoreModel = types.model("RootStore").props({
  safeBoardStore: createSafeBoardStoreDefaultModel(),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
