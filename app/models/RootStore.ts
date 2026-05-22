import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const RootStoreModel = types.model("RootStore").props({
  // stores will be registered here as they are ported
})

export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
