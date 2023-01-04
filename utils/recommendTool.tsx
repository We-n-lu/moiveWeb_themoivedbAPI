import React from "react";
import { moive } from "../pages/_app";

export const recommendTool = (indexMoive: moive[]) => {
  const im: number[] = [];
  indexMoive.forEach((item, index) => {
    im[index] = item.id as number;
  });

  return im;
};
