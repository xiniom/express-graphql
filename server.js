import express from "express";  
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers.js"
import { data } from "./data.js"

const app = express(); 
const port = 4000;
const schema = readFileSync("./schema.gql", "utf-8");
const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    "/graphql",
    graphqlHTTP({
        schema: executableSchema,
        context: data,
        graphiql: true,
    })
)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});