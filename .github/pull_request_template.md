## Summary

Describe the change, motivation, and approach.

## Checklist

- [ ] Types: strict TS, no `any`, explicit exports
- [ ] React: no unnecessary re-renders; hooks deps exhaustive; no inline styles or aria gaps
- [ ] NestJS: DTOs + ValidationPipe; guards for auth/RBAC; no logic in controllers
- [ ] Security: secrets not logged; auth headers handled; PII redaction intact
- [ ] Observability: correlation-id propagated; structured logs; metrics updated
- [ ] Microfrontends: boundaries respected; only `shared/` for cross-app code
- [ ] Tenant-aware: `tenantId` propagated in MCP/API where applicable
- [ ] Tests: updated/added where needed

## Screenshots / Notes

Optional screenshots, logs, or notes.


