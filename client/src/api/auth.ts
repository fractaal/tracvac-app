export async function login (username: string, password: string) {
  console.log(`Logging in with ${username} and ${password}...`)
  return new Promise(resolve => setTimeout(() => { resolve(true) }, 2500))
}
