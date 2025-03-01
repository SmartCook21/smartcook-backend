import type { Request } from '@adonisjs/core/http'
import env from '#start/env'
import axios from 'axios'
export async function getClientIp(request: Request): Promise<string | undefined> {
  if (env.get('NODE_ENV') === 'development') {
    const { data } = await axios.get('https://api.ipify.org/?format=json')
    return data.ip
  }

  // Priorité à l'adresse IP de Cloudflare
  let ip = request.header('CF-Connecting-IP')

  // Sinon, vérifier l'en-tête X-Forwarded-For
  if (!ip) {
    ip = request.header('X-Forwarded-For')?.split(',')[0]
  }

  // En dernier recours, utiliser request.ip()
  if (!ip && !request.header('X-Forwarded-For')?.split(',')[0]) {
    ip = request.ip()
  }

  return ip
}
