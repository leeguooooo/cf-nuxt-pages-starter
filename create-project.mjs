#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const [, , rawTarget] = process.argv

if (!rawTarget || rawTarget === '--help' || rawTarget === '-h') {
  console.log(`
Cloudflare Nuxt Pages Kit - 快速创建项目

用法:
  create-cf-nuxt-pages <directory>
  npx cf-nuxt-pages-kit <directory>

示例:
  create-cf-nuxt-pages my-app
  npx cf-nuxt-pages-kit my-admin

更多信息: https://cf-nuxt-pages-kit-site.pages.dev/
`)
  process.exit(0)
}

const starterRoot = resolve(fileURLToPath(new URL('.', import.meta.url)))
const templateDir = resolve(starterRoot, 'template')
const targetDir = resolve(process.cwd(), rawTarget)

if (!existsSync(templateDir)) {
  console.error(`错误: 找不到模板目录: ${templateDir}`)
  console.error('请确保已正确安装 cf-nuxt-pages-kit')
  process.exit(1)
}

if (existsSync(targetDir)) {
  console.error(`错误: 目标目录已存在: ${targetDir}`)
  process.exit(1)
}

try {
  console.log(`正在创建项目: ${rawTarget}...`)
  mkdirSync(targetDir, { recursive: true })
  cpSync(templateDir, targetDir, { recursive: true })
  
  console.log(`\n✓ 项目创建成功！`)
  console.log(`\n下一步：`)
  console.log(`  cd ${basename(targetDir)}`)
  console.log(`  pnpm install`)
  console.log(`  pnpm wrangler:config:test && pnpm dev`)
  console.log(`\n更多信息: https://cf-nuxt-pages-kit-site.pages.dev/`)
} catch (error) {
  console.error(`错误: 创建项目失败`)
  console.error(error.message)
  process.exit(1)
}
