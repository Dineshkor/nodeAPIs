import http from "node:http";
import { getDestinationsFromDB } from "./db.js";
import { sendJSONResponse } from "./utils/sendJSONResponse.js";
import { filterData } from "./utils/filterData.js";

const PORT = 3000;
const server = http.createServer(async (req, res) => {
  res.setHeader("content-type", "application/json");
  const params = req.url.split("/").filter((param) => param !== "");
  const destinations = await getDestinationsFromDB();
  try {
    if (
      req.method === "GET" &&
      params[0] === "api" &&
      params[1] === "destinations"
    ) {
      const continent = params[2];

      if (!continent) {
        sendJSONResponse(res, 200, destinations);
      } else {
        const filtered = filterData(destinations, "continent", continent);

        if (filtered.length > 0) {
          sendJSONResponse(res, 200, filtered);
        } else {
          sendJSONResponse(res, 404, {
            error: "not found",
            message: `no destinations found for ${continent}`,
          });
        }
      }
    } else if (req.url.startsWith("/api/country") && req.method === "GET") {
      const country = req.url
        .split("/")
        .filter((param) => param !== "")
        .pop();
      if (country) {
        const filtered = filterData(destinations, "country", country);
        if (filtered.length > 0) {
          sendJSONResponse(res, 200, filtered);
        } else {
          sendJSONResponse(res, 404, {
            error: "not found",
            message: `no country with the name ${country} found in the database`,
          });
        }
      } else {
        sendJSONResponse(res, 404, {
          error: "not found",
          message: "the requested route does not exist",
        });
      }
    } else {
      sendJSONResponse(res, 404, {
        error: "not found",
        message: "the requested route does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    sendJSONResponse(res, 500, { error: "internal server error" });
  }
});

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
