import figlet from "figlet";

const server = Bun.serve({
  port: 3000,
  fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      const body = figlet.textSync("Bun!");
      return new Response(body);
    }
    if (url.pathname === "/bun") {
      return new Response(Bun.version);
    }
    if (url.pathname === "/ip") {
      const ip = server.requestIP(req);
      return new Response(`Your IP is ${ip?.address}`);
    }
    return new Response("404!");
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
console.log(Bun.version);
