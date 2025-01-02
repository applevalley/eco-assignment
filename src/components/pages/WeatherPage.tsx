import { useState } from "react";

import NowWeather from "@/components/organisms/NowWeather";
import TodayWeather from "@/components/organisms/TodayWeather";
import LocationSearch from "@/components/organisms/LocationSearch";

interface locationProps {
  gridX: number;
  gridY: number;
}

// 메인 페이지 (날씨 검색)
const WeatherPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<locationProps | null>(null);
  return (
    <div className="space-y-4">
      <NowWeather />
      <TodayWeather />
      <LocationSearch onLocationSelect={(location) => setSelectedLocation(location)} />
    </div>
  );
};

export default WeatherPage;
