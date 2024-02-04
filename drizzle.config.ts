import "@/db/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.POSTGRES_URL! + "?sslmode=require",
    },
    verbose: true,
    strict: true,
});