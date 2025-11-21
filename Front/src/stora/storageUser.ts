import type { userDTO } from "@/dtos/userDto"


export async function storageUserSave(user: userDTO) {
  localStorage.setItem("userProfile", JSON.stringify(user))
}

export async function storageUserGet() {
    const storage = localStorage.getItem("userProfile")
    const user: userDTO = storage ? JSON.parse(storage) : {}
    return user
}

export async function storageUserRemove() {
    localStorage.removeItem("userProfile")
}