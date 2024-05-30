import { defineConfig } from "drizzle-kit"
export default defineConfig({
    dialect: "sqlite", // "postgresql" | "mysql"
    schema:"src/db/schema/*.ts",
    //schema:["src/db/schema/location.ts","src/db/schema/locationSeats.ts"],
    out:"drizzle/migrations",
    //driver: "turso" // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
    driver: "d1-http",
    dbCredentials: {
      accountId: "76fe948fd688d85d4d14cd91ddc9af85",
      databaseId: "a764415c-b626-47b3-aad6-962d66dc230f",
      token: "nQ2idAQVrBuygQTiF85bDiztotE57DGi5orSvJ3I",
    }
})