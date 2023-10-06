import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    { duration: "2m", target: 200 },

    // Stay at rest on 5 VUs for 10s
    { duration: "2m30s", target: 300 },

    // Ramp-down from 5 to 0 VUs for 5s
    { duration: "30s", target: 0 },
  ],
};

export default function () {
  const response = http.get(
    "https://kmapi.kims-rmuti.com/api/get/visualize/map?academic=&academic_service=2&academic_service_u2t=&year=2564",
    {
      headers: {
        Accepts: "application/json",
        "X-Access-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImlhdCI6MTY4MjQwOTczMywiZXhwIjoxNzEzOTY3MzMzfQ.UqWnkj90e6-Th3yn3uSvz1Ar2Sb54tLz_M2cd-0flak",
      },
    }
  );
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(0.3);
}
