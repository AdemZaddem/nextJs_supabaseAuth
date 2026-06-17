import type { Role } from "@/types";

const roleHierarchy:Record<Role,number> = {
    USER:1,
    ADMIN:2
}

export const hasPermission = (userRole:Role,requiredRole:Role):boolean =>{
    if(!userRole)return false
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}