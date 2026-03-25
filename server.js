import http from "node:http";
import { getDestinationsFromDB } from "./db.js";
import { sendJSONResponse } from "./utils/sendJSONResponse.js";
import { filterData } from "./utils/filterData.js";
import { getQueryParams } from "./utils/getQueryParams.js";
import { queryObjects } from "node:v8";

const PORT = 3000;
const server = http.createServer(async (req, res) => {

  res.setHeader("content-type", "application/json");
  const destinations = await getDestinationsFromDB();
  

  try {
    if (req.method === "GET" && urlObj.pathname === "/api") {
      const queryObjects = getQueryParams(req);
      let filtered =  queryObjects ? filterData(destinations, queryObjects) : destinations;
      sendJSONResponse(res, 200, filtered);
      
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
