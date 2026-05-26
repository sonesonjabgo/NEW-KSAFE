import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { tbmActivityApi } from "@/services/api/tbmActivity"
import { logDevError } from "@/utils/logDevError"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { withStatus } from "./helpers/withStatus"

const TbmSessionListItemModel = types.model("TbmSessionListItem", {
  id: types.identifier,
  title: types.string,
  status: types.enumeration(["draft", "active", "ended"]),
  workDate: types.string,
  activatedAt: types.maybeNull(types.string),
  createdByName: types.string,
  workplaceName: types.maybeNull(types.string),
  participantCount: types.number,
  createdAt: types.string,
})

const TbmSessionMaterialModel = types.model("TbmSessionMaterial", {
  id: types.identifier,
  title: types.string,
  description: types.maybeNull(types.string),
  fileName: types.string,
  fileUrl: types.string,
  fileSize: types.number,
  mimeType: types.string,
})

const TbmSessionParticipantModel = types.model("TbmSessionParticipant", {
  id: types.identifier,
  workerId: types.string,
  workerName: types.string,
  healthStatus: types.enumeration(["normal", "abnormal"]),
  participatedAt: types.string,
})

const TbmSessionLogAttachmentModel = types.model("TbmSessionLogAttachment", {
  id: types.identifier,
  fileName: types.string,
  fileUrl: types.string,
  fileSize: types.number,
  mimeType: types.string,
})

const TbmSessionLogModel = types.model("TbmSessionLog", {
  summary: types.string,
  remarks: types.maybeNull(types.string),
  attachments: types.array(TbmSessionLogAttachmentModel),
})

const TbmSessionDetailModel = types.model("TbmSessionDetail", {
  id: types.identifier,
  title: types.string,
  content: types.string,
  status: types.enumeration(["draft", "active", "ended"]),
  workDate: types.string,
  activatedAt: types.maybeNull(types.string),
  createdByName: types.string,
  workplaceId: types.string,
  workplaceName: types.maybeNull(types.string),
  materials: types.array(TbmSessionMaterialModel),
  participants: types.array(TbmSessionParticipantModel),
  log: types.maybeNull(TbmSessionLogModel),
  createdAt: types.string,
  updatedAt: types.string,
})

const TbmReportJobModel = types.model("TbmReportJob", {
  id: types.identifier,
  activityId: types.maybeNull(types.string),
  activityTitle: types.maybeNull(types.string),
  workplaceName: types.maybeNull(types.string),
  participantCount: types.optional(types.number, 0),
  requestedBy: types.maybeNull(types.string),
  processName: types.maybeNull(types.string),
  teamName: types.maybeNull(types.string),
  status: types.enumeration(["pending", "processing", "completed", "failed"]),
  errorMessage: types.maybeNull(types.string),
  resultFileName: types.maybeNull(types.string),
  resultFileUrl: types.maybeNull(types.string),
  resultFileExpiresAt: types.maybeNull(types.string),
  startedAt: types.maybeNull(types.string),
  completedAt: types.maybeNull(types.string),
  createdAt: types.string,
  retryAfter: types.maybeNull(types.number),
})

const normalizeListItem = (item: any) => ({
  id: item.id,
  title: item.title,
  status: item.status,
  workDate: item.workDate,
  activatedAt: item.activatedAt ?? null,
  createdByName: item.createdBy?.name ?? "",
  workplaceName: item.workplace?.name ?? null,
  participantCount: item.participantCount ?? 0,
  createdAt: item.createdAt,
})

