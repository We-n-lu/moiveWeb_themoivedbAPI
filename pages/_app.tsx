import type { AppProps } from "next/app";
import React, { createContext, useContext, useState } from "react";
import API from "../components/API";
import "../styles/globals.css";

export interface moive {
  title?: string;
  id?: number;
  overview?: string;
  backdrop_path?: string;
  poster_path?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
}
// interface searchTerm {
//   search: string;
//   searchChange: (item: string) => void;
//   request: (search: string) => void;
// }
export interface AppContextInterface {
  data?: moive[] | null;
  setData?: (data: moive[]) => void;
  search?: string;
  setSearch?: (search: string) => void;
  pageCount?: number;
  setPageCount?: (count: number) => void;
  indexMovie?: moive[] | null;
  indexTV: moive[] | null;
  apiPath: string;
  setApiPath: (item: string) => void;
  setIndexMoive?: (indexmoive: moive[]) => void;
  request: (apiPath: string, search?: string, page?: number,movie_id?:number) => void;
  searchChange: (item: string) => void;
  login: boolean;
  setLogin: (item: boolean) => void;
  user: string;
  setUser: (item: string) => void;
  collect: collectInfo[];
  collectChange: (item: collectInfo) => void;
  setCollect: (item: collectInfo[]) => void;
  recommendData: moive[];
  setRecommendDada: (item: moive[]) => void;
  indexRecommend: recommend;
  setIndexRecommend: (item: recommend) => void;
  recommmendChange: (item: moive[]) => void;
}

type recommend = {
  move?: moive[];
};

type collectInfo = {
  time: string;
  item: moive;
};
const StateContext = createContext<AppContextInterface | null>(null);
export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<moive[] | null>(null);
  // const [likecolor, setLikecolor] = useState("");
  const [search, setSearch] = useState("apple");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [indexMovie, setIndexMoive] = useState<moive[] | null>(null);
  const [indexTV, setIndexTV] = useState<moive[] | null>(null);
  const [apiPath, setApiPath] = useState("/search/movie");
  const [login, setLogin] = React.useState(false);
  const [user, setUser] = useState("");
  const [collect, setCollect] = useState<collectInfo[]>([]);
  const [recommendData, setRecommendDada] = useState<moive[]>([]);
  const [indexRecommend, setIndexRecommend] = useState<recommend>({});

  const request = async (apiPath: string, search?: string, page?: number, movie_id?: number) => {
    const res = await API.get(`${apiPath}?api_key=${process.env.API_KEY}`, {
      // withCredentials: false,
      params: { query: search, page: !page ? 1 : page ,movie_id: movie_id},
    }).catch(function (error) {
      // console.log("Error", error.message);
      alert('request not exist!')
    });
    if (!res) return;
    if (apiPath === "/movie/now_playing") {
      setIndexMoive(res.data.results);
      setApiPath(apiPath);
    }
    if (apiPath === "/tv/popular") {
      setIndexTV(res.data.results);
      setApiPath(apiPath);
    }
    // if(apiPath.includes('/recommendations')){
    //   setRecommendDada(res.data.results);
    // }
    setData(res.data.results);
    setPageCount(res.data.total_pages);
    setApiPath(apiPath);
  };

  const searchChange = (item: string) => {
    setSearch(item);
  };
  const collectChange = (s: collectInfo) => {
    setCollect([...collect, { time: s.time, item: s.item }]);
  };
  const recommmendChange = (s: moive[]) => {
    setIndexRecommend({ ...indexRecommend, move: s });
  };

  return (
    <StateContext.Provider
      value={{
        recommendData,
        setRecommendDada,
        indexRecommend,
        setIndexRecommend,
        recommmendChange,
        setCollect,
        collect,
        collectChange,
        user,
        setUser,
        login,
        setLogin,
        indexMovie,
        indexTV,
        apiPath,
        setApiPath,
        data,
        setData,
        search,
        setSearch,
        pageCount,
        setPageCount,
        setIndexMoive,
        request,
        searchChange,
      }}
    >
      <Component {...pageProps} />
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
