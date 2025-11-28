"use client";

import { useSearchParams } from "next/navigation";
import ScrollablePortfolio from "../components/sections/ScrollablePortfolio";

export default function Home() {
  const searchParams = useSearchParams();
  const skipLoading = searchParams.get("skip-loading") === "true";

  return <ScrollablePortfolio skipLoading={skipLoading} />;
}
