import swaggerJsdoc from "npm:swagger-jsdoc@6.2.8";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "TODO Plugin",
      description: `A plugin that allows the user to create and manage a TODO list using ChatGPT. If you do not know the user's username, ask them first before making queries to the plugin. Otherwise, use the username "global".`,
      version: "1.0.0",
    },
  },
  apis: ["./functions/chatgpt-plugin/index.ts"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
const openapiString = JSON.stringify(openapiSpecification, null, 2);
const encoder = new TextEncoder();
const data = encoder.encode(openapiString);
await Deno.writeFile("./functions/chatgpt-plugin/openapi.json", data);
console.log(openapiString);