const normalizeDetail = (detail: any) => ({
  id: detail.id,
  title: detail.title,
  content: detail.content,
  status: detail.status,
  workDate: detail.workDate,
  activatedAt: detail.activatedAt ?? null,
  createdByName: detail.createdBy?.name ?? "",
  workplaceId: detail.workplace?.id ?? "",
  workplaceName: detail.workplace?.name ?? null,
  materials: (detail.materials ?? []).map((m: any) => ({
    id: m.id,
    title: m.title,
    description: m.description ?? null,
    fileName: m.fileName,
    fileUrl: m.fileUrl,
    fileSize: m.fileSize,
    mimeType: m.mimeType,
  })),
  participants: (detail.participants ?? []).map((p: any) => ({
    id: p.id,
    workerId: p.workerId,
    workerName: p.workerName,
    healthStatus: p.healthStatus,
    participatedAt: p.participatedAt,
  })),
  log: detail.log
    ? {
        summary: detail.log.summary,
        remarks: detail.log.remarks ?? null,
        attachments: (detail.log.attachments ?? []).map((a: any) => ({
          id: a.id,
          fileName: a.fileName,
          fileUrl: a.fileUrl,
          fileSize: a.fileSize,
          mimeType: a.mimeType,
        })),
      }
    : null,
  createdAt: detail.createdAt,
  updatedAt: detail.updatedAt,
})

const normalizeReportJob = (job: any) => {
  const resolvedId =
    [job.id, job.jobId, job.job_id].find((v) => typeof v === "string" && v.trim().length > 0) ??
    null
  if (!resolvedId) return null
  return {
    id: resolvedId,
    activityId: job.activityId ?? job.activity_id ?? null,
    activityTitle: job.activityTitle ?? job.activity_title ?? null,
    workplaceName: job.workplaceName ?? job.workplace_name ?? null,
    participantCount:
      typeof job.participantCount === "number"
        ? job.participantCount
        : typeof job.participant_count === "number"
          ? job.participant_count
          : 0,
    requestedBy:
      (typeof job.requestedBy === "string" ? job.requestedBy : job.requestedBy?.id) ?? null,
    processName: job.processName ?? job.process_name ?? null,
    teamName: job.teamName ?? job.team_name ?? null,
    status: job.status ?? "pending",
    errorMessage: job.errorMessage ?? job.error_message ?? null,
    resultFileName: job.resultFileName ?? job.result_file_name ?? null,
    resultFileUrl: job.resultFileUrl ?? job.result_file_url ?? job.fileUrl ?? null,
    resultFileExpiresAt: job.resultFileExpiresAt ?? job.result_file_expires_at ?? null,
    startedAt: job.startedAt ?? job.started_at ?? null,
    completedAt: job.completedAt ?? job.completed_at ?? null,
    createdAt: job.createdAt ?? job.created_at ?? new Date().toISOString(),
    retryAfter:
      typeof job.retryAfter === "number"
        ? job.retryAfter
        : typeof job.retry_after === "number"
          ? job.retry_after
          : null,
  }
}

