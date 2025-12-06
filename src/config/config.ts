
/* eslint-disable no-restricted-syntax */
export default () => ({
  port: parseInt(process.env.PORT || '3008', 10) || 3008,

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    accessSecreteKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_S3_BUCKET
  },

  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },

  geminiKey:{
    apiKey: process.env.GEMINI_API_KEY
  },

})