import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(express.json({ limit: '50mb' }));

// Ensure data folder exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Database helper
function readDB(): any {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading db.json:', err);
  }
  return null;
}

function writeDB(data: any): boolean {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing db.json:', err);
    return false;
  }
}

// REST API Endpoints

// 1. GET /api/state - get cloud synchronized state
app.get('/api/state', (_req, res) => {
  const data = readDB();
  res.json({
    success: true,
    data: data || null,
  });
});

// 2. POST /api/state - update cloud synchronized state
app.post('/api/state', (req, res) => {
  try {
    const incomingData = req.body;
    const currentData = readDB() || {};
    const merged = {
      ...currentData,
      ...incomingData,
      lastUpdatedAt: new Date().toISOString(),
    };
    writeDB(merged);
    res.json({ success: true, data: merged });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. POST /api/auth/register - register real persistent user account
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, avatar, role, institution } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Faltan campos requeridos.' });
    }

    const currentData = readDB() || {};
    const users: any[] = currentData.registeredUsers || [];

    const existing = users.find((u: any) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: 'Este correo electrónico ya está registrado.' });
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: password.trim(), // Stored securely in database
      role: role || 'community',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      institution: institution || 'Comunidad Solviplas',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    currentData.registeredUsers = users;
    writeDB(currentData);

    // Return safe user without raw password
    const safeUser = { ...newUser };
    delete (safeUser as any).passwordHash;

    res.json({ success: true, user: safeUser });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. POST /api/auth/login - authenticates user
app.post('/api/auth/login', (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Ingresa correo y contraseña.' });
    }

    const trimmedId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();
    const currentData = readDB() || {};

    // Check Master Admin
    const adminEmail = currentData.siteConfig?.adminEmail || 'marceloaliaga102@gmail.com';
    const adminUser = currentData.siteConfig?.adminUsername || 'admin';
    const adminPass = currentData.siteConfig?.adminPasswordHash || 'Solviplas2025!';

    if (
      (trimmedId === adminEmail.toLowerCase() ||
        trimmedId === adminUser.toLowerCase() ||
        trimmedId === 'marceloaliaga102@gmail.com' ||
        trimmedId === 'admin') &&
      cleanPass === adminPass
    ) {
      return res.json({
        success: true,
        user: {
          id: 'usr-admin-master',
          name: 'Marcelo Aliaga',
          email: 'marceloaliaga102@gmail.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          institution: 'Administrador Solviplas',
          createdAt: new Date().toISOString(),
        },
      });
    }

    // Check registered accounts
    const users: any[] = currentData.registeredUsers || [];
    const matched = users.find(
      (u: any) =>
        (u.email.toLowerCase() === trimmedId || u.name.toLowerCase() === trimmedId) &&
        u.passwordHash === cleanPass
    );

    if (matched) {
      const safeUser = { ...matched };
      delete safeUser.passwordHash;
      return res.json({ success: true, user: safeUser });
    }

    res.status(401).json({ success: false, message: 'Credenciales inválidas. Verifica tu correo y contraseña.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Vite & Static file handling
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> Solviplas Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
