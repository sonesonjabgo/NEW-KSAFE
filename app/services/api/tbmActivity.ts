import { api } from "./index"
import { supabase } from "./auth/supabase"

const USER_TBM_ACTIVITY_ENDPOINT = "/api/v1/user/tbm-activities"
const USER_TBM_REPORT_JOB_ENDPOINT = "/api/v1/user/tbm-report-jobs"
const USER_TBM_PARTICIPATION_ENDPOINT = "/api/v1/user/tbm-participations"
const COMPANY_ADMIN_TBM_ACTIVITY_ENDPOINT = "/api/v1/company-admin/tbm-activities"
const EDUCATION_MATERIAL_ENDPOINT = "/api/v1/user/education-materials"

export interface CursorListResponse<TItem> {
  items: TItem[]
  nextCursor: string | null
  hasNext: boolean
}

export interface TbmActivityListItemDto {
  id: string
  title: string
  status: "draft" | "active" | "ended"
  workDate: string
  activatedAt: string | null
  createdBy: { id: string; name: string }
  workplace: { id: string; name: string }
  participantCount: number
  materialCount: number
  createdAt: string
}

export interface TbmActivityMaterialDto {
  id: string
  title: string
  description: string | null
  fileName: string
  fileUrl: string
  fileSize: number
  mimeType: string
}

export interface TbmActivityParticipantDto {
  id: string
  workerId: string
  workerName: string
  healthStatus: "normal" | "abnormal"
  participatedAt: string
}

export interface TbmActivityLogAttachmentDto {
  id: string
  fileName: string
  fileUrl: string
  fileSize: number
  mimeType: string
}

export interface TbmActivityLogDto {
  summary: string
  remarks: string | null
  attachments: TbmActivityLogAttachmentDto[]
}

export interface TbmActivityDetailDto {
  id: string
  title: string
  content: string
  status: "draft" | "active" | "ended"
  workDate: string
  activatedAt: string | null
  createdBy: { id: string; name: string }
  workplace: { id: string; name: string }
  materials: TbmActivityMaterialDto[]
  participants: TbmActivityParticipantDto[]
  log: TbmActivityLogDto | null
  createdAt: string
  updatedAt: string
}

export interface TbmAvailableActivityDto {
  id: string
  title: string
  content: string
  workDate: string
  createdBy: { id: string; name: string }
  workplace: { id: string; name: string }
  materials: TbmActivityMaterialDto[]
  activatedAt: string
  createdAt: string
}

export interface CreateTbmActivityRequestDto {
  workplaceId: string
  title: string
  content: string
  workDate: string
  materialIds?: string[]
}

export interface UpdateTbmActivityRequestDto {
  title?: string
  content?: string
  workDate?: string
  materialIds?: string[]
}

export interface EndTbmActivityRequestDto {
  summary: string
  uploadIds: string[]
  remarks?: string
}

export interface RequestTbmActivityReportRequestDto {
  processName?: string
  teamName?: string
}

export interface TbmReportJobDto {
  id?: string
  jobId?: string
  job_id?: string
  activityId?: string | null
  activityTitle?: string | null
  workplaceName?: string | null
  participantCount?: number | null
  requestedBy?: string | null
  processName?: string | null
  teamName?: string | null
  status: "pending" | "processing" | "completed" | "failed"
  errorMessage?: string | null
  resultFileName?: string | null
  resultFileUrl?: string | null
  resultFileExpiresAt?: string | null
  startedAt?: string | null
  completedAt?: string | null
  createdAt?: string
  retryAfter?: number | null
}

export interface ParticipateTbmActivityRequestDto {
  healthStatus: "normal" | "abnormal"
  signature: string
}

export interface TbmParticipationListItemDto {
  id: string
  activity: { id: string; title: string }
  workplace: { id: string; name: string }
  healthStatus: "normal" | "abnormal"
  participatedAt: string
}

export interface TbmParticipationDetailDto {
  id: string
  activity: { id: string; title: string; content: string; workDate: string }
  createdBy: { id: string; name: string }
  workplace: { id: string; name: string }
  materials: TbmActivityMaterialDto[]
  healthStatus: "normal" | "abnormal"
  participatedAt: string
}

export interface UploadInitiateRequestDto {
  fileName: string
  contentType: string
  fileSize?: number
}

export interface UploadInitiateResponseDto {
  uploadId: string
  signedUrl: string
}

