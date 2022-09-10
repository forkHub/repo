import express from "express";

const app: express.Express = express();
const port: number = 3000;

app.get('/', (_req, res) => res.json({ message: 'Hello World!' }))

app.listen(port, () => console.log(`This is the beginning of the Node File Upload App`))