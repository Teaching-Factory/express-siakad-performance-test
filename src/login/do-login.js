import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "3m", target: 300 },
    { duration: "3m", target: 300 },
    { duration: "3m", target: 0 },
  ],
};

// import env
const env = JSON.parse(open("./../../.env"));

export default function () {
  const loginPayload = JSON.stringify({
    username: "2313201000062",
    password: "23122001",
  });

  const loginHeaders = { "Content-Type": "application/json" };

  http.post(`${env.BASE_URL}:${env.PORT}/auth/do-login`, loginPayload, { headers: loginHeaders });
  sleep(1);
}
