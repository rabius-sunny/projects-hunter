const EMAIL = 'user@projects-hunter.com'
const PASSWORD = '147570'
export function checkCreds(email: string, password: string): boolean {
  return email === EMAIL && password === PASSWORD
}
