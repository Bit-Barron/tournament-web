import { Navbar } from "@/components/container/navbar/navbar";
import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { setCookies } from "@/utils/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout(props: MainLayoutProps) {
  const queryClient = getQueryClient();

  const { data: me, error: meError } = await rpc.api.user.me.get(setCookies());

  if (meError) redirect("/login");

  queryClient.setQueryData(["me"], me);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      {props.children}
    </HydrationBoundary>
  );
}
export const dynamic = "force-dynamic";
