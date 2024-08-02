import express from "express";
const app = express();
import { z } from "zod";
import bodyParser from "body-parser";
import cors from "cors";

const port = 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "*" }));

const postBodySchema = z.object({
  data: z.array(z.union([z.string(), z.number()])),
});

app.get("/bfhl", (req, res) => {
  return res.json({
    operation_code: 1,
  });
});

app.post("/bfhl", (req, res) => {
  let data;
  try {
    console.log(req.body);
    data = postBodySchema.parse(req.body).data;
  } catch (err) {
    console.log(err);
    return res.json({
      is_success: false,
    });
  }

  const alphabets = data.filter((item) => {
    return typeof item === "string" && /^[a-zA-Z]+$/.test(item);
  });

  const numbers = data.filter((item) => {
    return Number.isInteger(Number(item));
  });

  const highestAlphabet = alphabets.sort()[alphabets.length - 1];

  res.json({
    is_success: true,
    user_id: "anuraj_jain_07112001",
    roll_number: "RA2111003010701",
    email: "aj0435@srmist.edu.in",
    alphabets,
    numbers,
    highestAlphabet,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
