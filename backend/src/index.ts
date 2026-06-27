import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "hello world" });
});

serve({ fetch: app.fetch, port: 3010 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`);
});
