export type EducationSource = "platform" | "company" | "mine"

export interface EducationListItem {
  id: string
  title: string
  categoryName: string | null
  createdAt: string
  source: EducationSource
  fileName: string
  fileSize: number
  mimeType: string
  createdByName: string | null
}
