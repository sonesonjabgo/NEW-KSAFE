import { FC, Fragment, useState } from "react"
import {
  Modal,
  Pressable,
  ScrollView,
  // eslint-disable-next-line no-restricted-imports
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { Check, ChevronDown, Plus } from "lucide-react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

import type { PatrolCreateScreenProps } from "./types"

interface SelectionItem {
  id: string
  name: string
  subtitle: string
}

interface CheckCard {
  id: string
  checkName: string
  status: "good" | "bad"
  badNote: string
}

interface InspectionItem {
  id: string
  name: string
  checkCards: CheckCard[]
}

const newCheckCard = (id: string): CheckCard => ({
  id,
  checkName: "",
  status: "good",
  badNote: "",
})

type ModalType = "approver" | "reviewer" | "template"

const MOCK_USERS: SelectionItem[] = [
  { id: "1", name: "김소정", subtitle: "KS산업안전협회" },
  { id: "2", name: "이민준", subtitle: "KS산업안전협회" },
  { id: "3", name: "박지현", subtitle: "KS산업안전협회" },
  { id: "4", name: "최현우", subtitle: "KS산업안전협회" },
]

const MOCK_TEMPLATES: SelectionItem[] = [
  {
    id: "1",
    name: "일반 작업장 점검 템플릿",
    subtitle: "일반적인 작업장 순회 점검을 위한 기본 템플릿입니다.",
  },
]

export const PatrolCreateScreen: FC<PatrolCreateScreenProps> = ({ navigation, route }) => {
  const editData = route.params?.editData
  const isEditMode = editData !== undefined
  const [requirements, setRequirements] = useState(editData?.requirements ?? "")
  const [selectedApprover, setSelectedApprover] = useState<SelectionItem | null>(
    editData?.approver ?? null,
  )
  const [selectedReviewer, setSelectedReviewer] = useState<SelectionItem | null>(
    editData?.reviewer ?? null,
  )
  const [selectedTemplate, setSelectedTemplate] = useState<SelectionItem | null>(
    editData ? MOCK_TEMPLATES[0] : null,
  )
  const [items, setItems] = useState<InspectionItem[]>(editData?.items ?? [])
  const [modalVisible, setModalVisible] = useState(false)
  const [activeModal, setActiveModal] = useState<ModalType>("approver")
  const [successVisible, setSuccessVisible] = useState(false)

  const getModalTitle = (type: ModalType) => {
    if (type === "template") return translate("patrolCreateScreen:modal.templateTitle")
    return translate("patrolCreateScreen:modal.userTitle")
  }

  const getModalItems = (type: ModalType): SelectionItem[] =>
    type === "template" ? MOCK_TEMPLATES : MOCK_USERS

  const getSelected = (type: ModalType): SelectionItem | null => {
    if (type === "approver") return selectedApprover
    if (type === "reviewer") return selectedReviewer
    return selectedTemplate
  }

  const openModal = (type: ModalType) => {
    setActiveModal(type)
    setModalVisible(true)
  }

  const closeModal = () => setModalVisible(false)

  const handleSelect = (item: SelectionItem) => {
    if (activeModal === "approver") setSelectedApprover(item)
    else if (activeModal === "reviewer") setSelectedReviewer(item)
    else {
      setSelectedTemplate(item)
      setItems([{ id: "1", name: "", checkCards: [newCheckCard("1")] }])
    }
    closeModal()
  }

  const updateItemName = (id: string, name: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, name } : it)))
  }

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const updateCheckCard = (
    itemId: string,
    cardId: string,
    updates: Partial<Omit<CheckCard, "id">>,
  ) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? {
              ...it,
              checkCards: it.checkCards.map((card) =>
                card.id === cardId ? { ...card, ...updates } : card,
              ),
            }
          : it,
      ),
    )
  }

  const deleteCheckCard = (itemId: string, cardId: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? { ...it, checkCards: it.checkCards.filter((card) => card.id !== cardId) }
          : it,
      ),
    )
  }

  const addCheckCard = (itemId: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? { ...it, checkCards: [...it.checkCards, newCheckCard(Date.now().toString())] }
          : it,
      ),
    )
  }

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "", checkCards: [newCheckCard("1")] },
    ])
  }

  const modalItems = getModalItems(activeModal)
  const currentSelected = getSelected(activeModal)

  return (
    <StackScreen
      title={translate(isEditMode ? "patrolCreateScreen:editTitle" : "patrolCreateScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
    >
      <KeyboardAwareScrollView
        style={$scrollView}
        contentContainerStyle={$scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={200}
      >
        {/* Section 1: 승인자 (필수) */}
        <View style={$titleRow}>
          <Text
            text={translate("patrolCreateScreen:section.approver.title")}
            style={$sectionTitleBlue}
          />
          <Text text=" *" style={$requiredMark} />
        </View>
        <View style={$gap8} />
        <TouchableOpacity
          style={$selectorButton}
          activeOpacity={0.7}
          onPress={() => openModal("approver")}
        >
          <Text
            text={
              selectedApprover?.name ?? translate("patrolCreateScreen:section.approver.placeholder")
            }
            style={selectedApprover ? $selectorValue : $selectorPlaceholder}
          />
          <ChevronDown size={24} color={colors.navy} strokeWidth={1.8} />
        </TouchableOpacity>
        <View style={$gap10} />
        <Text
          text={translate("patrolCreateScreen:section.approver.description")}
          style={$sectionDescription}
        />
        <View style={$gap23} />
        <View style={$divider} />

        {/* Section 2: 검토자 (선택) */}
        <View style={[$titleRow, $sectionTop]}>
          <Text
            text={translate("patrolCreateScreen:section.reviewer.title")}
            style={$sectionTitleBlue}
          />
        </View>
        <View style={$gap8} />
        <TouchableOpacity
          style={$selectorButton}
          activeOpacity={0.7}
          onPress={() => openModal("reviewer")}
        >
          <Text
            text={
              selectedReviewer?.name ?? translate("patrolCreateScreen:section.reviewer.placeholder")
            }
            style={selectedReviewer ? $selectorValue : $selectorPlaceholder}
          />
          <ChevronDown size={24} color={colors.navy} strokeWidth={1.8} />
        </TouchableOpacity>
        <View style={$gap10} />
        <Text
          text={translate("patrolCreateScreen:section.reviewer.description")}
          style={$sectionDescription}
        />
        <View style={$gap23} />
        <View style={$divider} />

        {/* Section 3: 점검 항목 (필수) */}
        <View style={[$titleRow, $sectionTop]}>
          <Text
            text={translate("patrolCreateScreen:section.items.title")}
            style={$sectionTitleBlue}
          />
          <Text text=" *" style={$requiredMark} />
        </View>
        <View style={$gap8} />
        <TouchableOpacity
          style={$selectorButton}
          activeOpacity={0.7}
          onPress={() => openModal("template")}
        >
          <Text
            text={
              selectedTemplate?.name ?? translate("patrolCreateScreen:section.items.placeholder")
            }
            style={selectedTemplate ? $selectorValue : $selectorPlaceholder}
          />
          <ChevronDown size={24} color={colors.navy} strokeWidth={1.8} />
        </TouchableOpacity>

        {/* 점검 항목 컨테이너 */}
        {selectedTemplate !== null &&
          items.map((item, index) => (
            <Fragment key={item.id}>
              <View style={$gap8} />
              {index > 0 && <View style={$gap8} />}

              <View style={$itemContainer}>
                {/* 항목 명 인풋 + 삭제 버튼 */}
                <View style={$itemInputRow}>
                  <TextInput
                    style={$itemInput}
                    placeholder={translate("patrolCreateScreen:section.items.itemNamePlaceholder")}
                    placeholderTextColor="#ABABAB"
                    value={item.name}
                    onChangeText={(text) => updateItemName(item.id, text)}
                    maxLength={100}
                  />
                  <TouchableOpacity
                    style={$itemDeleteButton}
                    activeOpacity={0.8}
                    onPress={() => deleteItem(item.id)}
                  >
                    <Text
                      text={translate("patrolCreateScreen:section.items.deleteButton")}
                      style={$itemDeleteText}
                    />
                  </TouchableOpacity>
                </View>

                {/* 설명 */}
                <View style={$gap12} />
                <Text
                  text={translate("patrolCreateScreen:section.items.itemNameDescription")}
                  style={$sectionDescription}
                />

                {/* 점검 사항 카드 목록 */}
                {item.checkCards.map((card, cardIndex) => {
                  const isGood = card.status === "good"
                  return (
                    <Fragment key={card.id}>
                      <View style={cardIndex === 0 ? $gap23 : $gap16} />
                      <View style={$inspectionCard}>
                        {/* 점검 사항 (필수) * */}
                        <View style={$checkTitleRow}>
                          <Text
                            text={translate("patrolCreateScreen:section.items.checkTitle")}
                            style={$checkTitle}
                          />
                          <Text text=" *" style={$requiredMark} />
                        </View>
                        <View style={$gap10} />
                        {/* 점검 사항 이름 인풋 */}
                        <TextInput
                          style={$checkNameInput}
                          placeholder={translate(
                            "patrolCreateScreen:section.items.checkNamePlaceholder",
                          )}
                          placeholderTextColor="#ABABAB"
                          value={card.checkName}
                          onChangeText={(text) =>
                            updateCheckCard(item.id, card.id, { checkName: text })
                          }
                          maxLength={200}
                        />
                        <View style={$gap10} />
                        {/* 설명 */}
                        <Text
                          text={translate("patrolCreateScreen:section.items.checkDescription")}
                          style={$sectionDescription}
                        />
                        <View style={$gap10} />
                        {/* 양호 / 불량 버튼 */}
                        <View style={$statusRow}>
                          <TouchableOpacity
                            style={[
                              $statusButton,
                              isGood ? $statusButtonSelected : $statusButtonUnselected,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => updateCheckCard(item.id, card.id, { status: "good" })}
                          >
                            <Text
                              text={translate("patrolCreateScreen:section.items.goodButton")}
                              style={isGood ? $statusTextSelected : $statusTextUnselected}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              $statusButton,
                              !isGood ? $statusButtonSelected : $statusButtonUnselected,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => updateCheckCard(item.id, card.id, { status: "bad" })}
                          >
                            <Text
                              text={translate("patrolCreateScreen:section.items.badButton")}
                              style={!isGood ? $statusTextSelected : $statusTextUnselected}
                            />
                          </TouchableOpacity>
                        </View>
                        {/* 불량 선택 시 메모 인풋 */}
                        {!isGood && (
                          <>
                            <View style={$gap10} />
                            <TextInput
                              style={$badNoteInput}
                              multiline
                              textAlignVertical="top"
                              placeholder={translate(
                                "patrolCreateScreen:section.items.badNotePlaceholder",
                              )}
                              placeholderTextColor="#ABABAB"
                              value={card.badNote}
                              onChangeText={(text) =>
                                updateCheckCard(item.id, card.id, { badNote: text })
                              }
                            />
                          </>
                        )}
                        <View style={$gap12} />
                        {/* 점검 사항 삭제 버튼 */}
                        <TouchableOpacity
                          style={$deleteCheckButton}
                          activeOpacity={0.8}
                          onPress={() => deleteCheckCard(item.id, card.id)}
                        >
                          <Text
                            text={translate("patrolCreateScreen:section.items.deleteCheckButton")}
                            style={$deleteCheckText}
                          />
                        </TouchableOpacity>
                      </View>
                    </Fragment>
                  )
                })}

                {/* 점검 사항 추가 버튼 */}
                <View style={$gap16} />
                <TouchableOpacity
                  style={$addCheckButton}
                  activeOpacity={0.7}
                  onPress={() => addCheckCard(item.id)}
                >
                  <Plus size={24} color={colors.blue} strokeWidth={1.8} />
                  <Text
                    text={translate("patrolCreateScreen:section.items.addCheckButton")}
                    style={$addCheckButtonText}
                  />
                </TouchableOpacity>
              </View>
            </Fragment>
          ))}

        <View style={$gap8} />
        <TouchableOpacity style={$addItemButton} activeOpacity={0.7} onPress={addItem}>
          <Plus size={24} color={colors.blue} strokeWidth={1.8} />
          <Text
            text={translate("patrolCreateScreen:section.items.addButton")}
            style={$addItemButtonText}
          />
        </TouchableOpacity>
        <View style={$gap23} />
        <View style={$divider} />

        {/* Section 4: 전체 조치 요구사항 */}
        <View style={$sectionTop}>
          <Text
            text={translate("patrolCreateScreen:section.requirements.title")}
            style={$sectionTitleBlack}
          />
        </View>
        <View style={$gap8} />
        <TextInput
          style={$textArea}
          multiline
          textAlignVertical="top"
          placeholder={translate("patrolCreateScreen:section.requirements.placeholder")}
          placeholderTextColor="#CCCCCC"
          value={requirements}
          onChangeText={setRequirements}
          maxLength={1000}
        />
        <View style={$gap10} />
        <Text
          text={translate("patrolCreateScreen:section.requirements.description")}
          style={$sectionDescription}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={$submitButton}
          activeOpacity={0.8}
          onPress={() => setSuccessVisible(true)}
        >
          <Text
            text={translate(
              isEditMode
                ? "patrolCreateScreen:editSubmitButton"
                : "patrolCreateScreen:submitButton",
            )}
            style={$submitButtonText}
          />
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      {/* Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={closeModal}>
        <Pressable style={$modalOverlay} onPress={closeModal}>
          <Pressable style={$modalBox}>
            <Text text={getModalTitle(activeModal)} style={$modalTitle} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={$modalList}
              contentContainerStyle={$modalListContent}
            >
              {modalItems.map((item) => {
                const isSelected = currentSelected?.id === item.id
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[$selectionCard, isSelected && $selectionCardSelected]}
                    activeOpacity={0.7}
                    onPress={() => handleSelect(item)}
                  >
                    <View style={$selectionTexts}>
                      <Text text={item.name} style={$selectionName} />
                      <Text text={item.subtitle} style={$selectionSubtitle} />
                    </View>
                    <View style={[$radio, isSelected && $radioSelected]}>
                      {isSelected && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
            <TouchableOpacity style={$modalCancelButton} activeOpacity={0.8} onPress={closeModal}>
              <Text
                text={translate("patrolCreateScreen:modal.cancelButton")}
                style={$modalCancelText}
              />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
      {/* Success Modal */}
      <Modal
        visible={successVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessVisible(false)}
      >
        <Pressable style={$modalOverlay} onPress={() => setSuccessVisible(false)}>
          <Pressable style={$successModalBox}>
            <View style={$successIconCircle}>
              <Check size={20} color={colors.blue} strokeWidth={2.5} />
            </View>
            <View style={$gap8} />
            <Text text={translate("patrolCreateScreen:successModal.title")} style={$successTitle} />
            <View style={$gap10} />
            <Text
              text={translate("patrolCreateScreen:successModal.message")}
              style={$successMessage}
            />
            <View style={$gap14} />
            <TouchableOpacity
              style={$successConfirmButton}
              activeOpacity={0.8}
              onPress={() => {
                setSuccessVisible(false)
                navigation.navigate("PatrolDetail", { id: "new" })
              }}
            >
              <Text
                text={translate("patrolCreateScreen:successModal.confirmButton")}
                style={$successConfirmText}
              />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </StackScreen>
  )
}

// ── Layout ────────────────────────────────────────────────────────────────────

const $scrollView: ViewStyle = { flex: 1 }

const $scrollContent: ViewStyle = {
  padding: 20,
  paddingBottom: 40,
}

// ── Gaps ──────────────────────────────────────────────────────────────────────

const $gap8: ViewStyle = { height: 8 }
const $gap10: ViewStyle = { height: 10 }
const $gap12: ViewStyle = { height: 12 }
const $gap14: ViewStyle = { height: 14 }
const $gap16: ViewStyle = { height: 16 }
const $gap23: ViewStyle = { height: 23 }
const $sectionTop: ViewStyle = { marginTop: 23 }

// ── Section Title ─────────────────────────────────────────────────────────────

const $titleRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $sectionTitleBlue: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: colors.navy,
}

const $sectionTitleBlack: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: "#000000",
}

