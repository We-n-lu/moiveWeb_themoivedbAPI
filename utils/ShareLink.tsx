import React from "react";

interface ShareLinkProps {
  clas: string;
  idnumb: number;
  title: string;
}

export const shareLink = ({ clas, idnumb, title }: ShareLinkProps) => {
  const dealTitle = title.replace(": ", "-").replace(/\s/g, "-");
  const baseUrl = "https://www.themoviedb.org";
  const link = baseUrl + `/${clas}/${idnumb}-${dealTitle}`;
    // console.log('link',link)
  return link;
};
