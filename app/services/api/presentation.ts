import { supabase } from "./auth/supabase"

import { api } from "./index"

const PRESENTATIONS_ENDPOINT = "/api/v1/common/presentations"

export interface ActivePresentationDto {
  presentationId: string
  accessCode: string
}

export async function fetchActivePresentation(): Promise<ActivePresentationDto | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token
  if (!accessToken) return null

  const response = await api.apisauce.get<ActivePresentationDto>(
    `${PRESENTATIONS_ENDPOINT}/active`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    },
  )

  if (!response.ok) return null
  return response.data ?? null
}
