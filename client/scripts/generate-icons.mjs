import { createCanvas } from 'canvas'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true })
}

function generateIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  // Background — dark teal
  ctx.fillStyle = '#0D4F4F'
  ctx.beginPath()
  const radius = size * 0.2
  ctx.roundRect(0, 0, size, size, radius)
  ctx.fill()

  // Letter T — mint color
  ctx.fillStyle = '#4ECDC4'
  ctx.font = `900 ${size * 0.55}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('T', size / 2, size / 2 + size * 0.03)

  const outputPath = join(publicDir, `pwa-${size}x${size}.png`)
  writeFileSync(outputPath, canvas.toBuffer('image/png'))
  console.log(`✅ Generated pwa-${size}x${size}.png`)
}

// Generate favicon too
function generateFavicon() {
  const size = 32
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#0D4F4F'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#4ECDC4'
  ctx.font = `900 ${size * 0.7}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('T', size / 2, size / 2)
  writeFileSync(join(publicDir, 'favicon.ico'), canvas.toBuffer('image/png'))
  console.log('✅ Generated favicon.ico')
}

generateIcon(192)
generateIcon(512)
generateFavicon()
console.log('✅ All icons generated!')
