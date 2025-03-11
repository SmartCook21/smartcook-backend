import path from 'node:path'
import url from 'node:url'
import env from '#start/env'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'SmartCook API',
  version: '1.0.0',
  description: 'Interface contract for SmartCook API',
  tagIndex: 2,
  productionEnv: env.get('NODE_ENV') === 'production',
  info: {
    title: 'SmartCook API',
    version: '1.0.0',
    description: 'Interface contract for SmartCook API',
  },
  snakeCase: true,
  debug: false,
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PATCH',
  authMiddlewares: ['auth'],
  persistAuthorization: true,
  showFullPath: false,
}
