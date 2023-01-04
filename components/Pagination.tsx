import Pagination from "@mui/material/Pagination";
import React from "react";

interface PaginationProps {
  search?: string;
  apiPath:string;
  request: (apiPath: string,search?: string, page?: number) => void;
count: number
}

const Paginations: React.FC<PaginationProps> = ({count, search,request,apiPath}) => {
  return (
    <>
      <Pagination
        count={count}
        shape="rounded"
        onClick={(e: any) => {
          e.preventDefault();
          // console.log('pagi-comp-apipath',apiPath)
          request(apiPath,search as any,  e.target.textContent);
          // console.log('e',e.target)
        }}
      />
      
    </>
  );
};

export default Paginations;
