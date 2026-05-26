import { cast, flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import {
  CompanyEducationMaterialListItemDto,
  CreateEducationMaterialRequestDto,
  PlatformEducationMaterialListItemDto,
  tbmActivityApi,
  UploadInitiateRequestDto,
} from "@/services/api/tbmActivity"
import { logDevError } from "@/utils/logDevError"

import { withStatus } from "./helpers/withStatus"

const EducationCategoryModel = types.model("EducationCategory", {
  id: types.identifier,
  name: types.string,
})

const EducationItemModel = types.model("EducationItem", {
  id: types.identifier,
  title: types.string,
  categoryName: types.maybeNull(types.string),
  createdAt: types.string,
  source: types.enumeration<"platform" | "company" | "mine">("EducationSource", [
    "platform",
    "company",
    "mine",
  ]),
  fileName: types.string,
  fileSize: types.number,
  mimeType: types.string,
  createdByName: types.maybeNull(types.string),
})

const EducationDetailModel = types.model("EducationDetail", {
  id: types.identifier,
  type: types.enumeration<"platform" | "company">("EducationDetailType", ["platform", "company"]),
  title: types.string,
  description: types.maybeNull(types.string),
  status: types.enumeration<"active" | "archived">("EducationStatus", ["active", "archived"]),
  categoryName: types.maybeNull(types.string),
  createdByName: types.maybeNull(types.string),
  fileName: types.string,
  fileUrl: types.string,
  fileSize: types.number,
  mimeType: types.string,
  createdAt: types.string,
  updatedAt: types.string,
})

const normalizePlatformItem = (item: PlatformEducationMaterialListItemDto) => ({
  id: item.id,
  title: item.title,
  categoryName: item.categoryName ?? null,
  createdAt: item.createdAt,
  source: "platform" as const,
  fileName: item.fileName,
  fileSize: item.fileSize,
  mimeType: item.mimeType,
  createdByName: null,
})

const normalizeCompanyItem = (
  item: CompanyEducationMaterialListItemDto,
  source: "company" | "mine",
) => ({
  id: item.id,
  title: item.title,
  categoryName: null,
  createdAt: item.createdAt,
  source,
  fileName: item.fileName,
  fileSize: item.fileSize,
  mimeType: item.mimeType,
  createdByName: item.createdByName,
})

export const EducationStoreModel = types
  .model("EducationStore")
  .props({
    categories: types.optional(types.array(EducationCategoryModel), []),
    platformItems: types.optional(types.array(EducationItemModel), []),
    companyItems: types.optional(types.array(EducationItemModel), []),
    myItems: types.optional(types.array(EducationItemModel), []),
    currentDetail: types.maybeNull(EducationDetailModel),
  })
  .extend(withStatus)
  .actions((self) => ({
    fetchCategories: flow(function* fetchCategories() {
      try {
        const result: { items: { id: string; name: string }[] } =
          yield tbmActivityApi.fetchEducationMaterialCategories()
        self.categories.replace(result.items.map((c) => ({ id: c.id, name: c.name })))
      } catch (error) {
        logDevError("Failed to load education categories", error)
      }
    }),

    fetchPlatformItems: flow(function* fetchPlatformItems(params?: {
      search?: string
      categoryId?: string
    }) {
      self.setStatus("pending")
      try {
        const result: { items: PlatformEducationMaterialListItemDto[] } =
          yield tbmActivityApi.fetchPlatformEducationMaterials(params)
        self.platformItems.replace(result.items.map(normalizePlatformItem))
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to load platform education items", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    fetchCompanyItems: flow(function* fetchCompanyItems() {
      self.setStatus("pending")
      try {
        const result: { items: CompanyEducationMaterialListItemDto[] } =
          yield tbmActivityApi.fetchCompanyEducationMaterials()
        self.companyItems.replace(result.items.map((item) => normalizeCompanyItem(item, "company")))
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to load company education items", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    fetchMyItems: flow(function* fetchMyItems() {
      self.setStatus("pending")
      try {
        const result: { items: CompanyEducationMaterialListItemDto[] } =
          yield tbmActivityApi.fetchMyEducationMaterials()
        self.myItems.replace(result.items.map((item) => normalizeCompanyItem(item, "mine")))
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to load my education items", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    fetchDetail: flow(function* fetchDetail(materialId: string) {
      self.setStatus("pending")
      try {
        const result = yield tbmActivityApi.fetchEducationMaterialDetail(materialId)
        self.currentDetail = cast({
          id: result.id,
          type: result.type,
          title: result.title,
          description: result.description ?? null,
          status: result.status,
          categoryName: result.category?.name ?? null,
          createdByName: result.createdBy?.name ?? null,
          fileName: result.file.name,
          fileUrl: result.file.url,
          fileSize: result.file.size,
          mimeType: result.file.mimeType,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        })
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to load education material detail", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    clearDetail() {
      self.currentDetail = null
    },

    archiveItem: flow(function* archiveItem(materialId: string) {
      self.setStatus("pending")
      try {
        yield tbmActivityApi.archiveEducationMaterial(materialId)
        if (self.currentDetail?.id === materialId) {
          self.currentDetail = cast({ ...self.currentDetail, status: "archived" })
        }
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to archive education material", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    restoreItem: flow(function* restoreItem(materialId: string) {
      self.setStatus("pending")
      try {
        yield tbmActivityApi.restoreEducationMaterial(materialId)
        if (self.currentDetail?.id === materialId) {
          self.currentDetail = cast({ ...self.currentDetail, status: "active" })
        }
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to restore education material", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),

    uploadFileUrl: flow(function* uploadFileUrl(payload: UploadInitiateRequestDto) {
      const result = yield tbmActivityApi.uploadEducationMaterialFileUrl(payload)
      return result as { uploadId: string; signedUrl: string }
    }),

    createMaterial: flow(function* createMaterial(payload: CreateEducationMaterialRequestDto) {
      self.setStatus("pending")
      try {
        const result = yield tbmActivityApi.createEducationMaterial(payload)
        self.myItems.push(
          normalizeCompanyItem(
            {
              id: result.id,
              title: result.title,
              createdByName: result.createdBy?.name ?? "",
              fileName: result.file.name,
              fileSize: result.file.size,
              mimeType: result.file.mimeType,
              createdAt: result.createdAt,
            },
            "mine",
          ),
        )
        self.setStatus("success")
        return result
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to create education material", error)
        throw error
      } finally {
        self.setStatus("init")
      }
    }),
  }))

export interface EducationStore extends Instance<typeof EducationStoreModel> {}
export interface EducationStoreSnapshotOut extends SnapshotOut<typeof EducationStoreModel> {}
export interface EducationStoreSnapshotIn extends SnapshotIn<typeof EducationStoreModel> {}
export const createEducationStoreDefaultModel = () => types.optional(EducationStoreModel, {})
