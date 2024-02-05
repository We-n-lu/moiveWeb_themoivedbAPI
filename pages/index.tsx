import {
  Grid,
  Stack,
  Box,
  Button,
  Tabs,
  Tab,
  Card,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavBarComp from "../components/NavBarComp";
import { AppContextInterface, moive, useStateContext } from "./_app";
import image from "next/image";
import Recommend from "../components/Recommend";
import { recommendTool } from "../utils/recommendTool";
import NextLink from "next/link";

interface IndexProps {
  
}

const Index: React.FC<IndexProps> = ({}) => {
  const router = useRouter();

  const { request, data, indexMovie, indexTV } =
    useStateContext() as AppContextInterface;
  useEffect(() => {
    request("/movie/now_playing");
    request("/tv/popular");
  }, []);
  // console.log("index outeffect moive", indexMovie);
  const baseUrl = "http://image.tmdb.org/t/p/";
  const size = { "0": "w300", "1": "w780", "2": "w1280", "3": "original" };
  const [im, setIm] = useState<number[] | null>(null);
  useEffect(() => {
    if (indexMovie) {
      setIm(recommendTool(indexMovie));
    }
  }, [indexMovie]);
  return (
    <>
      <NavBarComp />
      <div>
        <Grid
          container
          spacing={6}
          columns={{xs:2, md: 8, lg: 12 }}
          sx={{ width: "auto", marginX: "10%", marginTop: "15px" }}
        >
          <Grid
            item
            xs={0}
            md={0}
            lg={3}
            sx={{ display: { xs:'none',md: "none", lg: "block" } }}
          >
            Recommend
            {im && <Recommend id={im.slice(0, 2)} />}
          </Grid>

          <Grid item xs={2} md={8} lg={9} sx={{}}>
            <Stack spacing={2}>
              <div>
                <Box sx={{ display: "flex" }}>
                  <label>Latest Moive</label>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button onClick={() => router.push("/movie")}>
                    More {`>>`}
                  </Button>
                </Box>
                <Box
                  sx={{
                    // backgroundColor: "lightgray",
                    alignItems: "center",
                  }}
                >
                  <Tabs
                    // value={value}
                    value={false}
                    // onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    {indexMovie &&
                      indexMovie.slice(0, 10).map((s) => {
                        return (
                          <Box
                            key={s.id}
                            sx={{ whiteSpace: "normal", margin: "5px" }}
                          >
                            <NextLink
                              href="[moiv]/detail/[id]"
                              as={`movie/detail/${s.id}`}
                            >
                              <img
                                src={`${baseUrl}${size[0]}${
                                  !s.poster_path
                                    ? s.backdrop_path
                                    : s.poster_path
                                }`}
                                style={{
                                  width: 150,
                                  // height: 200,
                                  objectFit: "contain",
                                }}
                              />
                            </NextLink>

                            <Box sx={{ textAlign: "center" }}>
                              <label>
                                {s.original_title
                                  ? s.original_title
                                  : s.original_name}
                              </label>
                            </Box>
                          </Box>
                        );
                      })}
                  </Tabs>
                </Box>
              </div>
              <div>
                <Box sx={{ display: "flex" ,paddingTop:'30px'}}>
                  <label>Latest TV Show</label>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button onClick={() => router.push("/tvshow")}>
                    More {`>>`}
                  </Button>
                </Box>
                <Box
                  sx={{
                    // backgroundColor: "lightgray",
                    // height: "200px",
                    marginTop: "15px",
                    alignItems: "center",
                  }}
                >
                  <Tabs
                    // value={value}
                    value={false}
                    // onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    {/* <img
                      style={{ width: 150, height: 150, objectFit: "contain" }}
                      src="https://australianchildrenspoetry.files.wordpress.com/2020/01/cat.png"
                    /> */}
                    {indexTV &&
                      indexTV.slice(0, 10).map((s) => {
                        return (
                          <Box
                            key={s.id}
                            sx={{ whiteSpace: "normal", margin: "5px" }}
                          ><NextLink
                          href="[moiv]/detail/[id]"
                          as={`tv/detail/${s.id}`}
                        >
                            <img
                              src={`${baseUrl}${size[0]}${
                                !s.poster_path ? s.backdrop_path : s.poster_path
                              }`}
                              style={{
                                width: 150,
                                // height: 200,
                                objectFit: "contain",
                              }}
                            /></NextLink>
                            <Box sx={{ textAlign: "center" }}>
                              <label>
                                {s.original_title
                                  ? s.original_title
                                  : s.original_name}
                              </label>
                            </Box>
                          </Box>
                        );
                      })}
                    {/* <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                    <Tab label="Item Four" />
                    <Tab label="Item Five" />
                    <Tab label="Item Six" />
                    <Tab label="Item Seven" /> */}
                  </Tabs>
                </Box>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Index;
