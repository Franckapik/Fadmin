module.exports = {
  apps: [
    {
      name: "qualyn",
      script: "npm",
      args: "start",
      watch: true,
      watch_delay: 15000,
    },
    {
      name: "qualyn-build",
      script: "npm",
      args: "run build",
      watch: ["./public"],
      autorestart: false,
    },
  ],
};
