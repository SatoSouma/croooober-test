import fetch from "node-fetch";
import { subtractionTime } from "./subtractionTime.js";
import dotenv from "dotenv";

dotenv.config();

export function runAccess(result) {
  // 呼び出し予定時刻を日本時間に変換
  let timeOut = subtractionTime(result.actives_at, result.called_at);

  //settimeoutでミリ秒差で呼び出す。
  setTimeout(function () {
    fetch(`${process.env.API_URL}`, {
      method: "PUT",
      headers: { "X-Challenge-Id": result.id },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.total_diff < 500) {
          console.log("continue");
          runAccess(json);
        } else {
          console.log("success");
        }
      });
  }, timeOut);
}