const $requiredMark: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: "#FF0000",
}

// ── Divider ───────────────────────────────────────────────────────────────────

const $divider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
}

// ── Selector Button ───────────────────────────────────────────────────────────

const $selectorButton: ViewStyle = {
  height: 59,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  borderWidth: 1,
  borderColor: "#ABABAB",
  borderRadius: 8,
}

const $selectorPlaceholder: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#ABABAB",
  flex: 1,
}

const $selectorValue: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#000000",
  flex: 1,
}

// ── Inspection Item ───────────────────────────────────────────────────────────

const $itemContainer: ViewStyle = {
  borderWidth: 1,
  borderColor: "#000000",
  borderRadius: 8,
  padding: 14,
}

const $itemInputRow: ViewStyle = {
  height: 47,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ABABAB",
  borderRadius: 8,
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
}

const $itemInput: TextStyle = {
  flex: 1,
  paddingHorizontal: 14,
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#000000",
}

const $itemDeleteButton: ViewStyle = {
  height: 47,
  paddingHorizontal: 14,
  backgroundColor: "#000000",
  justifyContent: "center",
  alignItems: "center",
}

const $itemDeleteText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: "#FFFFFF",
}

const $inspectionCard: ViewStyle = {
  backgroundColor: "#F3F8FF",
  borderRadius: 8,
  padding: 14,
}

