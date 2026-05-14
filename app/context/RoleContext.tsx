import { createContext, FC, PropsWithChildren, useContext, useState } from "react"

export type Role = "admin" | "worker"

type RoleContextType = {
  role: Role
  setRole: (role: Role) => void
}

const RoleContext = createContext<RoleContextType | null>(null)

export const RoleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [role, setRole] = useState<Role>("worker")

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>
}

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext)
  if (!context) throw new Error("useRole must be used within a RoleProvider")
  return context
}
