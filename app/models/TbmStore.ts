import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { tbmActivityApi } from "@/services/api/tbmActivity"
import { logDevError } from "@/utils/logDevError"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { withStatus } from "./helpers/withStatus"

const TbmSessionMaterialModel = types.model("TbmWorkerSessionMaterial", {
  id: types.identifier,
  title: types.string,
  description: types.maybeNull(types.string),
  fileName: types.string,
  fileUrl: types.string,
  fileSize: types.number,
  mimeType: types.string,
})

const TbmAvailableSessionModel = types.model("TbmAvailableSession", {
  id: types.identifier,
  title: types.string,
  content: types.string,
  workDate: types.string,
  createdByName: types.string,
  workplaceId: types.maybeNull(types.string),
  workplaceName: types.maybeNull(types.string),
  materials: types.array(TbmSessionMaterialModel),
  activatedAt: types.string,
  createdAt: types.string,
})

const TbmParticipationModel = types.model("TbmParticipation", {
  id: types.identifier,
  activityId: types.string,
  activityTitle: types.string,
  workplaceName: types.string,
  healthStatus: types.enumeration(["normal", "abnormal"]),
  participatedAt: types.string,
})

const TbmParticipationDetailMaterialModel = types.model("TbmParticipationDetailMaterial", {
  id: types.identifier,
  title: types.string,
  description: types.maybeNull(types.string),
  fileName: types.string,
  fileUrl: types.string,
  fileSize: types.number,
  mimeType: types.string,
})

const TbmParticipationDetailModel = types.model("TbmParticipationDetail", {
  id: types.identifier,
  activityId: types.string,
  activityTitle: types.string,
  activityContent: types.string,
  workDate: types.string,
  createdByName: types.string,
  workplaceName: types.string,
  healthStatus: types.enumeration(["normal", "abnormal"]),
  participatedAt: types.string,
  materials: types.array(TbmParticipationDetailMaterialModel),
})

const normalizeAvailableSession = (item: any) => ({
  id: item.id,
  title: item.title,
  content: item.content ?? "",
  workDate: item.workDate,
  createdByName: item.createdBy?.name ?? "",
  workplaceId: item.workplace?.id ?? null,
  workplaceName: item.workplace?.name ?? null,
  materials: (item.materials ?? []).map((m: any) => ({
    id: m.id,
    title: m.title,
    description: m.description ?? null,
    fileName: m.fileName,
    fileUrl: m.fileUrl,
    fileSize: m.fileSize,
    mimeType: m.mimeType,
  })),
  activatedAt: item.activatedAt ?? item.createdAt,
  createdAt: item.createdAt,
})

const normalizeParticipationItem = (item: any) => ({
  id: item.id,
  activityId: item.activity.id,
  activityTitle: item.activity.title,
  workplaceName: item.workplace.name,
  healthStatus: item.healthStatus,
  participatedAt: item.participatedAt,
})

const normalizeParticipationDetail = (detail: any) => ({
  id: detail.id,
  activityId: detail.activity.id,
  activityTitle: detail.activity.title,
  activityContent: detail.activity.content ?? "",
  workDate: detail.activity.workDate,
  createdByName: detail.createdBy.name,
  workplaceName: detail.workplace.name,
  healthStatus: detail.healthStatus,
  participatedAt: detail.participatedAt,
  materials: (detail.materials ?? []).map((m: any) => ({
    id: m.id,
    title: m.title,
    description: m.description ?? null,
    fileName: m.fileName,
    fileUrl: m.fileUrl,
    fileSize: m.fileSize,
    mimeType: m.mimeType,
  })),
})

export const TbmStoreModel = types
  .model("TbmStore")
  .props({
    sessions: types.optional(types.array(TbmAvailableSessionModel), []),
    selectedSessionId: types.maybeNull(types.string),
    healthStatus: types.maybe(types.enumeration<"normal" | "abnormal">("HealthStatus", ["normal", "abnormal"])),
    signature: types.maybe(types.string),
    participations: types.optional(types.array(TbmParticipationModel), []),
    currentParticipationDetail: types.maybeNull(TbmParticipationDetailModel),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((self) => ({
    get selectedSession() {
      if (!self.selectedSessionId) return null
      return self.sessions.find((s) => s.id === self.selectedSessionId) ?? null
    },
  }))
  .actions((self) => {
    const excludedActivityIds = new Set<string>()

    return {
      setSelectedSessionId(id: string | null) {
        self.selectedSessionId = id
      },

      setHealthStatus(status: "normal" | "abnormal") {
        self.healthStatus = status
      },

      setSignature(signature: string) {
        self.signature = signature
      },

      resetParticipationFlow() {
        self.selectedSessionId = null
        self.healthStatus = undefined
        self.signature = undefined
        self.sessions.clear()
      },

      clearParticipationDetail() {
        self.setProp("currentParticipationDetail", null)
      },

      fetchAvailableActivities: flow(function* () {
        self.setStatus("pending")
        try {
          const result: any[] = yield tbmActivityApi.fetchAllAvailableActivities()
          const filtered = result.filter((item) => !excludedActivityIds.has(item.id))
          self.sessions.replace(filtered.map(normalizeAvailableSession))
          self.setStatus("success")
        } catch (error) {
          self.setStatus("error")
          logDevError("Failed to fetch available TBM activities", error)
        } finally {
          self.setStatus("init")
        }
      }),

      getParticipations: flow(function* () {
        self.setStatus("pending")
        try {
          const result: any[] = yield tbmActivityApi.fetchAllMyParticipations()
          const normalized = result.map(normalizeParticipationItem)
          normalized.forEach((p) => excludedActivityIds.add(p.activityId))
          self.participations.replace(normalized)
          self.setStatus("success")
        } catch (error) {
          self.setStatus("error")
          logDevError("Failed to fetch TBM participations", error)
        } finally {
          self.setStatus("init")
        }
      }),

      fetchParticipationDetail: flow(function* (participationId: string) {
        self.setStatus("pending")
        try {
          const result: any = yield tbmActivityApi.fetchParticipationDetail(participationId)
          self.setProp("currentParticipationDetail", normalizeParticipationDetail(result))
          self.setStatus("success")
        } catch (error) {
          self.setStatus("error")
          logDevError("Failed to fetch TBM participation detail", error)
        } finally {
          self.setStatus("init")
        }
      }),

      submitParticipation: flow(function* () {
        const selectedId = self.selectedSessionId
        if (!selectedId || !self.healthStatus || !self.signature) {
          logDevError("Missing required fields for participation")
          return
        }
        self.setStatus("pending")
        try {
          yield tbmActivityApi.participateActivity(selectedId, {
            healthStatus: self.healthStatus as "normal" | "abnormal",
            signature: self.signature,
          })
          excludedActivityIds.add(selectedId)
          self.sessions.replace(self.sessions.filter((s) => s.id !== selectedId))
          self.selectedSessionId = null
          self.setStatus("success")
        } catch (error: any) {
          self.setStatus("error")
          logDevError("Failed to submit TBM participation", error)
          throw error
        } finally {
          self.setStatus("init")
        }
      }),
    }
  })

export interface TbmStore extends Instance<typeof TbmStoreModel> {}
export interface TbmStoreSnapshotOut extends SnapshotOut<typeof TbmStoreModel> {}
export interface TbmStoreSnapshotIn extends SnapshotIn<typeof TbmStoreModel> {}
export const createTbmStoreDefaultModel = () => types.optional(TbmStoreModel, {})
