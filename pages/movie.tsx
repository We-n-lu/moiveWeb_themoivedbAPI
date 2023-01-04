import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import ImageList from "../components/ImageList";
import NavBarComp from "../components/NavBarComp";
import Paginations from "../components/Pagination";
import { AppContextInterface, useStateContext } from "./_app";

interface MovieProps {}
const Movie: React.FC<MovieProps> = ({}) => {
  const { request, data, apiPath, setData, setApiPath, pageCount } =
    useStateContext() as AppContextInterface;
  useEffect(() => {
    request("/movie/now_playing");
  }, []);
  const [value, setValue] = useState("0");

  const body = (
    <>
      <Tabs
        value={value}
        textColor="inherit"
        onChange={(e: any, newvalue) => setValue(newvalue)}
        centered
      >
        <Tab
          value="0"
          label="Now Playing"
          onClick={(e) => {
            e.preventDefault;
            request("/movie/now_playing");
          }}
          sx={{ backgroundColor: `${value === "0" ? "lightgray" : ""}` }}
        />
        <Tab
          value="1"
          label="Upcoming"
          onClick={(e) => {
            e.preventDefault;
            request("/movie/upcoming");
          }}
          sx={{ backgroundColor: `${value === "1" ? "lightgray" : ""}` }}
        />
        <Tab
          value="2"
          label="Top Rated"
          onClick={(e) => {
            e.preventDefault;
            request("/movie/top_rated");
          }}
          sx={{ backgroundColor: `${value === "2" ? "lightgray" : ""}` }}
        />
      </Tabs>

      <div style={{ backgroundColor: "lightgray", paddingTop: "5px" }}>
        <Box sx={{ display: "flex", marginX: "10%" }}>
          <Box sx={{ flexGrow: 3 }} />
          {data && (
            <Paginations
              apiPath={apiPath}
              request={request}
              count={Math.round((pageCount as number) / 4)}
            />
          )}
        </Box>
        {data && <ImageList data={data} />}
      </div>
    </>
  );
  // const config = async () => {
  //   const res = await API.get(`/configuration?api_key=${process.env.API_KEY}`);
  //   console.log(res);
  // };

  return (
    <>
      <NavBarComp />
      <div>{body}</div>
    </>
  );
};
export default Movie;
