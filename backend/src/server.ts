import { createApp } from "./app";

const app = createApp();
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});