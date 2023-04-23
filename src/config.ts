export default {
  auth: {
    github: {
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    },
    secret: process.env.AUTH_SECRET ?? "",
    trustHosts: process.env.AUTH_TRUST_HOST ?? true,
  },
  database: {
    host: process.env.DATABASE_HOST ?? "localhost",
    database: process.env.DATABASE ?? "demo",
    user: process.env.DATABASE_USER ?? "postgres",
    password: process.env.DATABASE_PASSWORD ?? "password",
    port: parseInt(process.env.DATABASE_PORT ?? "5432", 10),
  },
  url: process.env.AUTH_URL ?? "http://localhost:3000",
  port: process.env.PORT ?? 3000,
}
