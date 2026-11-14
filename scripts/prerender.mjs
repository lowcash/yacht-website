import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distIndex = resolve(root, 'dist/index.html')

async function prerender() {
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })

  try {
    const { StaticApp, ORGANIZATION_JSON_LD } = await vite.ssrLoadModule('/src/prerender/StaticApp.tsx')

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
    await vite.close()
  }
}

prerender().catch((error) => {
  console.error(error)
  process.exit(1)
})