const $checkTitleRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $checkTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: "#000000",
}

const $checkNameInput: TextStyle = {
  height: 50,
  borderWidth: 1,
  borderColor: "#ABABAB",
  borderRadius: 8,
  paddingHorizontal: 14,
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#000000",
  backgroundColor: "transparent",
}

const $statusRow: ViewStyle = {
  flexDirection: "row",
  gap: 11,
}

const $statusButton: ViewStyle = {
  flex: 1,
  height: 44,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,
}

const $statusButtonSelected: ViewStyle = {
  backgroundColor: colors.blue,
}

const $statusButtonUnselected: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#D3D3D3",
}

const $statusTextSelected: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.medium,
  color: "#FFFFFF",
}

const $statusTextUnselected: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.medium,
  color: "#4C4C4C",
}

const $badNoteInput: TextStyle = {
  height: 50,
  borderWidth: 1,
  borderColor: "#D3D3D3",
  borderRadius: 8,
  paddingHorizontal: 14,
  paddingTop: 12,
  paddingBottom: 12,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#ABABAB",
  backgroundColor: "#F3F2F0",
}

const $deleteCheckButton: ViewStyle = {
  height: 44,
  backgroundColor: "#000000",
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
}

const $deleteCheckText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#FFFFFF",
}

const $addCheckButton: ViewStyle = {
  height: 50,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderWidth: 1,
  borderColor: colors.blue,
  borderRadius: 8,
}

