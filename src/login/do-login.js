import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 300 },
    { duration: "1m", target: 300 },
    { duration: "2m", target: 0 },
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

  const res = http.post(`${env.BASE_URL}:${env.PORT}/auth/do-login`, loginPayload, { headers: loginHeaders });
  check(res, {
    "status was 200": (r) => r.status === 200,
  });
  sleep(1);
}
