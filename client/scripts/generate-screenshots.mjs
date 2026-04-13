import { createCanvas } from 'canvas'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true })
}

function generateScreenshot(width, height, filename) {
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = '#0a2329'
  ctx.fillRect(0, 0, width, height)

  // Header bar
  ctx.fillStyle = '#0D4F4F'
  ctx.fillRect(0, 0, width, height * 0.08)

  // Logo text in header
  ctx.fillStyle = '#4ECDC4'
  ctx.font = `bold ${height * 0.04}px Arial`
  ctx.textAlign = 'left'
  ctx.fillText('TalentOS', width * 0.05, height * 0.055)

  // Hero text
  ctx.fillStyle = '#ffffff'
  ctx.font = `bold ${height * 0.05}px Arial`
  ctx.textAlign = 'center'
  ctx.fillText('Find Your Dream Career', width / 2, height * 0.3)

  ctx.fillStyle = '#4ECDC4'
  ctx.font = `bold ${height * 0.04}px Arial`
  ctx.fillText('AI-Powered Job Platform', width / 2, height * 0.4)

  // Mock cards
  for (let i = 0; i < 3; i++) {
    const cardX = width * 0.05
    const cardY = height * (0.5 + i * 0.15)
    const cardW = width * 0.9
    const cardH = height * 0.12

    ctx.fillStyle = '#0d2e36'
    ctx.beginPath()
    ctx.roundRect(cardX, cardY, cardW, cardH, 12)
    ctx.fill()

    ctx.fillStyle = '#4ECDC4'
    ctx.font = `bold ${height * 0.025}px Arial`
    ctx.textAlign = 'left'
    ctx.fillText(['Senior React Developer', 'UI/UX Designer', 'DevOps Engineer'][i],
      cardX + 20, cardY + cardH * 0.4)

    ctx.fillStyle = '#9ca3af'
    ctx.font = `${height * 0.02}px Arial`
    ctx.fillText(['Remote • $80K-$120K', 'New York • $70K-$100K', 'Berlin • $90K-$130K'][i],
      cardX + 20, cardY + cardH * 0.7)
  }

  writeFileSync(
    join(publicDir, filename),
    canvas.toBuffer('image/png')
  )
  console.log(`✅ Generated ${filename}`)
}

// Desktop screenshot (wide)
generateScreenshot(1280, 800, 'screenshot-wide.png')

// Mobile screenshot
generateScreenshot(390, 844, 'screenshot-mobile.png')

console.log('✅ All screenshots generated!')
