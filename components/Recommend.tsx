import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AppContextInterface, useStateContext } from "../pages/_app";
import API from "./API";
import Bodd from "./RecomList";

interface RecommendProps {
  id: number[];
}

const Recommend: React.FC<RecommendProps> = ({ id }) => {
  const {
    request,
    indexRecommend,
    setRecommendDada,
    recommendData,
    collect,
    recommmendChange,
  } = useStateContext() as AppContextInterface;
  // console.log("id", id);
  let da: any[] = [];
  const [sd, setSd] = useState<any>([]);
  const dacurrent = useRef(da);
  const curr = useRef(sd);
  const [numb, setNumb] = useState(1);

  let c: any[] = [];
  const [gh, setGh] = useState<any[]>([]);

  useEffect(() => {
    const res = async (s: number) =>
      await API.get(
        `movie/${s}/recommendations?api_key=${process.env.API_KEY}`
      ).then((res) => {
        da.push(res.data.results);
        setSd(da);
      });

    id.map(async (s) => res(s));
  }, []);

  useEffect(() => {
    const pagenateArr = (arr: any[]) => {
      let news = JSON.parse(JSON.stringify(arr));
      var num = Math.ceil(news.length / 3);
      for (let i = 1; i <= 3; i++) {
        c.push(news.splice(0, num));
        setGh(c);
      }
    };
    sd.map((s: any[]) => pagenateArr(s));
    // console.log("sd", sd);
  }, [sd]);

  // console.log("recommend",sd, curr.current);
  // let body = null;
  // if (!sd || sd === undefined) {
  //   return <div>loading</div>;
  // } else {
  //   body = (
  //     <div>
  //       {sd.map((m: any) =>
  //         m.map((s: any, index: number) => (
  //           <div key={index}>
  //             <label>{s.title}</label>
  //             <br />
  //             <label style={{ color: "red", fontSize: "11px" }}>
  //               {s.release_date}
  //             </label>
  //           </div>
  //         ))
  //       )}
  //     </div>
  //   );
  // }

  const numbChangeBAck = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault;

    if (numb === 1) return;
    setNumb(numb - 1);
  };
  const numbChangeFwd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault;
    if (gh && numb === gh.length) return;
    setNumb(numb + 1);
  };

  return (
    <div>
      <Box sx={{ display: "flex" ,borderBottom: 1,borderColor:'lightGray'}}>
        <Box sx={{ flexGrow: 1 }} />

        <Button onClick={(e: any) => numbChangeBAck(e)} sx={{minWidth:'10px', color:`${numb===1?'lightGray':''}`}}>
          <ArrowBackIosIcon fontSize="inherit" />
        </Button>
        <label style={{ display: "none" }}>{numb}</label>
        <Button onClick={(e: any) => numbChangeFwd(e)} sx={{minWidth:'10px', color:`${numb===gh.length?'lightGray':''}`}}>
          <ArrowForwardIosIcon fontSize="inherit" />
        </Button>
      </Box>

      {gh && <Bodd arr={gh[numb - 1]} indexOfPage={numb} />}
      <div>{/* {gh && gh.map(s=>s.map(k=>(<div>{k.id}</div>)))} */}</div>
      {/* {sd &&
        sd[0].map((s: any, index: number) => (
          <div key={index}>
            <label>{s.title}</label>
            <br />
            <label style={{ color: "red" }}>{s.release_date}</label>
          </div>
        ))} */}
    </div>
  );
};

export default Recommend;