const $addCheckButtonText: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: colors.blue,
}

// ── Add Item Button ───────────────────────────────────────────────────────────

const $addItemButton: ViewStyle = {
  height: 59,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderWidth: 1,
  borderColor: colors.blue,
  borderRadius: 8,
}

const $addItemButtonText: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: colors.blue,
}

// ── Description ───────────────────────────────────────────────────────────────

const $sectionDescription: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: "#979797",
}

// ── Text Area ─────────────────────────────────────────────────────────────────

const $textArea: TextStyle = {
  height: 135,
  borderWidth: 1,
  borderColor: "#ABABAB",
  borderRadius: 8,
  paddingHorizontal: 16,
  paddingTop: 14,
  paddingBottom: 14,
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#000000",
}

// ── Submit Button ─────────────────────────────────────────────────────────────

const $submitButton: ViewStyle = {
  height: 50,
  backgroundColor: colors.blue,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 32,
}

const $submitButtonText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}

// ── Selection Modal ───────────────────────────────────────────────────────────

const $modalOverlay: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  justifyContent: "center",
  alignItems: "center",
}

const $modalBox: ViewStyle = {
  width: "85%",
  maxHeight: "75%",
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  paddingHorizontal: 20,
  paddingTop: 28,
  paddingBottom: 20,
}

