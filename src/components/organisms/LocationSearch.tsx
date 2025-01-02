import { getStorageValue } from "@/utils/storage";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

interface LocationData {
  thirdLevel: string; // 동 이름
  gridX: number; // 격자 X
  gridY: number; // 격자 Y
}

interface ExcelRow {
  "3단계": string;
  "격자 X": number;
  "격자 Y": number;
}

interface LocationSearchProps {
  onLocationSelect: (location: LocationData) => void;
}

const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<LocationData[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Excel 파일 처리
  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch("/locationData.xlsx");
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = (e) => {
          if (!e.target?.result) return;

          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];

          // 타입 명시적으로 선언
          const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

          const locationData: LocationData[] = jsonData.map((row) => ({
            thirdLevel: String(row["3단계"]),
            gridX: Number(row["격자 X"]),
            gridY: Number(row["격자 Y"]),
          }));

          setLocations(locationData);
        };

        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      }
    };

    fetchExcelData();
  }, []);

  // 검색어에 따른 필터링
  useEffect(() => {
    if (!searchTerm) {
      setFilteredLocations([]);
      setIsDropdownOpen(false);
      return;
    }

    const filtered = locations.filter((location) => location.thirdLevel.includes(searchTerm));
    setFilteredLocations(filtered);
    setIsDropdownOpen(true);
  }, [searchTerm, locations]);

  // 지역 선택 핸들러
  const handleLocationSelect = (location: LocationData) => {
    onLocationSelect({
      thirdLevel: location.thirdLevel,
      gridX: location.gridX,
      gridY: location.gridY,
    });

    // 로컬 스토리지에 지역 정보 저장
    const getStoredLocations = JSON.parse(getStorageValue("storedLocations") || "[]");
    const isDuplicate = getStoredLocations.some(
      (saved: LocationData) => saved.thirdLevel === location.thirdLevel
    );
    if (!isDuplicate) {
      getStoredLocations.push(location);
      localStorage.setItem("storedLocations", JSON.stringify(getStoredLocations));
    }

    setSearchTerm(location.thirdLevel);
    setIsDropdownOpen(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">지역 날씨 검색</h2>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="동 이름을 입력하세요"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {isDropdownOpen && filteredLocations.length > 0 && (
          <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
            {filteredLocations.map((location, index) => (
              <button
                key={`${location.thirdLevel}-${index}`}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                onClick={() => handleLocationSelect(location)}
              >
                {location.thirdLevel}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
