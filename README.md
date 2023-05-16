# ChatGPT Plugin Template with Supabase Edge Runtime

Template for building ChatGPT Plugins in TypeScript that run on [Supabase Edge Runtime](https://supabase.com/blog/edge-runtime-self-hosted-deno-functions).

For a full walk through, read the blog post: [Building ChatGPT Plugins with Supabase Edge Runtime](https://supabase.com/blog/building-chatgpt-plugins-template). 

Or watch the video tutorial:

[![video tutorial](https://img.youtube.com/vi/4pa-eEXQHJQ/0.jpg)](https://www.youtube.com/watch?v=4pa-eEXQHJQ)

Note: This is a TypeScript port of OpenAI's official ["[...] simple todo list plugin with no auth" Python example](https://platform.openai.com/docs/plugins/examples).

## Generate OpenAPI spec

The [`chatgpt-plugin` function](./functions/chatgpt-plugin/index.ts) contains `@openapi` [JSDoc](https://jsdoc.app/) annotations which are used for `swagger-jsdoc` to generate the [`openapi.json` file](./functions/chatgpt-plugin/openapi.json)

```bash
deno run --allow-read --allow-write scripts/generate-openapi-spec.ts
```

## Run locally

- Build and start the container: `docker compose up --build`
- Visit
  - http://localhost:8000/chatgpt-plugin
  - http://localhost:8000/.well-known/ai-plugin.json
  - http://localhost:8000/chatgpt-plugin/openapi.json
  - http://localhost:8000/chatgpt-plugin/todos/user

File changes in the `/functions` directory will automatically be detected, except for the `/main/index.ts` function as it is a long running server.

## Deploy to Fly.io

- Clone this repository.
- Change `http://localhost:8000` to your Fly domain in the [`/main/ai-plugins.json` file](./functions/main/ai-plugins.json)
- Open `fly.toml` and update the app name and optionally the region etc.
- In your terminal, run `fly apps create` and specify the app name you just set in your `fly.toml` file.
- Finally, run `fly deploy`.

## Install the Plugin in the [ChatGPT UI](https://chat.openai.com/)

1. Select the plugin model from the top drop down, then select “Plugins”, “Plugin Store”, and finally “Install an unverified plugin” or “Develop your own plugin”.
2. Either enter `localhost:8000` or your Fly domain and click "Find manifest file"
