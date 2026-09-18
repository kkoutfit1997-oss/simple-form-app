import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Submission: a
    .model({
      field1: a.string().required(),
      field2: a.string().required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["create"]),
      allow.authenticated().to(["read", "delete"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
