import { logDevError } from "@/utils/logDevError"

export type SignOutHandler = () => Promise<void> | void

let currentHandler: SignOutHandler | null = null

export function registerSignOutHandler(handler: SignOutHandler | null) {
  currentHandler = handler
}

export async function triggerRegisteredSignOut() {
  try {
    if (currentHandler) {
      await currentHandler()
    }
  } catch (error) {
    logDevError("Failed to run registered signOut handler", error)
  }
}
