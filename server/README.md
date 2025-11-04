# scaled-licenses-server

Simple Node/Express license generation API for scaled.info / OgScale.

Installation

1. cd server
2. npm install
3. Set an ADMIN_KEY environment variable (recommended):

   PowerShell:
   ```powershell
   $env:ADMIN_KEY = 'my-secret-key'
   npm start
   ```

   Or (one-shot):
   ```powershell
   $env:ADMIN_KEY='my-secret-key'; npm start
   ```

Usage

- Admin UI: http://localhost:4000/admin — enter your admin key and create licenses.
- API endpoints:
  - POST /api/licenses (admin) — create license. Header `x-admin-key` or query `?adminKey=` required.
  - GET /api/licenses (admin) — list all licenses.
  - GET /api/licenses/:key — fetch a single license.
  - POST /api/licenses/validate — body { key, storeUrl } — validate a license.

 - POST /api/apply — applicant endpoint to submit an application: body { fullName, email, phone }.
   - By default this only stores an application with status `pending`.
   - If you set the environment variable `AUTO_APPROVE=1` the server will automatically create a license when an application is submitted and return it in the response.

Notes

- The server uses a simple file `db.json` (lowdb). For production, migrate to a proper DB.
- Protect the admin key and run the server behind TLS in production.
 - To enable automatic license creation for applicants (dev only), start with `AUTO_APPROVE=1`:

   PowerShell:
   ```powershell
   $env:ADMIN_KEY='my-secret-key'; $env:AUTO_APPROVE='1'; npm start
   ```
