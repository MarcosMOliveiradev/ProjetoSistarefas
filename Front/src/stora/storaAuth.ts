export async function storageAuthTokenSave(token: string){
    await localStorage.setItem( "@token", token )
}

export async function storageAuthTokenGet() {
    const token = await localStorage.getItem("@token")
    return token
}

export async function storageAuthTokenRemove() {
    await localStorage.removeItem("@token")
}