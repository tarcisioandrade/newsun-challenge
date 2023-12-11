import express from "express";
import { createLead, leadById } from "../controller/lead.controller";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/create_lead", createLead);
app.get("/lead/:id", leadById);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log("🔥 Server listener in port: " + port);
});

export default app;