const $modalTitle: TextStyle = {
  fontSize: 20,
  fontFamily: typography.primary.bold,
  color: "#000000",
  marginBottom: 20,
}

const $modalList: ViewStyle = {
  flexShrink: 1,
}

const $modalListContent: ViewStyle = {
  gap: 16,
  paddingBottom: 4,
}

const $selectionCard: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingVertical: 14,
  borderWidth: 1,
  borderColor: "#BEBEBE",
  backgroundColor: "#FFFFFF",
  borderRadius: 10,
}

const $selectionCardSelected: ViewStyle = {
  borderColor: colors.blue,
  backgroundColor: "#ECF4FE",
}

const $selectionTexts: ViewStyle = {
  flex: 1,
  marginRight: 12,
}

const $selectionName: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: "#181818",
}

const $selectionSubtitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: "#5F5F5F",
}

const $radio: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 1.5,
  borderColor: "#CBCBCB",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

const $radioSelected: ViewStyle = {
  borderColor: colors.blue,
  backgroundColor: colors.blue,
}

const $modalCancelButton: ViewStyle = {
  height: 50,
  backgroundColor: "#000000",
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
}

const $modalCancelText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}

// ── Success Modal ─────────────────────────────────────────────────────────────

const $successModalBox: ViewStyle = {
  width: "85%",
  height: 214,
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  paddingHorizontal: 24,
  paddingTop: 24,
  paddingBottom: 20,
  alignItems: "center",
  justifyContent: "center",
}

const $successIconCircle: ViewStyle = {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: "#E3EDFB",
  justifyContent: "center",
  alignItems: "center",
}

const $successTitle: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.semiBold,
  color: "#000000",
  textAlign: "center",
}

const $successMessage: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: "#7B7B7B",
  textAlign: "center",
}

const $successConfirmButton: ViewStyle = {
  width: "100%",
  height: 50,
  backgroundColor: colors.blue,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
}

const $successConfirmText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
