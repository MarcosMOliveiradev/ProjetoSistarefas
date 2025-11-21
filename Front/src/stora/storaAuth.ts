export async function storageAuthTokenSave(token: string){
    localStorage.setItem( "@token", token )
}

export async function storageAuthTokenGet() {
    const token = localStorage.getItem("@token")
    return token
}

export async function storageAuthTokenRemove() {
    localStorage.removeItem("@token")
}