# Icon Set Generator

A web application that generates a consistent set of 4 icons from a single prompt using AI image generation.

## Features

- Generate 4 different 512x512 PNG icons from a single prompt
- 5 preset styles (Pastels, Bubbles, Geometric, Watercolor, Neon)
- Optional brand color input (HEX format)
- Download generated icons
- Responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your Replicate API token:
```bash
cp .env.example .env
```
Then edit `.env` and add your Replicate API token:
```
REPLICATE_API_TOKEN=your_token_here
```

3. Start both frontend and backend servers:
```bash
npm run dev:all
```

Or start them separately:
```bash
npm run server
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Usage

1. Enter a prompt for your icon set (e.g., "Toys")
2. Select a preset style
3. Optionally add brand colors in HEX format
4. Click "Generate Icon Set"
5. Download individual icons when ready

## API

Uses Replicate API with the flux-schnell model for image generation.

