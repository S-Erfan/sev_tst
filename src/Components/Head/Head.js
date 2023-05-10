import Head from "next/head";
import React from "react";

const HeadCustom = ({ title, descriptionContent }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={descriptionContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/headLogo.png" />
    </Head>
  );
};

export default HeadCustom;
