# Projekte veröffenlichen

## Frontend (React + Vite + TypeScript) veröffenlichen

### Umgebungsvariablen

**Lokale Entwicklung**

- **_`client/.env.local`_** für lolake Tests

  ```tsx
   VITE_API_URL=http://localhost:5000

  ```

- **_`client/.env.production`_** für Vercel-Deployment

  ```tsx
   VITE_API_URL=https://dein-backend.onrender.com/api


  ```

### Projekt builden

- Erzeuge den **_Produktions-Build_** des Projekts mit:

  ```tsx
    npm run build

  ```

  Dies erstellt einen `dist`-Ordner

- Als publish Vezeichnis:

  ```tsx
  dist;
  ```

## Backend (Express + Typescript + mongoose) veröffenlichen

### Umgebungsvariablen

- **.env**

  ```tsx
  PORT=5000
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname

  ```

### Deployment vorbereiten

1. Kompiliere deinen Typscript-Code mit:
   ```tsx
   tsc;
   ```
2. Erstelle dein `dist`-Ordner mit:
   ```bsh
      npm run build
   ```
3. Start Command:
   ```bsh
    node dist/index.js
   ```

## Frontend und Backend verbinden

### Frontend

1. **_Backend url_** im Frontend verwenden.

   ```tsx
   VITE_API_URL=https://dein-backend.onrender.com/api

   ```

2. Beim fetchen folgenden Code verwenden

   ```tsx
   const response = await fetch(`${import.meta.env.VITE_API_URL}/api/aut/`);
   ```

### Backend

1. Cors im Backend erlauben

   ```tsx
   import cors from "cors";
   app.use(
     cors({
       origin: "https://deine-frontend-domain.vercel.app",
       credentials: true,
     })
   );
   ```

## Referenz

- [How to Deploy/Host TypeScript Node/Express JS server for FREE | Deploy Typescript Backend for FREE](https://www.youtube.com/watch?v=gBsLVilQmKk)
