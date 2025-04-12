import dotenv from "dotenv";

dotenv.config();

// Define an interface for MongoDB configuration
interface IMongoDBConfig {
  url: string;
}

// Define an interface for authentication configuration
interface IAuthConfig {
  mongodb: IMongoDBConfig;
}

// Define an interface for the overall configuration
interface IConfig {
  prod: boolean;
  localDev: boolean;
  port: number | string;
  production: boolean;
  auth: IAuthConfig;
}

// Create the configuration object with proper types
const config: IConfig = {
  prod: process.env.PROD === "true",
  localDev: process.env.LOCALDEV === "true",
  port: process.env.PORT || 3000,
  production: process.env.PROD === "true",

  auth: {
    mongodb: {
      url: process.env.DB_HOST || "mongodb://localhost:27017/todo-app",
    },
  },
};

export default config;