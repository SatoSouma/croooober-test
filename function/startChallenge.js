import fetch from "node-fetch";
import dotenv from "dotenv";
import { runAccess } from "./runAccess.js";

dotenv.config();

export async function startChallenge() {
  await fetch(`${process.env.API_URL}/?nickname=soma`, {
    method: "POST",
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      runAccess(json);
    });
}
