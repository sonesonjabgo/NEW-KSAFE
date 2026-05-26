import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { createEducationStoreDefaultModel } from "./EducationStore"
import { createSafeBoardStoreDefaultModel } from "./SafeBoardStore"
import { createTbmAdminStoreDefaultModel } from "./TbmAdminStore"
import { createTbmStoreDefaultModel } from "./TbmStore"
import { createWorkplaceStoreDefaultModel } from "./WorkplaceStore"

export const RootStoreModel = types.model("RootStore").props({
  safeBoardStore: createSafeBoardStoreDefaultModel(),
  workplaceStore: createWorkplaceStoreDefaultModel(),
  tbmAdminStore: createTbmAdminStoreDefaultModel(),
  tbmStore: createTbmStoreDefaultModel(),
  educationStore: createEducationStoreDefaultModel(),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