export interface EducationMaterialDetailDto {
  id: string
  type: "platform" | "company"
  title: string
  description: string | null
  status: "active" | "archived"
  category: { id: string; name: string } | null
  createdBy: { id: string; name: string } | null
  file: { name: string; url: string; size: number; mimeType: string }
  createdAt: string
  updatedAt: string
}

class TbmActivityApi {
  private async getAuthHeaders() {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const accessToken = session?.access_token
    if (!accessToken) throw new Error("No access token")
    return { Authorization: `Bearer ${accessToken}`, accept: "application/json" }
  }

  private async fetchAllPages<TItem>(
    fetchPage: (cursor: string | null) => Promise<CursorListResponse<TItem>>,
  ): Promise<TItem[]> {
    const items: TItem[] = []
    let cursor: string | null = null
    let hasNext = true
    while (hasNext) {
      const page = await fetchPage(cursor)
      items.push(...page.items)
      cursor = page.nextCursor
      hasNext = page.hasNext && !!page.nextCursor
    }
    return items
  }

  async fetchAllMyActivities(
    status?: "draft" | "active" | "ended",
  ): Promise<TbmActivityListItemDto[]> {
    return this.fetchAllPages(async (cursor) => {
      const headers = await this.getAuthHeaders()
      const params: Record<string, unknown> = { limit: 100 }
      if (status) params.status = status
      if (cursor) params.cursor = cursor
      const response = await api.apisauce.get<CursorListResponse<TbmActivityListItemDto>>(
        `${USER_TBM_ACTIVITY_ENDPOINT}/my`,
        params,
        { headers },
      )
      if (!response.ok) throw new Error("Failed to fetch my TBM activities")
      return response.data!
    })
  }

  async fetchAllCompanyAdminActivities(
    status?: "draft" | "active" | "ended",
  ): Promise<TbmActivityListItemDto[]> {
    return this.fetchAllPages(async (cursor) => {
      const headers = await this.getAuthHeaders()
      const params: Record<string, unknown> = { limit: 100 }
      if (status) params.status = status
      if (cursor) params.cursor = cursor
      const response = await api.apisauce.get<CursorListResponse<TbmActivityListItemDto>>(
        COMPANY_ADMIN_TBM_ACTIVITY_ENDPOINT,
        params,
        { headers },
      )
      if (!response.ok) throw new Error("Failed to fetch company admin TBM activities")
      return response.data!
    })
  }

  async fetchActivityDetail(activityId: string): Promise<TbmActivityDetailDto> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.get<TbmActivityDetailDto>(
      `${USER_TBM_ACTIVITY_ENDPOINT}/${activityId}`,
      undefined,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to fetch TBM activity detail")
    return response.data!
  }

  async fetchCompanyAdminActivityDetail(activityId: string): Promise<TbmActivityDetailDto> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.get<TbmActivityDetailDto>(
      `${COMPANY_ADMIN_TBM_ACTIVITY_ENDPOINT}/${activityId}`,
      undefined,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to fetch company admin TBM activity detail")
    return response.data!
  }

