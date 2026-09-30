import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'talaba_kassa_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// Database path
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Seed Data
const initialData = {
  users: [
    {
      id: 'usr_admin_1',
      name: 'Sherzodbek Qodirov',
      email: 'admin@kassa.uz',
      passwordHash: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      phone: '+998 90 123 45 67',
      institution: 'TATU (Toshkent Axborot Texnologiyalari Universiteti)',
      faculty: 'Dasturiy Injiniring',
      status: 'active',
      monthlyBudget: 3000000,
      avatarColor: 'from-amber-500 to-orange-600',
      createdAt: new Date('2026-09-01T08:00:00Z').toISOString()
    },
    {
      id: 'usr_mgr_1',
      name: 'Nodira Salimova',
      email: 'manager@kassa.uz',
      passwordHash: bcrypt.hashSync('manager123', 10),
      role: 'manager',
      phone: '+998 93 987 65 43',
      institution: "O'zMU (O'zbekiston Milliy Universiteti)",
      faculty: 'Iqtisodiyot va Moliya kafedrasi',
      status: 'active',
      monthlyBudget: 2500000,
      avatarColor: 'from-emerald-500 to-teal-600',
      createdAt: new Date('2026-09-05T09:30:00Z').toISOString()
    },
    {
      id: 'usr_std_1',
      name: 'Jasur Karimov',
      email: 'student@kassa.uz',
      passwordHash: bcrypt.hashSync('student123', 10),
      role: 'student',
      phone: '+998 97 555 44 33',
      institution: 'TATU',
      faculty: 'Kiberxavfsizlik, 3-kurs',
      status: 'active',
      monthlyBudget: 1800000,
      avatarColor: 'from-blue-500 to-indigo-600',
      createdAt: new Date('2026-09-10T10:00:00Z').toISOString()
    },
    {
      id: 'usr_std_2',
      name: 'Madina Aliyeva',
      email: 'madina@kassa.uz',
      passwordHash: bcrypt.hashSync('student123', 10),
      role: 'student',
      phone: '+998 94 333 22 11',
      institution: 'Jahon Tillari Universiteti',
      faculty: 'Tarjima nazariyasi, 2-kurs',
      status: 'active',
      monthlyBudget: 1500000,
      avatarColor: 'from-pink-500 to-rose-600',
      createdAt: new Date('2026-09-12T11:15:00Z').toISOString()
    },
    {
      id: 'usr_std_3',
      name: 'Bobur Mirzayev',
      email: 'bobur@kassa.uz',
      passwordHash: bcrypt.hashSync('student123', 10),
      role: 'student',
      phone: '+998 99 777 88 99',
      institution: 'TDIU (Iqtisodiyot Universiteti)',
      faculty: 'Bank ishi, 4-kurs',
      status: 'active',
      monthlyBudget: 1200000,
      avatarColor: 'from-purple-500 to-indigo-600',
      createdAt: new Date('2026-09-15T14:20:00Z').toISOString()
    }
  ],
  transactions: [
    {
      id: 'tx_1',
      userId: 'usr_std_1',
      type: 'income',
      amount: 1200000,
      category: 'Stipendiya',
      method: 'Humo / UzCard',
      description: 'Sentabr oyi davlat stipendiyasi',
      date: '2026-09-15',
      createdAt: new Date('2026-09-15T10:00:00Z').toISOString()
    },
    {
      id: 'tx_2',
      userId: 'usr_std_1',
      type: 'income',
      amount: 800000,
      category: "Ota-onadan jo'natma",
      method: 'Click',
      description: 'Oylik yoqilg‘i va oziq-ovqat uchun yordam',
      date: '2026-09-16',
      createdAt: new Date('2026-09-16T12:00:00Z').toISOString()
    },
    {
      id: 'tx_3',
      userId: 'usr_std_1',
      type: 'expense',
      amount: 450000,
      category: 'Ijara / Yotoqxona',
      method: 'Bank o‘tkazmasi',
      description: 'Talabalar turar joyi oylik to‘lovi',
      date: '2026-09-17',
      createdAt: new Date('2026-09-17T09:00:00Z').toISOString()
    },
    {
      id: 'tx_4',
      userId: 'usr_std_1',
      type: 'expense',
      amount: 240000,
      category: 'Oziq-ovqat',
      method: 'UzCard',
      description: 'Korzinka supermarketidan oylik mahsulotlar',
      date: '2026-09-18',
      createdAt: new Date('2026-09-18T16:30:00Z').toISOString()
    },
    {
      id: 'tx_5',
      userId: 'usr_std_1',
      type: 'expense',
      amount: 110000,
      category: 'Transport',
      method: 'ATTO karta',
      description: 'Metro va avtobus oylik kartasi',
      date: '2026-09-20',
      createdAt: new Date('2026-09-20T08:15:00Z').toISOString()
    },
    {
      id: 'tx_6',
      userId: 'usr_std_1',
      type: 'expense',
      amount: 180000,
      category: "Kitob va O'quv qurollari",
      method: 'Payme',
      description: 'Dasturlash va algoritmlar kitoblari xaridi',
      date: '2026-09-22',
      createdAt: new Date('2026-09-22T14:40:00Z').toISOString()
    },
    {
      id: 'tx_7',
      userId: 'usr_std_1',
      type: 'expense',
      amount: 70000,
      category: 'Aloqa va Internet',
      method: 'Click',
      description: 'Oylik mobil internet tarifi (Beeline)',
      date: '2026-09-24',
      createdAt: new Date('2026-09-24T19:00:00Z').toISOString()
    },
    {
      id: 'tx_8',
      userId: 'usr_std_1',
      type: 'expense',
      amount: 95000,
      category: "Ko'ngilochar va Dam olish",
      method: 'Naqd pul',
      description: 'Guruhdoshlar bilan kinoga borish va kofe',
      date: '2026-09-26',
      createdAt: new Date('2026-09-26T21:10:00Z').toISOString()
    },
    // Madina's transactions
    {
      id: 'tx_9',
      userId: 'usr_std_2',
      type: 'income',
      amount: 1500000,
      category: 'Repetitorlik',
      method: 'Click',
      description: 'Ingliz tili darslaridan daromad',
      date: '2026-09-18',
      createdAt: new Date('2026-09-18T10:00:00Z').toISOString()
    },
    {
      id: 'tx_10',
      userId: 'usr_std_2',
      type: 'expense',
      amount: 800000,
      category: 'Ta\'lim kurslari',
      method: 'Humo',
      description: 'IELTS mock va intensiv kurs to‘lovi',
      date: '2026-09-19',
      createdAt: new Date('2026-09-19T11:00:00Z').toISOString()
    },
    {
      id: 'tx_11',
      userId: 'usr_std_2',
      type: 'expense',
      amount: 320000,
      category: 'Oziq-ovqat',
      method: 'Payme',
      description: 'Kafeda tushliklar va yeguliklar',
      date: '2026-09-23',
      createdAt: new Date('2026-09-23T15:00:00Z').toISOString()
    },
    // Bobur's transactions (Risk example: exceeds budget)
    {
      id: 'tx_12',
      userId: 'usr_std_3',
      type: 'income',
      amount: 1100000,
      category: 'Stipendiya',
      method: 'UzCard',
      description: 'Oylik stipendiya',
      date: '2026-09-10',
      createdAt: new Date('2026-09-10T09:00:00Z').toISOString()
    },
    {
      id: 'tx_13',
      userId: 'usr_std_3',
      type: 'expense',
      amount: 850000,
      category: 'Kiyim-kechak',
      method: 'UzCard',
      description: 'Qishki kiyim va poyabzal xaridi',
      date: '2026-09-12',
      createdAt: new Date('2026-09-12T17:00:00Z').toISOString()
    },
    {
      id: 'tx_14',
      userId: 'usr_std_3',
      type: 'expense',
      amount: 450000,
      category: "Ko'ngilochar va Dam olish",
      method: 'Naqd pul',
      description: 'Tug\'ilgan kun bazmi va sovg\'a',
      date: '2026-09-25',
      createdAt: new Date('2026-09-25T20:00:00Z').toISOString()
    }
  ],
  goals: [
    {
      id: 'goal_1',
      userId: 'usr_std_1',
      title: 'Yangi Dasturlash Noutbuki (MacBook / Asus)',
      targetAmount: 8500000,
      currentAmount: 4200000,
      deadline: '2026-12-31',
      category: 'Texnika',
      icon: 'Laptop',
      color: 'blue'
    },
    {
      id: 'goal_2',
      userId: 'usr_std_1',
      title: 'IELTS topshirish badali',
      targetAmount: 2600000,
      currentAmount: 2600000, // completed!
      deadline: '2026-10-25',
      category: 'Ta\'lim',
      icon: 'GraduationCap',
      color: 'emerald'
    },
    {
      id: 'goal_3',
      userId: 'usr_std_1',
      title: 'Samarqand & Buxoro sayohati',
      targetAmount: 1500000,
      currentAmount: 450000,
      deadline: '2026-11-15',
      category: 'Sayohat',
      icon: 'Compass',
      color: 'purple'
    }
  ],
  requests: [
    {
      id: 'req_1',
      userId: 'usr_std_1',
      userName: 'Jasur Karimov',
      institution: 'TATU',
      title: 'Respublika IT Hakatonida ishtirok etish uchun yo‘l xarajati',
      amount: 650000,
      category: 'Konferensiya / Hakaton',
      reason: 'Samarqand shahrida bo‘ladigan 3 kunlik respublika talabalar hakatonida TATU nomidan jamoaviy ishtirok etish uchun poezd va yotoqxona xarajatlari.',
      status: 'approved',
      reviewedBy: 'Nodira Salimova',
      managerNote: 'Ajoyib tashabbus! Universitet iqtidorli talabalar jamg‘armasidan to‘liq qoplab beriladi.',
      createdAt: new Date('2026-09-18T10:30:00Z').toISOString()
    },
    {
      id: 'req_2',
      userId: 'usr_std_3',
      userName: 'Bobur Mirzayev',
      institution: 'TDIU',
      title: 'Xalqaro moliyaviy tahlil sertifikati imtihoni uchun moddiy yordam',
      amount: 900000,
      category: 'Sertifikat',
      reason: 'ACCA Foundation darajasidagi rasmiy imtihon ro‘yxatdan o‘tish to‘lovi uchun 50% kompensatsiya so‘rayman.',
      status: 'pending',
      reviewedBy: null,
      managerNote: '',
      createdAt: new Date('2026-09-28T14:15:00Z').toISOString()
    }
  ],
  categories: [
    { id: 'cat_1', name: 'Oziq-ovqat', type: 'expense', icon: 'Utensils', color: '#f59e0b' },
    { id: 'cat_2', name: 'Ijara / Yotoqxona', type: 'expense', icon: 'Home', color: '#6366f1' },
    { id: 'cat_3', name: 'Transport', type: 'expense', icon: 'Bus', color: '#06b6d4' },
    { id: 'cat_4', name: "Kitob va O'quv qurollari", type: 'expense', icon: 'BookOpen', color: '#10b981' },
    { id: 'cat_5', name: "Ta'lim kurslari", type: 'expense', icon: 'GraduationCap', color: '#8b5cf6' },
    { id: 'cat_6', name: 'Kiyim-kechak', type: 'expense', icon: 'Shirt', color: '#ec4899' },
    { id: 'cat_7', name: 'Aloqa va Internet', type: 'expense', icon: 'Wifi', color: '#3b82f6' },
    { id: 'cat_8', name: "Ko'ngilochar va Dam olish", type: 'expense', icon: 'Smile', color: '#f97316' },
    { id: 'cat_9', name: 'Salomatlik / Dori-darmon', type: 'expense', icon: 'HeartPulse', color: '#ef4444' },
    { id: 'cat_10', name: 'Boshqa xarajatlar', type: 'expense', icon: 'MoreHorizontal', color: '#64748b' },
    { id: 'cat_11', name: 'Stipendiya', type: 'income', icon: 'Award', color: '#10b981' },
    { id: 'cat_12', name: "Ota-onadan jo'natma", type: 'income', icon: 'Users', color: '#3b82f6' },
    { id: 'cat_13', name: 'Ish / Freelance', type: 'income', icon: 'Briefcase', color: '#8b5cf6' },
    { id: 'cat_14', name: 'Boshqa daromad', type: 'income', icon: 'PlusCircle', color: '#14b8a6' }
  ],
  announcements: [
    {
      id: 'ann_1',
      title: 'Oktabr oyi uchun talabalar moliyaviy grant arizalari qabul qilinmoqda',
      content: 'Hurmatli talabalar! Universitet tomonidan ehtiyojmand va iqtidorli talabalarga bir martalik 1,500,000 so‘mgacha rag‘batlantirish ajratiladi. Arizangizni "So‘rovlar" bo‘limidan yuborishingiz mumkin.',
      author: 'Menejer: Nodira Salimova',
      date: '2026-09-25',
      badge: 'Muhim'
    },
    {
      id: 'ann_2',
      title: 'Talabalar uchun tejamkorlik va shaxsiy byudjet maslahatlari',
      content: 'Oylik xarajatlaringizni rejalashtirishda 50/30/20 qoidasiga amal qiling: 50% zaruriy ehtiyojlar (ovqat, ijara), 30% xohishlar, 20% esa jamg‘arma uchun!',
      author: 'Kassa Tizim Ma\'muriyati',
      date: '2026-09-28',
      badge: 'Maslahat'
    }
  ]
};

