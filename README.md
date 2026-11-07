# GDGC VNRVJIET

**Google Developer Groups on Campus** - VNR Vignana Jyothi Institute of Engineering and Technology

A full-stack web application for managing GDGC VNRVJIET events, registrations, blogs, and campus activities.


## Local Dev

Run the Node/Express backend against your own local MongoDB with seeded test data — no production credentials needed.

### 1. Start a local MongoDB (pick one) — gives you `localhost:27017`

```bash
# A — Docker
docker run -d -p 27017:27017 --name gdgc-mongo mongo

# B — macOS (Homebrew)
brew tap mongodb/brew && brew install mongodb-community && brew services start mongodb-community

# C — Windows
# Install "MongoDB Community Server" from mongodb.com/try/download/community
# Keep "Install as a Service" checked so it auto-starts on localhost:27017
```

### 2. Configure `server_node/.env`

```
dbUrl=mongodb://localhost:27017
PVT_KEY=dev-local-secret-change-me
```

### 3. Install deps and seed the database

```bash
cd server_node && npm install && npm run seed
cd ../client && npm install
```


### 4. Start both servers (separate terminals)

```bash
cd server_node && npm start   # terminal 1 — API on port 4000
cd client && npm start        # terminal 2 — app on port 3000
```


### Seeded logins

Run `npm run seed`

| Role   | Email              | Password   |
| ------ | ------------------ | ---------- |
| Admin  | admin@test.local   | admin123   |
| Jury   | jury@test.local    | jury123    |
| Member | user@test.local    | user123    |


## Contact

Email: gdsc.vnrvjiet@gmail.com

