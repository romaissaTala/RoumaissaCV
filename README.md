# 🌟 Talaboulma Roumaissa — Portfolio CV

Portfolio CV personnel avec Next.js 14, TypeScript, Tailwind CSS et MongoDB.

---

## 🚀 Stack Technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS |
| Base de données | MongoDB Atlas (via Mongoose) |
| Auth | NextAuth.js (JWT) |
| Email | Nodemailer (Gmail SMTP) |
| Images | Cloudinary |
| Déploiement | Vercel |

---

## 📁 Structure du Projet

```
romaissa-cv/
├── app/
│   ├── page.tsx                    # Page principale (CV public)
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Styles globaux (thème dark + gold)
│   ├── api/
│   │   ├── cv/route.ts             # GET données CV
│   │   ├── contact/route.ts        # POST formulaire contact
│   │   ├── auth/[...nextauth]/     # Auth NextAuth
│   │   └── admin/
│   │       ├── [resource]/route.ts # CRUD générique
│   │       └── seed/route.ts       # Initialisation DB
│   └── admin/
│       ├── login/page.tsx          # Login admin
│       ├── dashboard/page.tsx      # Dashboard stats
│       ├── profile/page.tsx        # Modifier profil
│       ├── experience/page.tsx     # CRUD expériences
│       ├── education/page.tsx      # CRUD formations
│       ├── skills/page.tsx         # CRUD compétences
│       ├── projects/page.tsx       # CRUD projets
│       ├── services/page.tsx       # CRUD services
│       ├── techstack/page.tsx      # CRUD tech stack
│       └── messages/page.tsx       # Voir messages contact
├── components/
│   ├── layout/
│   │   ├── CvLayout.tsx            # Layout 2 colonnes
│   │   ├── Sidebar.tsx             # Barre latérale fixe
│   │   └── TabBar.tsx              # Navigation 4 onglets
│   ├── sections/
│   │   ├── AProposTab.tsx          # Onglet À Propos
│   │   ├── CurriculumTab.tsx       # Onglet CV
│   │   ├── ProjetsTab.tsx          # Onglet Projets
│   │   └── ContactTab.tsx          # Onglet Contact
│   └── admin/
│       └── AdminCrudPage.tsx       # Composant CRUD réutilisable
├── models/index.ts                 # Tous les schemas Mongoose
├── types/index.ts                  # Types TypeScript
├── lib/
│   ├── db.ts                       # Connexion MongoDB
│   ├── auth.ts                     # Config NextAuth
│   ├── email.ts                    # Envoi emails Nodemailer
│   └── seed.ts                     # Script de seed (optionnel)
└── middleware.ts                   # Protection routes /admin
```

---

## ⚙️ Installation Locale

### 1. Cloner le projet

```bash
git clone https://github.com/TalaboulmaRomaissa/portfolio-cv.git
cd portfolio-cv
npm install
```

### 2. Configurer les variables d'environnement

Copier `.env.local.example` vers `.env.local` et remplir :

```bash
cp .env.local.example .env.local
```

```env
# MongoDB Atlas (créer un cluster gratuit sur mongodb.com)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/romaissa-cv

# NextAuth (générer avec: openssl rand -base64 32)
NEXTAUTH_SECRET=votre-secret-tres-long
NEXTAUTH_URL=http://localhost:3000

# Admin
ADMIN_EMAIL=talaromaissa@gmail.com
ADMIN_PASSWORD=votre-mot-de-passe-admin

# Gmail SMTP (activer "App Passwords" dans votre compte Google)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=talaromaissa@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx  # App Password Gmail (16 chars)
CONTACT_TO=talaromaissa@gmail.com

# Cloudinary (optionnel, pour les images des projets)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre-cloud-name
CLOUDINARY_API_KEY=votre-api-key
CLOUDINARY_API_SECRET=votre-api-secret
```

### 3. Initialiser la base de données

Démarrer le serveur puis appeler l'endpoint de seed :

```bash
npm run dev
# Dans un autre terminal :
curl -X POST http://localhost:3000/api/admin/seed
```

Ou naviguer vers `http://localhost:3000/api/admin/seed` (POST via Postman/Insomnia).

### 4. Lancer en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

Panel admin : [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📧 Configuration Gmail SMTP

Pour envoyer les emails du formulaire de contact :

1. Aller dans votre compte Google → **Sécurité**
2. Activer la **validation en 2 étapes**
3. Chercher **"Mots de passe des applications"**
4. Créer un mot de passe pour "Autre application" → nommer "Portfolio CV"
5. Copier le code à 16 caractères dans `SMTP_PASS`

---

## ☁️ Déploiement sur Vercel

### Via GitHub (recommandé)

1. **Pousser le code sur GitHub :**
   ```bash
   git add .
   git commit -m "Initial portfolio CV"
   git push origin main
   ```

2. **Connecter à Vercel :**
   - Aller sur [vercel.com](https://vercel.com)
   - "New Project" → importer votre repo GitHub
   - Framework Preset : **Next.js** (auto-détecté)

3. **Ajouter les variables d'environnement :**
   - Dans Vercel → Settings → Environment Variables
   - Ajouter toutes les variables de `.env.local`
   - Mettre `NEXTAUTH_URL` = votre URL Vercel (ex: `https://romaissa-cv.vercel.app`)

4. **Déployer** → Vercel build automatiquement à chaque push sur `main`

5. **Initialiser la DB en production :**
   ```bash
   curl -X POST https://votre-url.vercel.app/api/admin/seed
   ```

---

## 🖼️ Ajouter votre photo

1. Créer un compte sur [cloudinary.com](https://cloudinary.com) (gratuit)
2. Uploader votre photo
3. Copier l'URL
4. Dans le panel admin → Profil → coller l'URL dans "URL Photo"

---

## 🎨 Personnalisation

### Couleurs (tailwind.config.ts)
- **Gold** : `#D4A843` → accent principal
- **Dark** : `#1A1A1A` → background
- **Card** : `#222222` → cartes/panels

### Modifier les données sans code
→ Aller sur `/admin` et modifier tout depuis le panel admin.

---

## 📱 Fonctionnalités

### CV Public (`/`)
- ✅ Sidebar fixe (photo, nom, contact, liens sociaux)
- ✅ 4 onglets : À Propos · CV · Projets · Contact
- ✅ Animations au scroll (skill bars)
- ✅ Projets avec filtres par catégorie (Mobile / IA / Web)
- ✅ Modal projet avec détails, liens GitHub, PDF, live
- ✅ Formulaire de contact → email direct

### Panel Admin (`/admin`)
- ✅ Authentification sécurisée (JWT)
- ✅ Dashboard avec statistiques
- ✅ CRUD complet : Profil, Expériences, Formations, Compétences, Projets, Services, Tech Stack
- ✅ Boîte de réception des messages contact
- ✅ Répondre directement par email depuis l'admin

---

## 🔒 Sécurité

- Routes `/admin/*` protégées par middleware NextAuth
- Mots de passe hashés avec bcrypt (12 rounds)
- Validation des inputs avec Zod
- Variables sensibles dans `.env.local` (jamais dans le code)

---

Développé avec ❤️ par **Talaboulma Roumaissa**
