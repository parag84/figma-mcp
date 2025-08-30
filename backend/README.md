# Apply Backend (NestJS)

- Port: 3002 (prefix `/apply`)
- Tech: NestJS, TypeORM (SQLite), Scheduler

Endpoints
- POST `/apply/request`
- GET `/apply/status/:id`
- POST `/apply/rollback/:id`

Run
```
npm install
npm run start:dev
```

Health checks
```
curl -s http://localhost:3002/apply/health | jq . || curl -s http://localhost:3002/apply/health
```

Testing
```
npm test
```

Security & Monitoring
- Helmet enabled with basic CSP in `src/main.ts`.
- Global interceptors: logging, correlation, PII redaction, audit logging.
- Prometheus-style metrics at `/metrics` (stub).
- TLS: configure reverse proxy (e.g., Nginx) or Nest HTTPS options for production.










