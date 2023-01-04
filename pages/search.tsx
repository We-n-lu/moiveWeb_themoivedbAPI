import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ImageList from "../components/ImageList";
import NavBarComp from "../components/NavBarComp";
import Paginations from "../components/Pagination";
import { AppContextInterface, useStateContext } from "./_app";

interface searchProps {}

const Search: React.FC<searchProps> = ({}) => {
  const { data, search, setData, request,setPageCount, pageCount } =
    useStateContext() as AppContextInterface;


  useEffect(() => {
      request("/search/movie", search as string, );
  }, []);

  let body = null;
  if (!data) {
    body = <div>loading..</div>;
  } else {
    body = (
      <>
        <Box sx={{ display: "flex", marginX: "10%" }}>
          <Box sx={{ flexGrow: 3 }} />
          {data && (
            <Paginations
            apiPath="/search/movie"
              search={search as string}
              request={request}
              count={Math.round((pageCount as number) / 4)}
            />
          )}
        </Box>
        <div style={{ backgroundColor: "lightgray", paddingTop: "25px" }}>
          <ImageList data={data} />
        </div>
      </>
    );
  }

  return (
    <>
      <NavBarComp />

      <div>{body}</div>
    </>
  );
};

export default Search;
