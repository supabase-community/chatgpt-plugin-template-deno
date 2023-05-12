import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";
import openapi from "./openapi.json" assert { type: "json" };

console.log("Hello from `chatgpt-plugin` Function!");

const _TODOS: { [key: string]: Array<string> } = {
  user: ["Build your own ChatGPT Plugin!"],
  thor: [
    "edit the video",
    "release the repository",
    "write a blogpost",
    "schedule a tweet",
  ],
};

/**
 * @openapi
 * components:
 *   schemas:
 *     getTodosResponse:
 *       type: object
 *       properties:
 *         todos:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of todos.
 */

const router = new Router();
router
  .get("/chatgpt-plugin", (ctx) => {
    ctx.response.body = "Building ChatGPT plugins with Deno!";
  })
  /**
   * @openapi
   * /chatgpt-plugin/todos/{username}:
   *   get:
   *     operationId: getTodos
   *     summary: Get the list of todos
   *     parameters:
   *     - in: path
   *       name: username
   *       schema:
   *         type: string
   *       required: true
   *       description: The name of the user.
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/getTodosResponse'
   */
  .get("/chatgpt-plugin/todos/:username", (ctx) => {
    const username = ctx.params.username.toLowerCase();
    ctx.response.body = _TODOS[username] ?? [];
  })
  .get("/chatgpt-plugin/openapi.json", (ctx) => {
    ctx.response.body = JSON.stringify(openapi);
    ctx.response.headers.set("Content-Type", "application/json");
  });

const app = new Application();
// ChatGPT specific CORS headers
app.use(async (ctx, next) => {
  await next();
  let key: keyof typeof corsHeaders;
  for (key in corsHeaders) {
    ctx.response.headers.set(key, corsHeaders[key]);
  }
});
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
