import { Card, IconButton, Typography, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { AppContextInterface, useStateContext } from "../pages/_app";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { shareLink } from "../utils/ShareLink";
import Tooltip from "@mui/material/Tooltip";

interface ImageitemProps {
  title: string | undefined;
  src: string;
  id: number;
}

const Imageitem: React.FC<ImageitemProps> = ({ title, src, id }) => {
  const { login, collect, setLogin, user, setCollect, collectChange } =
    useStateContext() as AppContextInterface;
  const router = useRouter();
  const [likecolor, setLikecolor] = useState(false);
  useEffect(() => {
    if (login) {
      if (!collect) return;
      setCollect(
        JSON.parse(localStorage.getItem("collect") as string)
          ? JSON.parse(localStorage.getItem("collect") as string)
          : []
      );
      collect.map((s) => {
        if (s.item.title === title) {
          setLikecolor(true);
        }
      });
    }
  }, []);

  const removeId = (id: number) => {
    setCollect(collect.filter((s) => s.item.id !== id));
  };

  useEffect(() => {
    if (login) {
      localStorage.setItem("collect", JSON.stringify(collect));
    }
  }, [collect]);

  const clas =
    router.pathname.includes("/movie") || router.pathname.includes("/search")
      ? "movie"
      : "tv";
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  // const [value, setValue] = useState("");
  return (
    <Card sx={{ maxWidth: 250 }}>
      <NextLink
        href={{
          pathname: "[moiv]/detail/[id]",
          query:
            router.pathname.includes("/movie") ||
            router.pathname.includes("/search")
              ? "movie"
              : "tv",
        }}
        as={`${
          router.pathname.includes("/movie") ||
          router.pathname.includes("/search")
            ? "movie"
            : "tv"
        }/detail/${id}`}
      >
        <img
          src={src}
          style={{ width: 250, height: 350, objectFit: "cover" }}
        />
      </NextLink>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          gutterBottom
          variant={`${title!.length < 20 ? "h6" : "subtitle2"}`}
          component="div"
          sx={{
            height: "50px",
            lineHeight: `${title!.length < 35 ? "50px" : ""}`,
          }}
        >
          {title}
        </Typography>
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
                  item: { title: title, id: id },
                });
              } else {
                removeId(id);
              }
            } else {
              alert("sign in first");
            }
          }}
        >
          <FavoriteIcon />
        </IconButton>
          <IconButton
            aria-label="share"
            onClick={() => {
              const value = shareLink({ clas: clas, idnumb: id, title: title as string })
              navigator.clipboard.writeText(value)
              setOpen(!open);
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
      </Box>
    </Card>
  );
};

export default Imageitem;
