import { lazy } from "react"

const Map = lazy(() => import('@/components/Map'));
const Markers = lazy(() => import('@/components/Markers'));
const StoreBox = lazy(() => import('@/components/StoreBox'));
import { StoreType } from "@/interface";
import CurrentLocationButton from "@/components/CurrentLocationButton";

export default async function Home() {
  const stores: StoreType[] = await getData();
  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
  );
}

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
}
