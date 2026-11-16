import { createElement } from 'react'

import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { renderToString } from 'react-dom/server'
import { build } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distIndex = resolve(root, 'dist/index.html')

async function prerender() {
  // SSR build (same asset hashing/paths as the client build) instead of the dev server,
  // so imported images resolve to their real /assets URLs in the prerendered HTML.
  const ssrOutDir = resolve(root, 'dist-ssr')
  await build({
    root,
    logLevel: 'error',
    build: { ssr: resolve(root, 'src/prerender/StaticApp.tsx'), outDir: ssrOutDir, emptyOutDir: true },
  })

  try {
    const { StaticApp, ORGANIZATION_JSON_LD } = await import(pathToFileURL(resolve(ssrOutDir, 'StaticApp.js')).href)

    const appHtml = renderToString(createElement(StaticApp))
    const jsonLd = JSON.stringify(ORGANIZATION_JSON_LD, null, 2)

    let html = readFileSync(distIndex, 'utf8')

    if (!html.includes('<div id="root"')) {
      throw new Error('dist/index.html is missing #root')
    }

    html = html.replace(/<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`)

    const jsonLdScript = `<script type="application/ld+json">\n${jsonLd}\n    </script>`
    if (html.includes('application/ld+json')) {
      html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, jsonLdScript)
    } else {
      html = html.replace('</head>', `    ${jsonLdScript}\n  </head>`)
    }

    writeFileSync(distIndex, html)
    console.log('Prerendered content into dist/index.html')
  } finally {
    rmSync(ssrOutDir, { recursive: true, force: true })
  }
}

prerender().catch((error) => {
  console.error(error)
  process.exit(1)
})
