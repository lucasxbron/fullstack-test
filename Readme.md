# Fullstack-Projekt veröffentlichen

- **_Frontend_**
  - Render(Static)
  - Vercel(Static)
  - Netlify(Static)
- **_Backend_**
  - Render(Web Service)
  - Firebase

Die Bereitstellung einer Typescript-, Vite-, Express- und MongoDB-Anwendung erfordert eine sorgfältige Vorbereitung und Konfiguration.

## Projektstruktur

```bash
  project-loggin/
├── client/   # React + Vite + TypeScript + Tailwind CSS
└── backend/  # Express + TypeScript + MongoDB + Mongoose

//#### Man kann auch in verschiedene Repositories auslagern
  project-frontend-loggin/
├── client/   # React + Vite + TypeScript + Tailwind CSS

  project-backend-loggin/
├── backend/   # Express + TypeScript + MongoDB + Mongoose


```

## Frontend (React + Vite + TypeScript)

### Umgebungsvariablen

> Stelle sicher, dass deine Umgebungsvariablen korrekt gesetzt sind.

#### Lokale Entwicklung

Alle Variablen, die im Frontend verfügbar sein sollen, müssen mit `VITE_` (Vite) oder REACT*APP* (CRA) beginnen.
**Beispiel**

- **_`client/.env.local`_** für lolake Entwicklung

  ```tsx
   VITE_API_URL=http://localhost:5000        # Vite
   REACT_APP_API_URL=http://localhost:5000   # Create React App
   API_URL=http://10.0.2.2:5000              # native React

  ```

- **_`client/.env.production`_** bzw. `.env`

  ```tsx
   VITE_API_URL=https://dein-backend.onrender.com/       # Vite
   REACT_APP_API_URL=https://mein-backend.onrender.com   # Create React App
   API_URL=https://mein-backend.onrender.com.            # React Native

  ```

**Verwendung**

```ts
import Config from "react-native-config";

const apiUrl = import.meta.env.VITE_API_URL; // Vite
const apiUrl = process.env.REACT_APP_API_URL; // Create React App
const apiURl = Config.API_URL;
```

### 1. Projekt erstellen

- Führe den folgenden Befehl im client-Verzeichnis aus:

  ```bash
    npm run build  # Diese Befehl erstellt einen `dist`-Ordner zum deployen
  ```

### 2. Auf Vercel deployen

1. **_Gehe_** zu vercel.com

2. **_Neues Projekt erstellen_** > Repository auswählen

3. **_Als Root Directory:_** client

4. **_Build Command:_** npm run build

5. **_Output Directory:_** dist

6. **_Environment Variables_** unter „Settings“ hinzufügen:

   - `VITE_API_URL=https://<DEIN-BACKEND>.onrender.com/api`

## Backend (Express + Typescript + mongoose) deployen

### Umgebungsvariablen

Erstelle im Backend-Ordner eine `.env`-Datei mit folgendem Inhalt:

- Bereite deine Zugansdaten von:

  - **_MongoDb/MySQL_** : `mongodb+srv://<your_accounT-name>:<db_password>@cluster0.ibsxpes.mongodb.net/`
  - **_Clounary_**
  - **_Resend_**
  - u.a

- Prüfe deine **.env**-Datei

  ```env
  PORT=5000
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
  PORT=5000
  JWT_SECRET=fr+mlwWf8V2OQ9Z1EKUOXU9WOKNb3anFNch6YVopcr+k6jn/xcWVVKtf4EPd7Gkg+1roFeK6rq3unsBJ+HRlw==
  FRONTEND_URL=http:localhost:5173

  ```

### MongoDB Netzwerkeinstellungen

- **_Erlaube IP-Zugriff von überall:_**

  - Gehe zu MongoDB Atlas > Network Access

  - Erlaube IP-Adresse 0.0.0.0/0

![Ip](./assesst/change_ip_mongoDB.png)

### `package.json` anpassen

```json
   "scripts": {
    "build": "tsc ",
    "start": "node ./dist/index.js",
    "dev": "ts-node-dev --respawn src/index.ts"
},
```

- `--respawn`:
  Dieser Zusatz sorgt dafür, dass der Prozess automatisch neu gestartet wird, wenn es intern notwendig ist (z. B. bei bestimmten Änderungen oder Fehlern).

### `req.cookie()` ändern beim Login

```ts
res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 1000 * 60 * 60 * 24, // 1 d
});
```

- `httpOnly: true`: Das Cookie kann nicht von JavaScript im Browser gelesen werden → Schutz vor XSS-Angriffen.
- `sameSite: "none"`: Cookie wird auch bei Cross-Origin-Anfragen (Frontend ≠ Backend) gesendet.
- `secure: true`: Cookie wird nur über HTTPS übertragen – notwendig mit sameSite: "none"

### `index.ts` aktualisieren

```ts
const allowedOrigins = [
  //Hier kommen alle Möglichen Frontend-APIs
];
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Nicht erlaubte Origin: " + origin));
      }
    },
    credentials: true,
  })
);
```

### Typescript kompilieren

- Führen im Backend-Ordner aus:

  1. Kompiliere deinen Typscript-Code mit:

  ```bash
  tsc
  ```

  2. Erstelle dein `dist`-Ordner mit:

  ```bash
      npm run build
  ```

### Auf Render deployen

![Create a New Web Service](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F40616yes9g8h2y1vkwwk.png)
![Configure Build and Start Commands](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fx18i8piwjsaiv8wzsw5h.png)

- **_Root Directory:_** backend (Je nach Projekt)

## Referenz

- [How to Deploy/Host TypeScript Node/Express JS server for FREE | Deploy Typescript Backend for FREE](https://www.youtube.com/watch?v=gBsLVilQmKk)
