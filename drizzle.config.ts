import { defineConfig } from "drizzle-kit"
export default defineConfig({
    dialect: "sqlite", // "postgresql" | "mysql"
    schema:"src/db/schema",
    out:"drizzle/migrations",
    //driver: "turso" // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
    driver: "d1-http",
    dbCredentials: {
      accountId: "98fd56329ddf9334c5f354663d88036f",
      databaseId: "5f40ee56-69dd-4dbf-b7b5-b240710da610",
      token: "m0_kreZmiEk5r83UbGWUHRqu1Woy0paLzekPAqf2",
    }
})