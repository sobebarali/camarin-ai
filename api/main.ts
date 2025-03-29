import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { basicAuth } from '@hono/hono/basic-auth'
import data from "./data.json" with { type: "json" };
import mongoose from "npm:mongoose";
const app = new Hono();

await mongoose.connect("mongodb://localhost:27017");

// Check to see connection status.
console.log(mongoose.connection.readyState);

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 600,
  }),
);

app.get("/", (c) => {
  return c.text("Welcome to the dinosaur API!");
});

app.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)

app.get("/api/dinosaurs", (c) => {
  return c.json(data);
});

app.get("/api/dinosaurs/:dinosaur", (c) => {
  if (!c.req.param("dinosaur")) {
    return c.text("No dinosaur name provided.");
  }

  const dinosaur = data.find((item) =>
    item.name.toLowerCase() === c.req.param("dinosaur").toLowerCase()
  );

  if (dinosaur) {
    return c.json(dinosaur);
  } else {
    return c.notFound();
  }
});

Deno.serve(app.fetch);
