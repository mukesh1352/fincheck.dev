Here is a **clean, modern, professional, production-quality README.md** designed for GitHub.
It reads smoothly, is well-structured, visually appealing, and suitable for academic submission, company documentation, or open-source release.

You can **copy/paste this entire README.md**.

---

# 📘 **Fincheck.dev – Real-Time AI Monitoring + Financial Tracking Platform**

Fincheck.dev is a modern full-stack platform combining:

✔ Real-time GPU/CPU/RAM/Latency monitoring
✔ AI inference metrics collection
✔ Credentials-based authentication
✔ Image-upload microservice (FastAPI backend)
✔ Modern financial tracking UI

Built with the latest technologies:

* **Next.js 16 (App Router + Turbopack)**
* **React 19**
* **Tailwind CSS**
* **MongoDB Atlas**
* **NextAuth**
* **FastAPI**
* **pnpm**

---

## 📚 **Table of Contents**

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Prerequisites](#-prerequisites)
4. [Installation](#-installation)
5. [Environment Variables](#-environment-variables)
6. [Database Configuration](#-database-configuration)
7. [Authentication](#-authentication)
8. [API Routes](#-api-routes)
9. [FastAPI Backend](#-fastapi-backend)
10. [Running the App](#️-running-the-app)
11. [Project Structure](#-project-structure)
12. [Screenshots](#-screenshots)

---

# ⭐ **Features**

### 🔐 Secure Authentication

* NextAuth Credentials Provider
* Password hashing using `bcryptjs`
* JWT-based session handling

### 📊 Real-Time Metrics Dashboard

Powered by **Ably Realtime** + React charts:

* CPU usage %
* GPU utilization %
* GPU VRAM consumption
* RAM usage %
* Latency distribution (histograms)
* Error event tracking

### 🧠 AI Inference Monitoring

FastAPI backend feeds real-time metrics to the dashboard via WebSockets.

### 🖼 Image Upload Microservice

FastAPI handles:

* Secure uploads
* MIME validation
* File size validation
* Asynchronous streaming

---

# 🚀 **Tech Stack**

### **Frontend**

* Next.js 16 (App Router)
* React 19
* TailwindCSS
* Recharts (data visualization)
* Ably Realtime (event streaming)

### **Backend**

* Python FastAPI
* Uvicorn
* aiofiles

### **Database**

* MongoDB Atlas
* Native MongoDB Driver

### **Package Manager**

* pnpm

---

# 📦 **Prerequisites**

✔ Node.js 18+
✔ pnpm
✔ Python 3.10+
✔ MongoDB Atlas Cluster

---

# 🔧 **Installation**

```bash
git clone <repo-url>
cd fincheck.dev
pnpm install
```

---

# 🔑 **Environment Variables**

Create `.env`:

```env
# MONGODB
MONGODB_URI="your-mongodb-uri"
MONGODB_DB="finalyear"

# NEXTAUTH
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"

# ABLY
NEXT_PUBLIC_ABLY_API_KEY="your-ably-client-key"
NEXT_PUBLIC_ABLY_CHANNEL="metrics-stream"
```

Generate secret:

```bash
openssl rand -base64 32
```

---

# 🗄 **Database Configuration (MongoDB)**

`lib/mongodb.ts` uses connection reuse **optimized for Next.js App Router**.

```ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
declare global { var _mongoClientPromise: Promise<MongoClient> | undefined; }

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;
export default clientPromise;
```

---

# 🔐 **Authentication (NextAuth)**

Authentication is handled through:

```
/api/auth/[...nextauth]
```

### Login logic:

```ts
const user = await db.collection("users").findOne({ username });
const isValid = await bcrypt.compare(password, user.password);
```

---

# 📝 **Signup Route**

```
POST /api/signup
```

```ts
const exists = await users.findOne({ username });
const hash = await bcrypt.hash(password, 10);
await users.insertOne({ username, password: hash, createdAt: new Date() });
```

---

# 🔌 **API Routes**

| Route                     | Method  | Description                   |
| ------------------------- | ------- | ----------------------------- |
| `/api/auth/[...nextauth]` | POST    | Login, JWT, sessions          |
| `/api/signup`             | POST    | Register user                 |
| `/api/metrics`            | GET     | MongoDB metrics for dashboard |
| `/metrics-stream` (Ably)  | Pub/Sub | Real-time updates             |

---

# ⚡ **FastAPI Backend**

The backend powers image uploads and can be extended for inference metrics.

`backend/main.py` includes:

* MIME validation
* Size validation (max 5MB)
* Async streaming with aiofiles
* Dynamic filenames
* `/health` and `/upload-image` endpoints

---

## ▶️ **Running the Backend**

Run directly **from project root**:

```
python -m backend.main
```

Runs at:

* [http://127.0.0.1:8000](http://127.0.0.1:8000)
* [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) (Swagger UI)

---

# ▶️ **Running the App**

Start Next.js:

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

# 📁 **Project Structure**

'''
fincheck.dev on  dashboard [!?] ❯  tree -I venv
.
├── CONTRIBUTING.md
├── Makefile
├── README.md
├── app
│   ├── SessionWrapper.tsx
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth]
│   │   │       └── route.ts
│   │   ├── metrics
│   │   │   └── route.ts
│   │   └── signup
│   │       └── route.ts
│   ├── components
│   │   ├── AuthCard.tsx
│   │   ├── DetailsForm.tsx
│   │   ├── FileUpload.tsx
│   │   ├── Header.tsx
│   │   ├── HeaderSignOut.tsx
│   │   ├── IntroCard.tsx
│   │   └── metrics
│   │       ├── ChartWrapper.tsx
│   │       ├── CpuChart.tsx
│   │       ├── GpuChart.tsx
│   │       ├── GpuVramChart.tsx
│   │       ├── LatencyHistogram.tsx
│   │       ├── LatencyLive.tsx
│   │       ├── RamChart.tsx
│   │       └── TimeSeriesChart.tsx
│   ├── dashboard
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── intro
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── lib
│   │   └── useRealtime.tsx
│   ├── main
│   │   └── page.tsx
│   ├── page.tsx
│   ├── sign-in
│   │   └── page.tsx
│   └── sign-up
│       └── page.tsx
├── backend
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-312.pyc
│   │   └── main.cpython-312.pyc
│   ├── benchmarking
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-312.pyc
│   │   │   ├── ably_publisher.cpython-312.pyc
│   │   │   ├── inference_metrics.cpython-312.pyc
│   │   │   ├── metrics_manager.cpython-312.pyc
│   │   │   ├── model_analysis.cpython-312.pyc
│   │   │   ├── mongo_client.cpython-312.pyc
│   │   │   ├── prediction_quality.cpython-312.pyc
│   │   │   ├── store_metrics.cpython-312.pyc
│   │   │   └── system_metrics.cpython-312.pyc
│   │   ├── ably_publisher.py
│   │   ├── inference_metrics.py
│   │   ├── metrics_manager.py
│   │   ├── model_analysis.py
│   │   ├── mongo_client.py
│   │   ├── prediction_quality.py
│   │   ├── results
│   │   │   ├── 0e5e8a9a-dc91-4450-8e94-664d56c14cac_metrics.json
│   │   │   ├── 46f7edbe-f64a-4062-9415-7d755f4cb449_metrics.json
│   │   │   ├── 86e2c357-600f-471e-8be5-52fa7aad34a6_metrics.json
│   │   │   ├── d67ffae9-acea-407d-9c85-76596b7a0010_metrics.json
│   │   │   ├── e5a48aec-1aca-4676-a298-f3c0d09d6352_metrics.json
│   │   │   └── fc79132e-74c9-48ba-b75a-deff69d0c05d_metrics.json
│   │   ├── store_metrics.py
│   │   └── system_metrics.py
│   ├── main.py
│   ├── models
│   │   └── model_best.pth
│   ├── msgqueue
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-312.pyc
│   │   │   ├── connection.cpython-312.pyc
│   │   │   ├── model_registry.cpython-312.pyc
│   │   │   ├── worker1.cpython-312.pyc
│   │   │   └── worker_models.cpython-312.pyc
│   │   ├── connection.py
│   │   ├── model_registry.py
│   │   ├── worker1.py
│   │   └── worker_models.py
│   ├── requirements.txt
│   ├── test_prediction_quality.py
│   └── uploads
│       ├── 05440704-212d-4559-a83b-08f58e001c63.jpeg
│       ├── 0b3f269d-94c7-442d-926d-f1097acbb3a6.png
│       ├── 0e0367d5-08de-4898-8b6d-4d60c10fb375.jpg
│       ├── 14eac5a0-e9cb-423e-b16e-444a2965e24f.png
│       ├── 16064ba2-0b35-41a4-a6e3-5e7a331c4c49.jpg
│       ├── 2ecc3213-13ef-4d70-ac2b-076e3103b3d6.jpeg
│       ├── 2feaee6b-32bf-4a16-842f-9b600be7b076.jpg
│       ├── 398e7416-1390-4c41-b4b1-8f1cee662251.jpeg
│       ├── 3a53cf67-7787-41a5-a011-a39e1a4331a6.png
│       ├── 456748be-9120-4cdb-9574-4dbbedcb1b6c.jpg
│       ├── 4780f278-41f9-468a-be77-38673adca5df.jpeg
│       ├── 63d62051-ce41-45a6-82f5-b646ba7cd80d.png
│       ├── 64aed63c-c692-4b0e-9297-32dffe17a0ee.jpg
│       ├── 6f21e19e-92cb-47fe-942e-2b429a4ba31e.jpeg
│       ├── 7c8ca96c-9cd4-48b2-8437-b7c1f86f3339.jpeg
│       ├── 8d2f90d7-044b-4258-9509-41069e597f00.jpg
│       ├── 8da0e40e-8e2e-47db-8048-6b3ea23adb04.jpg
│       ├── 97fb99fd-b5fc-4227-8729-a028ac392b78.png
│       ├── a550449e-ff1c-4687-9155-9b69ed179339.jpg
│       ├── b941e54f-1681-49fb-b50c-62e4e9bcdbf9.jpeg
│       ├── d14f6d4a-6140-4bc7-baea-1642bc22171e.jpg
│       ├── d6506e80-3a47-4209-bf15-d3c1e6eb741e.png
│       └── f04ff46e-7559-4116-8725-6bf0e8c9bc70.png
├── docs
│   ├── architecture.md
│   └── week-2-todo.md
├── eslint.config.mjs
├── lib
│   ├── ably.ts
│   └── mongodb.ts
├── next-env.d.ts
├── next.config.ts
├── node_modules
│   ├── @prisma
│   │   └── client -> ../.pnpm/@prisma+client@6.19.0_prisma@6.19.0_typescript@5.9.3__typescript@5.9.3/node_modules/@prisma/client
│   ├── @radix-ui
│   │   ├── react-dialog -> ../.pnpm/@radix-ui+react-dialog@1.1.15_@types+react-dom@19.2.2_@types+react@19.2.2__@types+react_664b8f23a65f4708bb5cf27e5ff43c08/node_modules/@radix-ui/react-dialog
│   │   ├── react-dropdown-menu -> ../.pnpm/@radix-ui+react-dropdown-menu@2.1.16_@types+react-dom@19.2.2_@types+react@19.2.2__@type_f90fa60edb4ba7a2bde2c9dcd66319cb/node_modules/@radix-ui/react-dropdown-menu
│   │   └── react-popover -> ../.pnpm/@radix-ui+react-popover@1.1.15_@types+react-dom@19.2.2_@types+react@19.2.2__@types+reac_c375406ef7f19bb24de95f131d3a42e6/node_modules/@radix-ui/react-popover
│   ├── @tailwindcss
│   │   └── postcss -> ../.pnpm/@tailwindcss+postcss@4.1.16/node_modules/@tailwindcss/postcss
│   ├── @types
│   │   ├── bcrypt -> ../.pnpm/@types+bcrypt@6.0.0/node_modules/@types/bcrypt
│   │   ├── node -> ../.pnpm/@types+node@20.19.24/node_modules/@types/node
│   │   ├── pg -> ../.pnpm/@types+pg@8.15.6/node_modules/@types/pg
│   │   ├── react -> ../.pnpm/@types+react@19.2.2/node_modules/@types/react
│   │   └── react-dom -> ../.pnpm/@types+react-dom@19.2.2_@types+react@19.2.2/node_modules/@types/react-dom
│   ├── ably -> .pnpm/ably@2.15.0_bufferutil@4.0.9_react-dom@19.2.0_react@19.2.0__react@19.2.0_utf-8-validate@5.0.10/node_modules/ably
│   ├── autoprefixer -> .pnpm/autoprefixer@10.4.22_postcss@8.5.6/node_modules/autoprefixer
│   ├── axios -> .pnpm/axios@1.13.2/node_modules/axios
│   ├── baseline-browser-mapping -> .pnpm/baseline-browser-mapping@2.8.32/node_modules/baseline-browser-mapping
│   ├── bcrypt -> .pnpm/bcrypt@6.0.0/node_modules/bcrypt
│   ├── bcryptjs -> .pnpm/bcryptjs@3.0.3/node_modules/bcryptjs
│   ├── daisyui -> .pnpm/daisyui@5.5.5/node_modules/daisyui
│   ├── date-fns -> .pnpm/date-fns@4.1.0/node_modules/date-fns
│   ├── dotenv -> .pnpm/dotenv@17.2.3/node_modules/dotenv
│   ├── eslint -> .pnpm/eslint@9.39.0_jiti@2.6.1/node_modules/eslint
│   ├── eslint-config-next -> .pnpm/eslint-config-next@16.0.1_@typescript-eslint+parser@8.46.2_eslint@9.39.0_jiti@2.6.1__ty_4c468f26a08331444329567573dc9e68/node_modules/eslint-config-next
│   ├── flowbite -> .pnpm/flowbite@4.0.1/node_modules/flowbite
│   ├── flowbite-react -> .pnpm/flowbite-react@0.12.10_react-dom@19.2.0_react@19.2.0__react@19.2.0_tailwindcss@4.1.16_typescript@5.9.3/node_modules/flowbite-react
│   ├── mongodb -> .pnpm/mongodb@7.0.0/node_modules/mongodb
│   ├── next -> .pnpm/next@16.0.1_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next
│   ├── next-auth -> .pnpm/next-auth@4.24.13_next@16.0.1_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0__react@1_9557adc9f01a284325170cc4a5d242a9/node_modules/next-auth
│   ├── pg -> .pnpm/pg@8.16.3/node_modules/pg
│   ├── postcss -> .pnpm/postcss@8.5.6/node_modules/postcss
│   ├── prisma -> .pnpm/prisma@6.19.0_typescript@5.9.3/node_modules/prisma
│   ├── rate-limiter-flexible -> .pnpm/rate-limiter-flexible@8.3.0/node_modules/rate-limiter-flexible
│   ├── react -> .pnpm/react@19.2.0/node_modules/react
│   ├── react-dom -> .pnpm/react-dom@19.2.0_react@19.2.0/node_modules/react-dom
│   ├── recharts -> .pnpm/recharts@3.5.1_@types+react@19.2.2_react-dom@19.2.0_react@19.2.0__react-is@16.13.1_react@19.2.0_redux@5.0.1/node_modules/recharts
│   ├── tailwindcss -> .pnpm/tailwindcss@4.1.16/node_modules/tailwindcss
│   ├── typescript -> .pnpm/typescript@5.9.3/node_modules/typescript
│   └── websocket -> .pnpm/websocket@1.0.35/node_modules/websocket
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── types
    ├── metrics.ts
    └── next-auth.d.ts

68 directories, 110 files
fincheck.dev on  dashboard [!?] ❯  

'''