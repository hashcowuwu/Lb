import figlet from "figlet";
import express from "express";

const server = Bun.serve({
  development: true, //开发者模式
  port: 3000,
  static: {
    //静态路由
    "/bun": new Response(Bun.version),
    "/api/health-check": new Response("All good!"),
  },
  fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      const body = figlet.textSync("Bun!");
      console.log("server:");
      console.log(server);
      return new Response(body);
    }
    if (url.pathname === "/ip") {
      const ip = server.requestIP(req);
      console.log(ip);
      return new Response(`Your IP is ${ip?.address}`);
    }
    return new Response("404!");
  },
});

// Bun v1.1.27+ required

console.log(`Listening on http://localhost:${server.port} ...`);
console.log(Bun.version);
