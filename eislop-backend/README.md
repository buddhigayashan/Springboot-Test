# EISLOP Backend

Spring Boot 3.x backend for the Enterprise Intelligent Supply Chain & Logistics Orchestration Platform (EISLOP).

## Tech Stack
- Java 17
- Spring Boot 3
- Spring Web, Data JPA, Security
- Oracle Database (XE)
- JWT Authentication
- ModelMapper, Lombok

## Quick Start
1. **Configure Oracle credentials** in `src/main/resources/application.properties`.
2. **Build & run**
   ```bash
   ./mvnw spring-boot:run
   ```
3. **Test auth**
   ```bash
   curl -X POST http://localhost:8080/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Admin","email":"admin@eislop.com","password":"Admin@123","roles":["ADMIN"]}'

   curl -X POST http://localhost:8080/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@eislop.com","password":"Admin@123"}'
   ```
4. Use the JWT returned from login in the `Authorization: Bearer <token>` header for protected endpoints.

## Project Structure
```
com.eislop
 ├─ config          # General configuration (CORS, ModelMapper)
 ├─ controller      # REST controllers
 ├─ dto             # Request/response DTOs
 ├─ entity          # JPA entities
 ├─ exception       # Custom exceptions & handlers
 ├─ repository      # Spring Data repositories
 ├─ security        # JWT utilities & filters
 ├─ service         # Service interfaces & implementations
 └─ util            # Helper utilities
```

## Environment Variables
- `app.jwt.secret` — Secret key for signing JWTs
- `app.jwt.expiration-ms` — Token expiration window in milliseconds

## Testing
Run tests using
```bash
./mvnw test
```
