import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  try {
    const filePath = join(process.cwd(), 'public/data/site-config.json')
    const data = readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load site configuration'
    })
  }
})
