#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const [, , rawTarget] = process.argv

if (!rawTarget) {
  console.error('Usage: node create-project.mjs <directory>')
  process.exit(1)
}

const starterRoot = resolve(fileURLToPath(new URL('.', import.meta.url)))
const templateDir = resolve(starterRoot, 'template')
const targetDir = resolve(process.cwd(), rawTarget)

if (existsSync(targetDir)) {
  console.error(`Target directory already exists: ${targetDir}`)
  process.exit(1)
}

mkdirSync(targetDir, { recursive: true })
cpSync(templateDir, targetDir, { recursive: true })

console.log(`Cloudflare Nuxt Pages Kit copied to ${targetDir}`)
console.log('Next steps:')
console.log(`  cd ${basename(targetDir)}`)
console.log('  pnpm install')
console.log('  pnpm wrangler:config:test && pnpm dev')
