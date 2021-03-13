/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { api } from './server'

let authed = false

export function isAuthed () { return authed }

export async function login (username: string, password: string): Promise<[boolean, string?]> {
  console.log(`Logging in with ${username} and ${password}...`)

  try {
    const response = await api.post('/login', { username, password })

    if (response.data.result) {
      authed = true
      return [true]
    } else {
      authed = false
      return [false, response.data.message as unknown as string]
    }
  } catch (err) {
    authed = false
    return [false, 'An error happened while logging you in.']
  }
}