export const TbmAdminStoreModel = types
  .model("TbmAdminStore")
  .props({
    sessions: types.optional(types.array(TbmSessionListItemModel), []),
    currentSessionDetail: types.maybeNull(TbmSessionDetailModel),
    reportJobs: types.optional(types.array(TbmReportJobModel), []),
    currentReportJob: types.maybeNull(TbmReportJobModel),
    reportJobListLoading: types.optional(types.boolean, false),
    reportJobDetailLoading: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .actions((self) => ({
    fetchSessions: flow(function* (status?: "draft" | "active" | "ended") {
      self.setStatus("pending")
      try {
        const result: any[] = yield tbmActivityApi.fetchAllMyActivities(status)
        self.sessions.replace(result.map(normalizeListItem))
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to fetch TBM sessions", error)
      } finally {
        self.setStatus("init")
      }
    }),

    fetchSessionDetail: flow(function* (sessionId: string) {
      self.setStatus("pending")
      try {
        const result: any = yield tbmActivityApi.fetchActivityDetail(sessionId)
        self.setProp("currentSessionDetail", normalizeDetail(result))
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to fetch TBM session detail", error)
      } finally {
        self.setStatus("init")
      }
    }),

    clearSessionDetail() {
      self.setProp("currentSessionDetail", null)
    },

    createSession: flow(function* (data: {
      workplaceId: string
      title: string
      content: string
      workDate: string
      materialIds?: string[]
    }) {
      self.setStatus("pending")
      try {
        yield tbmActivityApi.createActivity({
          workplaceId: data.workplaceId,
          title: data.title,
          content: data.content,
          workDate: data.workDate,
          materialIds: data.materialIds,
        })
        self.setStatus("success")
      } catch (error: any) {
        self.setStatus("error")
        logDevError("Failed to create TBM session", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    activateSession: flow(function* (sessionId: string) {
      self.setStatus("pending")
      try {
        const result: any = yield tbmActivityApi.activateActivity(sessionId)
        if (self.currentSessionDetail?.id === sessionId) {
          self.setProp("currentSessionDetail", normalizeDetail(result))
        }
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to activate TBM session", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    deleteSession: flow(function* (sessionId: string) {
      self.setStatus("pending")
      try {
        yield tbmActivityApi.deleteActivity(sessionId)
        self.sessions.replace(self.sessions.filter((s) => s.id !== sessionId))
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to delete TBM session", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    createEducationLog: flow(function* (
      sessionId: string,
      data: { summary: string; remarks?: string; uploadIds?: string[] },
    ) {
      self.setStatus("pending")
      try {
        const result: any = yield tbmActivityApi.endActivity(sessionId, {
          summary: data.summary,
          remarks: data.remarks,
          uploadIds: data.uploadIds ?? [],
        })
        if (self.currentSessionDetail?.id === sessionId) {
          self.setProp("currentSessionDetail", normalizeDetail(result))
        }
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to create education log", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    requestActivityReport: flow(function* (
      activityId: string,
      data: { processName?: string; teamName?: string },
    ) {
      self.setStatus("pending")
      try {
        yield tbmActivityApi.requestActivityReport(activityId, {
          processName: data.processName,
          teamName: data.teamName,
        })
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to request TBM activity report", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    fetchMyReportJobs: flow(function* () {
      self.reportJobListLoading = true
      try {
        const result: any[] = yield tbmActivityApi.fetchMyReportJobs()
        const normalized = result
          .map(normalizeReportJob)
          .filter((job): job is NonNullable<ReturnType<typeof normalizeReportJob>> => !!job)
        self.reportJobs.replace(normalized)
      } catch (error) {
        logDevError("Failed to fetch TBM report jobs", error)
      } finally {
        self.reportJobListLoading = false
      }
    }),

    fetchReportJobStatus: flow(function* (jobId: string) {
      self.reportJobDetailLoading = true
      try {
        const result: any = yield tbmActivityApi.fetchReportJobStatus(jobId)
        const normalized = normalizeReportJob({
          ...result,
          id: result.id ?? result.jobId ?? result.job_id ?? jobId,
        })
        if (!normalized) throw new Error("TBM report job response does not contain jobId")
        self.setProp("currentReportJob", normalized)

        const snapshots = self.reportJobs.slice()
        const idx = snapshots.findIndex((j) => j.id === normalized.id)
        if (idx >= 0) {
          self.reportJobs[idx] = normalized as any
        } else {
          self.reportJobs.unshift(normalized as any)
        }
      } catch (error) {
        logDevError("Failed to fetch TBM report job status", error)
      } finally {
        self.reportJobDetailLoading = false
      }
    }),

    regenerateReportJob: flow(function* (
      jobId: string,
      data: { processName?: string; teamName?: string },
    ) {
      self.setStatus("pending")
      try {
        yield tbmActivityApi.regenerateReportJob(jobId, {
          processName: data.processName,
          teamName: data.teamName,
        })
        const result: any = yield tbmActivityApi.fetchReportJobStatus(jobId)
        const normalized = normalizeReportJob({
          ...result,
          id: result.id ?? result.jobId ?? result.job_id ?? jobId,
        })
        if (!normalized) throw new Error("TBM report job response does not contain jobId")
        self.setProp("currentReportJob", normalized)
        self.setStatus("success")
        return normalized
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to regenerate TBM report job", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    clearCurrentReportJob() {
      self.setProp("currentReportJob", null)
    },
  }))

export interface TbmAdminStore extends Instance<typeof TbmAdminStoreModel> {}
export interface TbmAdminStoreSnapshotOut extends SnapshotOut<typeof TbmAdminStoreModel> {}
export interface TbmAdminStoreSnapshotIn extends SnapshotIn<typeof TbmAdminStoreModel> {}
export const createTbmAdminStoreDefaultModel = () => types.optional(TbmAdminStoreModel, {})
