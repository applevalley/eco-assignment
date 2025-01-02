import { useQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  getFcstVersion,
  getMidFcst,
  getMidLandFcst,
  getMidSea,
  getMidTa,
  getUltraSrtFcst,
  getUltraSrtNcst,
  getVilageFcst,
} from "@/apis/weather";
import {
  FcstVersionType,
  MidFcstType,
  MidLandFcstType,
  MidSeaType,
  MidTaType,
  UltraSrtFcstType,
  UltraSrtNcstType,
  VilageFcstType,
} from "@/type/weather";

export const weatherKey = createQueryKeys("weather", {
  ultraSrtNcst: ["ultraSrtNcst"],
  ultraSrtFcst: ["ultraSrtFcst"],
  vilageFcst: ["vilageFcst"],
  fcstVersion: ["fcstVersion"],

  midFcst: ["midFcst"],
  midLandFcst: ["midLandFcst"],
  midTa: ["midTa"],
  midSea: ["midSea"],
});

// 초단기실황조회
export const useUltraSrtNcst = (requestData: UltraSrtNcstType) => {
  const { data } = useQuery({
    queryKey: [weatherKey.ultraSrtNcst],
    queryFn: () => {
      return getUltraSrtNcst(requestData);
    },
    enabled: requestData.nx > 0 && requestData.ny > 0,
  });
  return { data };
};

// 초단기예보조회
export const useUltraSrtFcst = (requestData: UltraSrtFcstType) => {
  const { data } = useQuery({
    queryKey: [weatherKey.ultraSrtFcst],
    queryFn: () => {
      return getUltraSrtFcst(requestData);
    },
  });
  return { data };
};

// 단기예보조회
export const useVilageFcst = (requestData: VilageFcstType) => {
  const { data } = useQuery({
    queryKey: [weatherKey.vilageFcst],
    queryFn: () => {
      return getVilageFcst(requestData);
    },
    enabled: requestData.nx > 0 && requestData.ny > 0,
  });
  return { data };
};

// 예보버전조회
export const useFcstVersion = (requestData: FcstVersionType) => {
  const { data } = useQuery({
    queryKey: [weatherKey.fcstVersion],
    queryFn: () => {
      return getFcstVersion(requestData);
    },
  });
  return { data };
};

// 중기전망조회
export const useMidFcst = (requestData: MidFcstType) => {
  const { data } = useQuery({
    queryKey: [weatherKey.midFcst],
    queryFn: () => {
      return getMidFcst(requestData);
    },
  });
  return { data };
};

// 중기육상예보조회
export const useMidLandFcst = (requestData: MidLandFcstType) => {
  const { data } = useQuery({
    queryKey: [weatherKey.midLandFcst],
    queryFn: () => {
      return getMidLandFcst(requestData);
    },
  });
  return { data };
};

// 중기기온조회
export const useMidTa = (requestData: MidTaType) => {
  const { data } = useQuery({
    queryKey: [weatherKey.midTa],
    queryFn: () => {
      return getMidTa(requestData);
    },
  });
  return { data };
};

// 중기해상예보조회
export const useMidSea = (requestData: MidSeaType) => {
  const { data } = useQuery({
    queryKey: [weatherKey.midSea],
    queryFn: () => {
      return getMidSea(requestData);
    },
  });
  return { data };
};
