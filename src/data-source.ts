import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/models/*.ts"],
      }
    : {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        synchronize: false,
        logging: true,
        entities:
          process.env.NODE_ENV === "production"
            ? ["dist/entities/*.js"]
            : ["src/entities/*.ts"],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["dist/migrations/*.js"]
            : ["src/migrations/*.ts"],
      }
);
