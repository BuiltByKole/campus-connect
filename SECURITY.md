# Security Policy for CampusConnect

## Overview

CampusConnect takes security seriously. This document outlines our security practices and how to report vulnerabilities.

## Security Features Implemented

### Authentication & Authorization

- ✅ Secure password hashing (bcryptjs with salt rounds: 10)
- ✅ JWT-based authentication with short-lived tokens (1 hour)
- ✅ Refresh tokens for extended sessions (7 days)
- ✅ Role-based access control (RBAC)
- ✅ Protected routes and API endpoints
- ✅ Backend authorization enforcement

### Rate Limiting

- ✅ Auth endpoints: 5 attempts per 15 minutes
- ✅ General API: 100 requests per minute
- ✅ Configurable per deployment

### Data Protection

- ✅ HTTPS/TLS encryption required in production
- ✅ Secure password hashing (never plaintext)
- ✅ Database permissions: row-level security
- ✅ Sensitive data: encrypted in transit
- ✅ File uploads: validated and scanned

### Input Validation

- ✅ All API inputs validated with Zod
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection (output escaping)
- ✅ CSRF protection (SameSite cookies)
- ✅ File upload restrictions

### API Security

- ✅ Helmet security headers
- ✅ CORS protection
- ✅ Content Security Policy
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff

### Secrets Management

- ✅ Never commit secrets to repository
- ✅ Use environment variables
- ✅ .env files in .gitignore
- ✅ Separate dev/staging/prod configs
- ✅ Rotate secrets regularly

## Secure Development Practices

1. **Dependencies**: Keep packages updated
   ```bash
   npm audit fix
   npm update
   ```

2. **Code Review**: All changes reviewed before merge

3. **Testing**: Security tests included in CI/CD

4. **Secrets**: Never hardcode credentials

5. **Logging**: Sensitive data not logged

## Vulnerability Reporting

**Do NOT open public GitHub issues for security vulnerabilities.**

Instead, please email: **security@campusconnect.ng**

Include:
- Description of vulnerability
- Steps to reproduce
- Impact assessment
- Suggested fix (if applicable)

We will:
1. Acknowledge receipt within 48 hours
2. Investigate and assess severity
3. Develop and test fix
4. Release patch
5. Credit reporter (if requested)

## Security Headers

Production deployment includes:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

## Third-Party Dependencies

We regularly audit dependencies:

```bash
npm audit
```

Critical vulnerabilities are patched immediately.

## Compliance

- GDPR considerations for user data
- Data retention policies
- Right to deletion
- Data export capabilities

## Security Updates

Follow our repository for security announcements:

```bash
watch: https://github.com/BuiltByKole/campus-connect
```

## Incident Response

If a security incident occurs:

1. We will patch the vulnerability
2. Issue a security advisory
3. Encourage users to update
4. Provide remediation steps

## Questions?

Email: **security@campusconnect.ng**

Thank you for helping keep CampusConnect secure!
