import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"

import { api } from "@/services/api/index"
import { CompanyWorkplaceListItemDto, fetchCompanyWorkplaces } from "@/services/api/workplace"
import { logDevError } from "@/utils/logDevError"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { withStatus } from "./helpers/withStatus"

const WorkplaceModel = types.model("Workplace", {
  id: types.identifier,
  companyId: types.string,
  companyName: types.string,
  workplaceName: types.string,
  workplaceCode: types.maybeNull(types.string),
  businessRegistrationNumber: types.maybeNull(types.string),
  representativeName: types.maybeNull(types.string),
  industry: types.maybeNull(types.string),
  businessType: types.maybeNull(types.string),
  employeeCount: types.maybeNull(types.number),
  isActive: types.optional(types.boolean, true),
  createdAt: types.string,
  updatedAt: types.maybeNull(types.string),
  userCount: types.maybeNull(types.number),
})

export const WorkplaceStoreModel = types
  .model("WorkplaceStore")
  .props({
    workplaces: types.optional(types.array(WorkplaceModel), []),
    workplaceError: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((self) => ({
    get hasWorkplaces() {
      return self.workplaces.length > 0
    },
    get primaryWorkplace() {
      return self.workplaces.length > 0 ? self.workplaces[0] : null
    },
    get companyName() {
      return self.workplaces.length > 0 ? self.workplaces[0].companyName : null
    },
  }))
  .actions((self) => ({
    fetchWorkplaces: flow(function* loadWorkplaces() {
      self.setStatus("init")
      try {
        self.setStatus("pending")
        const result: CompanyWorkplaceListItemDto[] = yield fetchCompanyWorkplaces()
        if (result) {
          self.workplaces.replace(result)
        }
      } catch (error) {
        self.setStatus("error")
        if (api.isRequestBlocked()) return
        self.workplaceError = "작업장 정보를 불러오지 못했습니다."
        logDevError("Failed to load workplaces", error)
      } finally {
        self.setStatus("success")
      }
    }),

    resetWorkplaceCache() {
      self.workplaces.clear()
      self.workplaceError = null
      self.resetStatus()
    },
  }))

export interface WorkplaceStore extends Instance<typeof WorkplaceStoreModel> {}
export interface WorkplaceStoreSnapshotOut extends SnapshotOut<typeof WorkplaceStoreModel> {}
export const createWorkplaceStoreDefaultModel = () => types.optional(WorkplaceStoreModel, {})
