import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const PieChartUser = ({ allUser, girl, boy }) => {
  return (
    <>
      <PieChart
        data={[
          { title: "کاربران زن", value: girl, color: "#a78bfa" },
          { title: "کاربران مرد", value: boy, color: "#10b981" },
        ]}
        label={({ dataEntry }) => {
          return ((dataEntry.value * 100) / allUser).toFixed(2) + "%";
        }}
        labelStyle={{
          fontSize: "8px",
          color: "#0001",
          opacity: "0.5",
        }}
      />
    </>
  );
};

export default PieChartUser;
