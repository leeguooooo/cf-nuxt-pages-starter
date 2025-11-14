#!/usr/bin/env node
import { cpSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const source = resolve(projectRoot, 'wrangler.pages.toml')
const destination = resolve(projectRoot, 'wrangler.toml')

if (!existsSync(source)) {
  console.error('wrangler.pages.toml 不存在，请先配置 Pages 项目')
  process.exit(1)
}

cpSync(source, destination)
console.log('[website] wrangler.pages.toml 已复制为 wrangler.toml')
