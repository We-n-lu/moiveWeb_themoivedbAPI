import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ImageList from "../components/ImageList";
import NavBarComp from "../components/NavBarComp";
import Paginations from "../components/Pagination";
import { useStateContext, AppContextInterface } from "./_app";

interface tvshowProps {}

const Tvshow: React.FC<tvshowProps> = ({}) => {
  const { request, data, apiPath, setData, setApiPath, pageCount } =
    useStateContext() as AppContextInterface;

  useEffect(() => {
    request("/tv/popular")

  }, []);
  return (
    <div>
      <NavBarComp />
      <div style={{ backgroundColor: "lightgray", paddingTop: "25px" }}>
        <Box sx={{ display: "flex", marginX: "10%" }}>
          <Box sx={{ flexGrow: 3 }} />
          {data && (
            <Paginations
              apiPath={apiPath}
              request={request}
              count={Math.round((pageCount as number) / 50)}
            />
          )}
        </Box>
        {data && <ImageList data={data} />}
      </div>
    </div>
  );
};

export default Tvshow;
