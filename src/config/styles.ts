import { StylePreset } from '../types'

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 1,
    name: 'Hand-drawn Pastel',
    description: 'Doodle / ilustrasi tangan dengan warna lembut pastel, outline ungu tipis. Playful, friendly, cocok untuk UI anak-anak atau sticker apps',
    promptSuffix: ', hand-drawn doodle style, pastel colors, soft outline, playful illustration, friendly, children UI style, sticker design',
    image: '/presets/rocket_1.jpg'
  },
  {
    id: 2,
    name: 'Cartoon Space Scene',
    description: 'Kartun dengan background lingkaran dan efek bintang. Warna pastel + elemen dekorasi. Lively dengan sparkles, cocok untuk onboarding screens, badges, atau achievement icons',
    promptSuffix: ', cartoon style, space scene, circular background, star effects, pastel colors, decorative elements, sparkles, lively, onboarding style, badge design, achievement icon',
    image: '/presets/rocket_2.jpg'
  },
  {
    id: 3,
    name: 'Cloudy Adventure',
    description: 'Kartun dengan latar awan. Tone warna hijau muda & pastel. Memberikan kesan journey / growth / mission. Cocok untuk progress tracking atau gamified UI',
    promptSuffix: ', cartoon style, cloudy background, light green and pastel tones, journey theme, growth, mission, progress tracking, gamified UI style',
    image: '/presets/rocket_3.jpg'
  },
  {
    id: 4,
    name: 'Modern Gradient',
    description: 'Flat + gradient modern. Warna biru dengan efek glossy. Clean, techy, minimalis. Cocok untuk startup tech branding, dashboard, atau hero section',
    promptSuffix: ', modern flat design, gradient style, blue colors, glossy effect, clean, techy, minimalist, startup branding, dashboard style, hero section',
    image: '/presets/rocket_4.jpg'
  },
  {
    id: 5,
    name: 'Mono Minimalist Badge',
    description: 'Silhouette / symbol style. Hanya 2 warna: putih dan hijau keabu-abuan. Kesan profesional, badge-like. Cocok untuk logo, watermark, atau icon system',
    promptSuffix: ', silhouette style, symbol design, two colors only, white and grayish green, professional, badge-like, logo style, watermark, icon system',
    image: '/presets/rocket_5.jpg'
  }
]

export const REPLICATE_MODEL = 'black-forest-labs/flux-schnell'
export const REPLICATE_MODEL_VERSION = 'latest'

