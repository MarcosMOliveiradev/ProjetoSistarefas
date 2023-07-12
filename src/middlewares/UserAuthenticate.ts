// Define se o usuario tem permição
export function authenticate(auth: boolean) {
  if (auth === false) {
    throw new Error('⚠ Você não tem permissão!!')
  }
}
