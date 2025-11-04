const express = require('express');
const cors = require('cors');
const path = require('path');
const { nanoid } = require('nanoid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const fs = require('fs');

const DB_FILE = path.join(__dirname, 'db.json');
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({ licenses: [], applications: [] }, null, 2));

const adapter = new FileSync(DB_FILE);
const db = low(adapter);
db.defaults({ licenses: [], applications: [] }).write();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-admin-key';

function requireAdmin(req, res, next) {
  const key = req.get('x-admin-key') || req.query.adminKey;
  if (!key || key !== ADMIN_KEY) return res.status(401).json({ error: 'unauthorized' });
  next();
}

// Create a license (admin only)
app.post('/api/licenses', requireAdmin, (req, res) => {
  const { storeUrl, reseller, durationDays } = req.body;
  if (!storeUrl) return res.status(400).json({ error: 'storeUrl is required' });
  const key = `LIC-${nanoid(10).toUpperCase()}`;
  const createdAt = Date.now();
  const expiresAt = createdAt + ((durationDays || 365) * 24 * 60 * 60 * 1000);
  const license = { key, storeUrl, reseller: reseller || null, createdAt, expiresAt, active: true };
  db.get('licenses').push(license).write();
  res.json(license);
});

// Applicant endpoint - store application and optionally auto-approve (create license)
app.post('/api/apply', (req, res) => {
  const { fullName, email, phone } = req.body || {};
  if (!fullName || !email) return res.status(400).json({ error: 'fullName and email required' });
  const createdAt = Date.now();
  const application = { id: nanoid(8), fullName, email, phone: phone || null, createdAt, status: 'pending' };
  db.get('applications').push(application).write();

  // Auto-approve and create license when AUTO_APPROVE env var is truthy
  const auto = process.env.AUTO_APPROVE === '1' || process.env.AUTO_APPROVE === 'true';
  if (auto) {
    const key = `LIC-${nanoid(10).toUpperCase()}`;
    const expiresAt = createdAt + (365 * 24 * 60 * 60 * 1000);
    const license = { key, storeUrl: null, reseller: fullName, createdAt, expiresAt, active: true };
    db.get('licenses').push(license).write();
    // mark application approved
    db.get('applications').find({ id: application.id }).assign({ status: 'approved', licenseKey: key }).write();
    return res.json({ application: db.get('applications').find({ id: application.id }).value(), license });
  }

  return res.json({ application });
});

// List licenses (admin)
app.get('/api/licenses', requireAdmin, (req, res) => {
  const list = db.get('licenses').value();
  res.json(list);
});

// Get license by key
app.get('/api/licenses/:key', (req, res) => {
  const { key } = req.params;
  const lic = db.get('licenses').find({ key }).value();
  if (!lic) return res.status(404).json({ error: 'not_found' });
  res.json(lic);
});

// Validate a license
app.post('/api/licenses/validate', (req, res) => {
  const { key, storeUrl } = req.body;
  if (!key) return res.status(400).json({ valid: false, reason: 'missing_key' });
  const lic = db.get('licenses').find({ key }).value();
  if (!lic) return res.json({ valid: false, reason: 'not_found' });
  if (!lic.active) return res.json({ valid: false, reason: 'inactive' });
  if (Date.now() > lic.expiresAt) return res.json({ valid: false, reason: 'expired' });
  if (lic.storeUrl && storeUrl && lic.storeUrl !== storeUrl) return res.json({ valid: false, reason: 'store_mismatch' });
  return res.json({ valid: true, license: lic });
});

// Serve admin UI for license generation
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve parent folder static files (so front-end index.html still works when server runs from /server)
app.use('/', express.static(path.join(__dirname, '..')));

app.listen(PORT, () => console.log(`License API running on http://localhost:${PORT} (admin key: set ADMIN_KEY env var)`));
