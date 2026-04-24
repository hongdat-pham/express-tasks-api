const PORT = process.env.PORT;
const APP_NAME = process.env.APP_NAME;
const NODE_ENV = process.env.NODE_ENV;

if (!PORT) throw new Error(`PORT is required`);
if (!NODE_ENV) throw new Error(`NODE_ENV is required`);

export default {
  port: Number(PORT),
  nodeEnv: NODE_ENV,
  appName: APP_NAME,
  isDevelopment: NODE_ENV === "development",
};