  async createActivity(payload: CreateTbmActivityRequestDto): Promise<TbmActivityDetailDto> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.post<TbmActivityDetailDto>(
      USER_TBM_ACTIVITY_ENDPOINT,
      payload,
      { headers },
    )
    if (!response.ok) {
      const body = response.data as any
      const error = new Error(body?.message || "Failed to create TBM activity") as any
      if (body?.code) error.code = body.code
      if (body?.errors) error.fieldErrors = body.errors
      throw error
    }
    return response.data!
  }

  async updateActivity(
    activityId: string,
    payload: UpdateTbmActivityRequestDto,
  ): Promise<TbmActivityDetailDto> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.patch<TbmActivityDetailDto>(
      `${USER_TBM_ACTIVITY_ENDPOINT}/${activityId}`,
      payload,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to update TBM activity")
    return response.data!
  }

  async deleteActivity(activityId: string): Promise<void> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.delete(
      `${USER_TBM_ACTIVITY_ENDPOINT}/${activityId}`,
      undefined,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to delete TBM activity")
  }

  async activateActivity(activityId: string): Promise<TbmActivityDetailDto> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.patch<TbmActivityDetailDto>(
      `${USER_TBM_ACTIVITY_ENDPOINT}/${activityId}/activate`,
      undefined,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to activate TBM activity")
    return response.data!
  }

  async endActivity(
    activityId: string,
    payload: EndTbmActivityRequestDto,
  ): Promise<TbmActivityDetailDto> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.post<TbmActivityDetailDto>(
      `${USER_TBM_ACTIVITY_ENDPOINT}/${activityId}/end`,
      payload,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to end TBM activity")
    return response.data!
  }

  async requestActivityReport(
    activityId: string,
    payload: RequestTbmActivityReportRequestDto,
  ): Promise<void> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.post(
      `${USER_TBM_ACTIVITY_ENDPOINT}/${activityId}/report`,
      payload,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to request TBM activity report")
  }

  async uploadActivityPhotoUrl(payload: UploadInitiateRequestDto): Promise<UploadInitiateResponseDto> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.post<UploadInitiateResponseDto>(
      `${USER_TBM_ACTIVITY_ENDPOINT}/upload-url`,
      payload,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to get TBM activity upload url")
    return response.data!
  }

  async fetchMyReportJobs(): Promise<TbmReportJobDto[]> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.get(USER_TBM_REPORT_JOB_ENDPOINT, undefined, { headers })
    if (!response.ok) throw new Error("Failed to fetch TBM report jobs")
    if (Array.isArray(response.data)) return response.data as TbmReportJobDto[]
    if (Array.isArray((response.data as any)?.items))
      return (response.data as any).items as TbmReportJobDto[]
    return []
  }

  async fetchReportJobStatus(jobId: string): Promise<TbmReportJobDto> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.get<TbmReportJobDto>(
      `${USER_TBM_REPORT_JOB_ENDPOINT}/${jobId}`,
      undefined,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to fetch TBM report job status")
    return response.data!
  }

  async regenerateReportJob(
    jobId: string,
    payload: RequestTbmActivityReportRequestDto,
  ): Promise<void> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.post(
      `${USER_TBM_REPORT_JOB_ENDPOINT}/${jobId}/regenerate`,
      payload,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to regenerate TBM report job")
  }

  async fetchAllAvailableActivities(): Promise<TbmAvailableActivityDto[]> {
    return this.fetchAllPages(async (cursor) => {
      const headers = await this.getAuthHeaders()
      const params = cursor ? { cursor, limit: 100 } : { limit: 100 }
      const response = await api.apisauce.get<CursorListResponse<TbmAvailableActivityDto>>(
        `${USER_TBM_ACTIVITY_ENDPOINT}/available`,
        params,
        { headers },
      )
      if (!response.ok) throw new Error("Failed to fetch available TBM activities")
      return response.data!
    })
  }

  async participateActivity(
    activityId: string,
    payload: ParticipateTbmActivityRequestDto,
  ): Promise<void> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.post(
      `${USER_TBM_ACTIVITY_ENDPOINT}/${activityId}/participate`,
      payload,
      { headers },
    )
    if (!response.ok) {
      const body = response.data as any
      const error = new Error(body?.message || "Failed to participate TBM activity") as any
      if (body?.code) error.code = body.code
      throw error
    }
  }

  async fetchAllMyParticipations(): Promise<TbmParticipationListItemDto[]> {
    return this.fetchAllPages(async (cursor) => {
      const headers = await this.getAuthHeaders()
      const params: Record<string, unknown> = { limit: 100 }
      if (cursor) params.cursor = cursor
      const response = await api.apisauce.get<CursorListResponse<TbmParticipationListItemDto>>(
        `${USER_TBM_PARTICIPATION_ENDPOINT}/my`,
        params,
        { headers },
      )
      if (!response.ok) throw new Error("Failed to fetch my TBM participations")
      return response.data!
    })
  }

  async fetchParticipationDetail(participationId: string): Promise<TbmParticipationDetailDto> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.get<TbmParticipationDetailDto>(
      `${USER_TBM_PARTICIPATION_ENDPOINT}/${participationId}`,
      undefined,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to fetch TBM participation detail")
    return response.data!
  }

  async fetchEducationMaterialDetail(materialId: string): Promise<EducationMaterialDetailDto> {
    const headers = await this.getAuthHeaders()
    const response = await api.apisauce.get<EducationMaterialDetailDto>(
      `${EDUCATION_MATERIAL_ENDPOINT}/${materialId}`,
      undefined,
      { headers },
    )
    if (!response.ok) throw new Error("Failed to fetch education material detail")
    return response.data!
  }

  async uploadFileToSignedUrl(
    signedUrl: string,
    file: { uri: string; type: string; name: string },
  ): Promise<void> {
    const response = await fetch(signedUrl, {
      method: "PUT",
      body: { uri: file.uri, type: file.type, name: file.name } as never,
      headers: { "Content-Type": file.type },
    })
    if (!response.ok) throw new Error(`Failed to upload file: ${response.statusText}`)
  }
}

export const tbmActivityApi = new TbmActivityApi()
