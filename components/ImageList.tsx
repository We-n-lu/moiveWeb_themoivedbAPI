import { Grid } from "@mui/material";
import React from "react";
import { moive } from "../pages/_app";
import Imageitem from "./Imageitem";


interface ImageListProps {
  data: moive[];
}

const ImageList: React.FC<ImageListProps> = ({ data }) => {
  const baseUrl = "http://image.tmdb.org/t/p/";
  const size = { "0": "w300", "1": "w780", "2": "w1280", "3": "original" };
  return (
    <Grid
      spacing={2}
      sx={{
        justifyContent: "center",
        flexWrap: "wrap",
        display: "flex",
        backgroundColor: "white",
        marginX: "10%",
        borderRadius: "5px",
      }}
    >
      {data.map((s) => {
        const img_path = (
          !s.poster_path ? s.backdrop_path : s.poster_path
        ) as string;
        if (!img_path) return;
        return (
          <Grid item key={s.id} sx={{ p: 2 }}>
            
              <Imageitem
                src={`${baseUrl}${size[0]}${img_path}`}
                title={s.original_title ? s.original_title : s.original_name}
                id={s.id as number}
              />
          
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ImageList;
