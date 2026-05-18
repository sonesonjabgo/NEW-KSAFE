export type EducationSubcategory = "감전사고" | "공통" | "기계점검보수"

export interface EducationMaterial {
  id: number
  title: string
  subcategory: EducationSubcategory
  datetime: string
  source: 0 | 1 | 2
}
