import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 100 },
    { duration: "1m", target: 100 },
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

// declare token
const authToken = `${env.TOKEN}`;

export default function () {
  const apiHeaders = {
    Authorization: `${authToken}`,
  };

  const res = http.get(`${env.BASE_URL}:${env.PORT}/rekap-transkrip-nilai/get-rekap-transkrip-nilai-by-mahasiswa`, { headers: apiHeaders });
  check(res, {
    "status was 200": (r) => r.status === 200,
  });
  sleep(1);
}
