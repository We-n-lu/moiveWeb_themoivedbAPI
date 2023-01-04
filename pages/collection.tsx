import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import NavBarComp from "../components/NavBarComp";
import { AppContextInterface, useStateContext } from "./_app";
import { useRouter } from "next/router";
interface CollectionProps {}

const Collection: React.FC<CollectionProps> = ({}) => {
  const { collect, setCollect, collectChange } =
    useStateContext() as AppContextInterface;
  const router = useRouter();
  const remove = (id: number) => {
    setCollect(collect.filter((s, index) => index !== id));
  };

  useEffect(() => {
    
    setCollect(JSON.parse(localStorage.getItem("collect") as string));
  }, []);

  useEffect(() => {
    localStorage.setItem("collect", JSON.stringify(collect));
  }, [collect]);
let body=null
if(collect.length === 0){
     body=(<div>Nothing collected yet!</div>) 
}else{
  body=(<div>
    {collect &&
          collect.map((s, index) => {
            return (
              <div key={index}>
                {s.time}
                {s.item.title}
                <Button
                  onClick={(e) => {
                    remove(index as number);
                    // console.log("removecollect", collect);
                  }}
                >
                  remove
                </Button>
              </div>
            );
          })}
  </div>)
}
  return (
    <>
      <NavBarComp />
      <div style={{ backgroundColor: "lightgray", height: "100vh" }}>
      
        <label style={{display:'block',marginLeft:'10%',paddingTop:'20px'}}>collection:</label>
    <Box
            sx={{
              display: "flex",
              backgroundColor: "white",
              padding: "10px",
              marginX: "10%",
              marginTop:'20px',
              borderRadius:'5px'
            }}
          >
            {body}
        {/* {collect &&
          collect.map((s, index) => {
            return (
              <div key={index}>
                {s.time}
                {s.item.title}
                <Button
                  onClick={(e) => {
                    remove(index as number);
                    console.log("removecollect", collect);
                  }}
                >
                  remove
                </Button>
              </div>
            );
          })} */}
          </Box>
      </div>
    </>
  );
};

export default Collection;
