import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 1280 },
    { duration: "1m", target: 1280 },
    { duration: "2m", target: 0 },
  ],

  // stages: [
  //   { duration: "1m", target: 50 },
  //   { duration: "2m", target: 100 },
  //   { duration: "1m", target: 150 },
  //   { duration: "2m", target: 200 },
  //   { duration: "1m", target: 0 },
  // ],
};

// import env
const env = JSON.parse(open("./../../.env"));

export default function () {
  const loginPayload = JSON.stringify({
    username: `${env.USERNAME}`,
    password: `${env.PASSWORD}`,
  });

  const loginHeaders = { "Content-Type": "application/json" };

  const res = http.post(`${env.BASE_URL}:${env.PORT}/auth/do-login`, loginPayload, { headers: loginHeaders });
  check(res, {
    "status was 200": (r) => r.status === 200,
  });
  sleep(1);
}
