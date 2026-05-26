import { supabase } from "./auth/supabase"

import { api } from "./index"

const WORKPLACE_ENDPOINT = "/api/v1/user/workplaces/"

export interface CompanyWorkplaceListItemDto {
  id: string
  companyId: string
  companyName: string
  workplaceName: string
  workplaceCode: string
  businessRegistrationNumber: string
  representativeName: string
  industry: string
  businessType: string
  employeeCount: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  userCount: number
}

interface CompanyWorkplaceListResponseDto {
  items: CompanyWorkplaceListItemDto[]
}

export async function fetchCompanyWorkplaces(): Promise<CompanyWorkplaceListItemDto[]> {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for fetching workplaces")
  }

  const response = await api.apisauce.get<CompanyWorkplaceListResponseDto>(
    WORKPLACE_ENDPOINT,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    },
  )

  const data = response.data

  if (!response.ok) {
    api.handleAuthFailureResponse(response, "인증이 만료되었습니다. 다시 로그인해주세요.")
    const message =
      (data as { message?: string })?.message ??
      `Failed to load workplaces (status ${response.status ?? "unknown"})`
    throw new Error(message)
  }

  if (data && Array.isArray(data.items)) {
    return data.items
  }

  throw new Error(`Failed to load workplaces (status ${response.status ?? "unknown"})`)
}
