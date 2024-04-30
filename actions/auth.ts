'use server'

import { checkCreds } from '~/helper/server/auth'

export const signIn = async (email: string, password: string) => {
  try {
    if (checkCreds(email, password)) return { ok: true }
    return { error: 'ask the correct credentials from your wife!' }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}
