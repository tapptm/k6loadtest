import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    { duration: "30s", target: 50 },

    // Stay at rest on 5 VUs for 10s
    { duration: "40s", target: 60 },

    // Ramp-down from 5 to 0 VUs for 5s
    { duration: "20s", target: 20 },
  ],
};

export default function () {
  const response = http.get("http://localhost:5566");
  check(response, { "status is 404": (r) => r.status === 404 });
  sleep(0.3);
}
