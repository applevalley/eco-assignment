import { useEffect, useState } from "react";

import NowWeather from "@/components/organisms/NowWeather";
import TodayWeather from "@/components/organisms/TodayWeather";
import LocationSearch from "@/components/organisms/LocationSearch";
import { getStorageValue, setStorageValue } from "@/utils/storage";

interface locationProps {
  thirdLevel: string;
  gridX: number;
  gridY: number;
}

// 메인 페이지 (날씨 검색)
const WeatherPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<locationProps | null>(null);
  const [savedLocations, setSavedLocations] = useState<locationProps[]>([]);
  const storedLocationList = getStorageValue("storedLocations");

  useEffect(() => {
    const getStoredLocations = JSON.parse(storedLocationList || "[]");
    setSavedLocations(getStoredLocations);
  }, [storedLocationList]);

  // 즐겨찾기된 지역 클릭 핸들러 -> NowWeather 컴포넌트로 지역 정보 전달
  const handleSavedLocationClick = (location: locationProps) => {
    setSelectedLocation(location);
  };

  // 즐겨찾기된 지역 제거 핸들러
  const handleRemoveSavedLocation = (thirdLevel: string) => {
    const updatedLocations = savedLocations.filter(
      (location) => location.thirdLevel !== thirdLevel
    );

    // 상태 및 로컬 스토리지 업데이트
    setSavedLocations(updatedLocations);
    setStorageValue("local", "storedLocations", updatedLocations);
  };

  return (
    <div className="space-y-4">
      <NowWeather selectedLocation={selectedLocation} />
      <TodayWeather selectedLocation={selectedLocation} />
      <LocationSearch onLocationSelect={(location) => setSelectedLocation(location)} />
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">저장된 지역</h2>
        {savedLocations.length > 0 ? (
          <ul className="flex gap-4">
            {savedLocations.map((location, index) => (
              <li key={`${location.thirdLevel}-${index}`} className="flex gap-3">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleSavedLocationClick(location)}
                >
                  {location.thirdLevel}
                </button>
                <button onClick={() => handleRemoveSavedLocation(location.thirdLevel)}>X</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>저장된 지역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
