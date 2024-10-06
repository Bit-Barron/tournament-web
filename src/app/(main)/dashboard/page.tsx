"use client";

import { Navbar } from "@/components/container/navbar";
import { UserHook } from "@/components/hooks/user-hook";
import Link from "next/link";

interface MainPageProps {}

export default function MainPage(props: MainPageProps) {
  const { meQuery } = UserHook();

  return (
    <main>
      <Navbar />
      <h1>Hello, {meQuery.data?.username}</h1>
    </main>
  );
}
