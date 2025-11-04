import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Data = { ok: boolean; message?: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' })
  const { fullName, email, phone } = req.body
  if (!fullName || !email || !phone) return res.status(400).json({ ok: false, message: 'Missing fields' })

  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
  const file = path.join(dataDir, 'applications.json')
  let apps = []
  if (fs.existsSync(file)) apps = JSON.parse(fs.readFileSync(file, 'utf8'))
  apps.push({ fullName, email, phone, createdAt: new Date().toISOString() })
  fs.writeFileSync(file, JSON.stringify(apps, null, 2))
  res.status(200).json({ ok: true })
}
