import env from '#start/env'

export const verifyTurnstileToken = async (token: string): Promise<boolean> => {
  const secretKey = env.get('TURNSTILE_SECRET')

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  const data = await response.json()
  if (!data) {
    return false
  }

  return data.success || false
}
