module.exports = {
  apps: [
    {
      name: "Service A",
      script: "./server.js",
      instances: "max",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        SERVICE_B_PATH: '<ip>:8080'
      }
    }
  ]
};
