import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = async ({ children }) => {
  return <HydrationBoundary>{children}</HydrationBoundary>;
};

export default layout;
