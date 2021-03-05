import express from 'express';
import * as db from './database';

console.log("Hello! Starting...")

const app = express();

app.get("/", (_, res) => res.send("Hello!"));
app.listen(3000);