import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import API from "../../../components/API";
import NavBarComp from "../../../components/NavBarComp";
import { shareLink } from "../../../utils/ShareLink";
import { AppContextInterface, useStateContext } from "../../_app";
import Tooltip from "@mui/material/Tooltip";

interface DetailProps {}
const Detail: React.FC<DetailProps> = () => {
  const router = useRouter();
  const [detai, setDetai] = useState<any>(null);
  const { login, collect, setLogin, user, setCollect, collectChange } =
    useStateContext() as AppContextInterface;
  const movie_id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const tv = router.asPath.includes("tv") ? "/tv" : "/movie";
  const [likecolor, setLikecolor] = useState(false);
  const clas = router.asPath.includes("tv") ? "tv" : "movie";
  useEffect(() => {
    collect.map((s) => {
      if (s.item.id === movie_id) {
        setLikecolor(true);
      }
    });
    const reques = async () => {
      const res = await API.get(
        `${tv}/${movie_id}?api_key=${process.env.API_KEY}`
      ).catch(function (error) {
        console.log("Error", error.message);
      });
      if (res === undefined) return;
      setDetai(res.data);
    };
    reques();
  }, [movie_id]);
  const baseUrl = "http://image.tmdb.org/t/p/";
  const size = { "0": "w300", "1": "w780", "2": "w1280", "3": "original" };

  const removeId = (id: number) => {
    setCollect(collect.filter((s) => s.item.id !== id));
  };

  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavBarComp />
      <div
        style={{
          backgroundColor: "lightgray",
          paddingTop: "5px",
          height: "100vh",
        }}
      >
        <Button onClick={() => router.back()}>
          <ArrowBackIcon />
          back
        </Button>
        {detai && (
          <Box
            sx={{
              display: "flex",
              backgroundColor: "white",
              padding: "10px",
              marginX: "10%",
            }}
          >
            <img
              style={{ padding: "10px" }}
              src={`${baseUrl}${size[0]}${
                !detai.poster_path ? detai.backdrop_path : detai.poster_path
              }`}
            />
            <Box
              sx={{ padding: "10px", display: "flex",fontFamily: "sans-serif", flexDirection: "column" }}
            >
              <label
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  
                  paddingBottom: "20px",
                }}
              >
                {detai.title}
              </label>

              <div style={{ display: "flex", paddingBottom: "10px" }}>
                <label style={{ marginRight: "10px", color: "gray" }}>
                  Genre:
                </label>

                {detai.genres.map((s: any, index: any) => (
                  <div key={index} style={{ marginRight: "4px" }}>
                    {s.name}
                  </div>
                ))}
              </div>
              <div style={{ paddingBottom: "10px" }}>
                <label style={{ marginRight: "10px",  color: "gray" }}>
                  Overview:
                </label>
                {detai.overview}
              </div>
              <div style={{ paddingBottom: "10px" }}>
                <label style={{ marginRight: "10px", color: "gray" }}>
                  Release Date:
                </label>
                {detai.release_date}
              </div>
              <div>
                <IconButton
                  aria-label="add to favorites"
                  sx={{ color: `${likecolor ? "red" : ""} ` }}
                  onClick={(e) => {
                    e.preventDefault;
                    if (login) {
                      setLikecolor(!likecolor);
                      if (!likecolor) {
                        collectChange({
                          time: new Date().toLocaleString(),
                          item: { title: detai.title, id: detai.id },
                        });
                      } else {
                        removeId(detai.id);
                      }
                    } else {
                      setTimeout(() => {
                        alert("sign in first");
                        router.push("/signIn");
                      }, 500);
                    }
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={() => {
                    const value = shareLink({
                      clas: clas,
                      idnumb: detai.id,
                      title: detai.title as string,
                    });
                    navigator.clipboard.writeText(value);
                  }}
                >
                  <Tooltip
                    onClose={handleTooltipClose}
                    title="Link copied! Paste to share!!"
                    open={open}
                  >
                    <ShareIcon />
                  </Tooltip>
                </IconButton>
              </div>
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};
export default Detail;
