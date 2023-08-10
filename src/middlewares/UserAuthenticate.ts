// Define se o usuario tem permição
export async function authenticate(auth: boolean) {
  if (auth === false) {
    console.log('authenticate pasta middleware', auth)
    throw new Error('⚠ Você não tem permissão!!')
  }
}