// Database helper
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json, returning initialData:', err);
    return initialData;
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Authentication Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Avtorizatsiyadan o\'tilmagan (Token topilmadi)' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const db = readDB();
    const user = db.users.find(u => u.id === decoded.id);
    if (!user || user.status === 'blocked') {
      return res.status(403).json({ success: false, message: 'Foydalanuvchi hisobi faol emas yoki bloklangan' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token yaroqsiz yoki muddati o\'tgan' });
  }
}

// Role Middleware
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Ruxsat berilmagan. Talab etilgan rol: ${roles.join(' yoki ')}` 
      });
    }
    next();
  };
}

// ======================== AUTH ROUTES ========================

// Register
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, phone, institution, faculty, role = 'student', monthlyBudget = 1500000 } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Ism, email va parol kiritilishi shart' });
    }

    const db = readDB();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: 'Bu email bilan allaqachon ro\'yxatdan o\'tilgan' });
    }

    const validRole = ['student', 'manager', 'admin'].includes(role) ? role : 'student';

    const colors = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-indigo-600',
      'from-emerald-500 to-teal-600',
      'from-pink-500 to-rose-600',
      'from-amber-500 to-orange-600'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: bcrypt.hashSync(password, 10),
      role: validRole,
      phone: phone || '',
      institution: institution || 'Oliy Ta\'lim Muassasasi',
      faculty: faculty || '1-kurs',
      status: 'active',
      monthlyBudget: Number(monthlyBudget) || 1500000,
      avatarColor: randomColor,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDB(db);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userSafe } = newUser;
    return res.status(201).json({
      success: true,
      message: 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz!',
      token,
      user: userSafe
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: 'Serverda xatolik yuz berdi' });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email va parolni kiriting' });
    }

    const db = readDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) {
      return res.status(400).json({ success: false, message: 'Email yoki parol noto‘g‘ri' });
    }

    if (user.status === 'blocked') {
      return res.status(403).json({ success: false, message: 'Sizning hisobingiz bloklangan. Administratorga murojaat qiling.' });
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Email yoki parol noto‘g‘ri' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userSafe } = user;
    return res.json({
      success: true,
      message: 'Xush kelibsiz!',
      token,
      user: userSafe
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Serverda xatolik yuz berdi' });
  }
});

// Get current user profile
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const { passwordHash, ...userSafe } = req.user;
  res.json({ success: true, user: userSafe });
});

// Update profile / budget
app.put('/api/auth/profile', authMiddleware, (req, res) => {
  try {
    const db = readDB();
    const idx = db.users.findIndex(u => u.id === req.user.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Foydalanuvchi topilmadi' });
    }

    const { name, phone, institution, faculty, monthlyBudget } = req.body;
    if (name) db.users[idx].name = name.trim();
    if (phone !== undefined) db.users[idx].phone = phone;
    if (institution !== undefined) db.users[idx].institution = institution;
    if (faculty !== undefined) db.users[idx].faculty = faculty;
    if (monthlyBudget !== undefined) db.users[idx].monthlyBudget = Number(monthlyBudget);

    writeDB(db);
    const { passwordHash, ...userSafe } = db.users[idx];
    return res.json({ success: true, message: 'Profil muvaffaqiyatli yangilandi', user: userSafe });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// ======================== TRANSACTIONS (EXPENSES & INCOMES) ========================

// Get user transactions (or all if admin/manager viewing a student)
app.get('/api/transactions', authMiddleware, (req, res) => {
  try {
    const db = readDB();
    const { userId, type, category, startDate, endDate } = req.query;

    let targetUserId = req.user.id;
    // Admins and managers can view other users' transactions
    if (userId && (req.user.role === 'admin' || req.user.role === 'manager')) {
      targetUserId = userId;
    }

    let list = db.transactions.filter(t => t.userId === targetUserId);

    if (type) {
      list = list.filter(t => t.type === type);
    }
    if (category) {
      list = list.filter(t => t.category.toLowerCase() === category.toLowerCase());
    }
    if (startDate) {
      list = list.filter(t => t.date >= startDate);
    }
    if (endDate) {
      list = list.filter(t => t.date <= endDate);
    }

    // Sort newest first
    list.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate summary statistics
    const totalIncome = list.filter(t => t.type === 'income').reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = list.filter(t => t.type === 'expense').reduce((acc, cur) => acc + cur.amount, 0);
    const balance = totalIncome - totalExpense;

    return res.json({
      success: true,
      data: list,
      summary: {
        totalIncome,
        totalExpense,
        balance,
        monthlyBudget: req.user.monthlyBudget || 1500000
      }
    });
  } catch (error) {
    console.error('Transactions get error:', error);
    return res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// Create transaction
app.post('/api/transactions', authMiddleware, (req, res) => {
  try {
    const { type, amount, category, method, description, date } = req.body;

    if (!type || !amount || !category) {
      return res.status(400).json({ success: false, message: 'Turi, summa va toifa kiritilishi shart' });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Summa musbat son bo\'lishi shart' });
    }

    const db = readDB();
    const newTx = {
      id: 'tx_' + Date.now(),
      userId: req.user.id,
      type: type === 'income' ? 'income' : 'expense',
      amount: numAmount,
      category: category.trim(),
      method: method || 'Karta',
      description: description ? description.trim() : '',
      date: date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    db.transactions.unshift(newTx);
    writeDB(db);

    return res.status(201).json({
      success: true,
      message: type === 'income' ? 'Daromad muvaffaqiyatli qo\'shildi' : 'Xarajat muvaffaqiyatli qayd etildi',
      data: newTx
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// Delete transaction
app.delete('/api/transactions/:id', authMiddleware, (req, res) => {
  try {
    const db = readDB();
    const idx = db.transactions.findIndex(t => t.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Amaliyot topilmadi' });
    }

    // Only owner or admin can delete
    if (db.transactions[idx].userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'O\'chirishga ruxsat berilmagan' });
    }

    db.transactions.splice(idx, 1);
    writeDB(db);
    return res.json({ success: true, message: 'Amaliyot o\'chirildi' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// ======================== SAVINGS GOALS ========================

// Get user goals
app.get('/api/goals', authMiddleware, (req, res) => {
  const db = readDB();
  const goals = db.goals.filter(g => g.userId === req.user.id);
  res.json({ success: true, data: goals });
});

// Create goal
app.post('/api/goals', authMiddleware, (req, res) => {
  try {
    const { title, targetAmount, currentAmount = 0, deadline, category, color } = req.body;
    if (!title || !targetAmount) {
      return res.status(400).json({ success: false, message: 'Maqsad nomi va kutilayotgan summa kiritilishi shart' });
    }

    const db = readDB();
    const newGoal = {
      id: 'goal_' + Date.now(),
      userId: req.user.id,
      title: title.trim(),
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount) || 0,
      deadline: deadline || '',
      category: category || 'Umumiy',
      color: color || 'blue'
    };

    db.goals.push(newGoal);
    writeDB(db);
    res.status(201).json({ success: true, message: 'Yangi moliyaviy maqsad qo\'shildi!', data: newGoal });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// Add deposit to goal
app.put('/api/goals/:id/deposit', authMiddleware, (req, res) => {
  try {
    const { amount } = req.body;
    const addAmt = Number(amount);
    if (isNaN(addAmt) || addAmt <= 0) {
      return res.status(400).json({ success: false, message: 'Mablag\' summasi musbat bo\'lishi kerak' });
    }

    const db = readDB();
    const goal = db.goals.find(g => g.id === req.params.id && g.userId === req.user.id);
    if (!goal) {
      return res.status(404).json({ success: false, message: 'Maqsad topilmadi' });
    }

    goal.currentAmount += addAmt;
    writeDB(db);
    res.json({ success: true, message: 'Mablag\' muvaffaqiyatli qo\'shildi!', data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// Delete goal
app.delete('/api/goals/:id', authMiddleware, (req, res) => {
  const db = readDB();
  const idx = db.goals.findIndex(g => g.id === req.params.id && g.userId === req.user.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Maqsad topilmadi' });
  }
  db.goals.splice(idx, 1);
  writeDB(db);
  res.json({ success: true, message: 'Maqsad o\'chirildi' });
});

// ======================== REQUESTS (FINANCIAL AID / APPROVALS) ========================

// Get requests
app.get('/api/requests', authMiddleware, (req, res) => {
  const db = readDB();
  if (req.user.role === 'admin' || req.user.role === 'manager') {
    // Managers & admins see all requests
    return res.json({ success: true, data: db.requests });
  }
  // Students see only their own requests
  const myRequests = db.requests.filter(r => r.userId === req.user.id);
  return res.json({ success: true, data: myRequests });
});

// Student creates a new request
app.post('/api/requests', authMiddleware, (req, res) => {
  try {
    const { title, amount, category, reason } = req.body;
    if (!title || !amount || !reason) {
      return res.status(400).json({ success: false, message: 'Ariza nomi, summa va asos kiritilishi shart' });
    }

    const db = readDB();
    const newReq = {
      id: 'req_' + Date.now(),
      userId: req.user.id,
      userName: req.user.name,
      institution: req.user.institution || 'Ta\'lim muassasasi',
      title: title.trim(),
      amount: Number(amount),
      category: category || 'Moddiy yordam',
      reason: reason.trim(),
      status: 'pending',
      reviewedBy: null,
      managerNote: '',
      createdAt: new Date().toISOString()
    };

    db.requests.unshift(newReq);
    writeDB(db);
    return res.status(201).json({ success: true, message: 'So\'rovingiz mas\'ul menejerga yuborildi', data: newReq });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// Manager/Admin approves or rejects a request
app.put('/api/requests/:id/status', authMiddleware, requireRole('admin', 'manager'), (req, res) => {
  try {
    const { status, managerNote } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Holat faqat "approved" yoki "rejected" bo\'lishi mumkin' });
    }

    const db = readDB();
    const reqItem = db.requests.find(r => r.id === req.params.id);
    if (!reqItem) {
      return res.status(404).json({ success: false, message: 'So\'rov topilmadi' });
    }

    reqItem.status = status;
    reqItem.reviewedBy = req.user.name;
    reqItem.managerNote = managerNote ? managerNote.trim() : '';

    // If approved, optionally record an income for the student automatically!
    if (status === 'approved') {
      db.transactions.unshift({
        id: 'tx_req_' + Date.now(),
        userId: reqItem.userId,
        type: 'income',
        amount: reqItem.amount,
        category: 'Moddiy rag‘bat / Grant',
        method: 'Universitet / Menejer ajratmasi',
        description: `Ariza tasdiqlandi: ${reqItem.title}`,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      });
    }

    writeDB(db);
    return res.json({ success: true, message: `So\'rov ${status === 'approved' ? 'tasdiqlandi' : 'rad etildi'}`, data: reqItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// ======================== MANAGER ROUTES ========================

