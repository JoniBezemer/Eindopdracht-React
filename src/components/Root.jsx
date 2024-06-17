import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { Box } from "@chakra-ui/react";

const Root = () => (
  <Box>
    <Navigation />
    <Outlet />
  </Box>
);

export default Root;