// Get all students overview (for manager view)
app.get('/api/manager/students', authMiddleware, requireRole('admin', 'manager'), (req, res) => {
  try {
    const db = readDB();
    const students = db.users.filter(u => u.role === 'student');

    const studentsOverview = students.map(student => {
      const studentTx = db.transactions.filter(t => t.userId === student.id);
      const totalExpense = studentTx.filter(t => t.type === 'expense').reduce((acc, c) => acc + c.amount, 0);
      const totalIncome = studentTx.filter(t => t.type === 'income').reduce((acc, c) => acc + c.amount, 0);
      const balance = totalIncome - totalExpense;
      const budget = student.monthlyBudget || 1500000;
      const budgetUsedPercent = Math.round((totalExpense / budget) * 100);

      // Warning level
      let riskStatus = 'normal';
      if (budgetUsedPercent >= 100) riskStatus = 'danger'; // Over budget
      else if (budgetUsedPercent >= 80) riskStatus = 'warning'; // Close to budget limit

      const { passwordHash, ...safeStudent } = student;
      return {
        ...safeStudent,
        totalIncome,
        totalExpense,
        balance,
        budget,
        budgetUsedPercent,
        riskStatus,
        transactionCount: studentTx.length
      };
    });

    return res.json({ success: true, data: studentsOverview });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// ======================== ADMIN ROUTES ========================

// Admin - Users list & management
app.get('/api/admin/users', authMiddleware, requireRole('admin'), (req, res) => {
  const db = readDB();
  const safeUsers = db.users.map(({ passwordHash, ...u }) => u);
  res.json({ success: true, data: safeUsers });
});

// Admin - Change user role or status
app.put('/api/admin/users/:id', authMiddleware, requireRole('admin'), (req, res) => {
  try {
    const { role, status, monthlyBudget } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Foydalanuvchi topilmadi' });
    }

    if (role && ['student', 'manager', 'admin'].includes(role)) {
      user.role = role;
    }
    if (status && ['active', 'blocked'].includes(status)) {
      user.status = status;
    }
    if (monthlyBudget !== undefined) {
      user.monthlyBudget = Number(monthlyBudget);
    }

    writeDB(db);
    const { passwordHash, ...safeUser } = user;
    res.json({ success: true, message: 'Foydalanuvchi yangilandi', data: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// Admin - Delete user
app.delete('/api/admin/users/:id', authMiddleware, requireRole('admin'), (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({ success: false, message: 'O\'zingizning hisobingizni o\'chira olmaysiz' });
    }

    const db = readDB();
    const idx = db.users.findIndex(u => u.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Foydalanuvchi topilmadi' });
    }

    db.users.splice(idx, 1);
    // Also remove user transactions & goals
    db.transactions = db.transactions.filter(t => t.userId !== req.params.id);
    db.goals = db.goals.filter(g => g.userId !== req.params.id);
    db.requests = db.requests.filter(r => r.userId !== req.params.id);

    writeDB(db);
    res.json({ success: true, message: 'Foydalanuvchi tizimdan o\'chirildi' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// Admin - Global statistics
app.get('/api/admin/stats', authMiddleware, requireRole('admin'), (req, res) => {
  try {
    const db = readDB();
    const totalUsers = db.users.length;
    const studentsCount = db.users.filter(u => u.role === 'student').length;
    const managersCount = db.users.filter(u => u.role === 'manager').length;
    const adminsCount = db.users.filter(u => u.role === 'admin').length;

    const totalTransactions = db.transactions.length;
    const totalSystemExpense = db.transactions.filter(t => t.type === 'expense').reduce((a, c) => a + c.amount, 0);
    const totalSystemIncome = db.transactions.filter(t => t.type === 'income').reduce((a, c) => a + c.amount, 0);
    const pendingRequestsCount = db.requests.filter(r => r.status === 'pending').length;

    // Category breakdown across entire system
    const categoryStats = {};
    db.transactions.filter(t => t.type === 'expense').forEach(t => {
      categoryStats[t.category] = (categoryStats[t.category] || 0) + t.amount;
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        studentsCount,
        managersCount,
        adminsCount,
        totalTransactions,
        totalSystemExpense,
        totalSystemIncome,
        pendingRequestsCount,
        categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server xatosi' });
  }
});

// ======================== CATEGORIES & ANNOUNCEMENTS ========================

// Get categories
app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.categories || [] });
});

// Get announcements
app.get('/api/announcements', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.announcements || [] });
});

// Create announcement (admin / manager)
app.post('/api/announcements', authMiddleware, requireRole('admin', 'manager'), (req, res) => {
  const { title, content, badge = 'E\'lon' } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Sarlavha va matn kiritilishi shart' });
  }

  const db = readDB();
  const newAnn = {
    id: 'ann_' + Date.now(),
    title: title.trim(),
    content: content.trim(),
    author: `${req.user.role === 'admin' ? 'Admin' : 'Menejer'}: ${req.user.name}`,
    date: new Date().toISOString().split('T')[0],
    badge
  };

  db.announcements.unshift(newAnn);
  writeDB(db);
  res.status(201).json({ success: true, message: 'E\'lon e\'lon qilindi', data: newAnn });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`TalabaKassa Backend API server running on http://localhost:${PORT}`);
});

// Keep Node.js process alive for Node 26 event loop
setInterval(() => {}, 1000 * 60 * 60);
