import { ActionResult, getRequest } from "@/apis/index.ts";
import { API_URL } from "@/constants/path";
import {
  UltraSrtNcstType,
  UltraSrtNcstResponseType,
  UltraSrtFcstResponseType,
  UltraSrtFcstType,
  VilageFcstType,
  VilageFcstResponseType,
  FcstVersionType,
  FcstVersionResponseType,
  MidFcstType,
  MidFcstResponseType,
  MidLandFcstType,
  MidLandFcstResponseType,
  MidTaType,
  MidTaResponseType,
  MidSeaType,
  MidSeaResponseType,
} from "@/type/weather";
import { apiQueryParameter } from "@/utils/queryParameter";

// 초단기실황조회 API
export const getUltraSrtNcst = async (
  requestData: UltraSrtNcstType
): Promise<ActionResult<UltraSrtNcstResponseType>> => {
  try {
    const queryParameters = apiQueryParameter(requestData);
    const response = await getRequest<UltraSrtNcstResponseType>(
      API_URL.ULTRA_WEATHER_LIVE,
      queryParameters
    );
    return response;
  } catch (error) {
    console.error("Get getUltraSrtNcst data failed: ", error);
    throw error;
  }
};

// 초단기예보조회 API
export const getUltraSrtFcst = async (
  requestData: UltraSrtFcstType
): Promise<ActionResult<UltraSrtFcstResponseType>> => {
  try {
    const queryParameters = apiQueryParameter(requestData);
    const response = await getRequest<UltraSrtFcstResponseType>(
      `${API_URL.ULTRA_WEATHER_FORECAST}?${queryParameters}`
    );
    return response;
  } catch (error) {
    console.error("Get getUltraSrtFcst data failed: ", error);
    throw error;
  }
};

// 단기예보조회 API
export const getVilageFcst = async (
  requestData: VilageFcstType
): Promise<ActionResult<VilageFcstResponseType>> => {
  try {
    const queryParameters = apiQueryParameter(requestData);
    const response = await getRequest<VilageFcstResponseType>(
      API_URL.WEATHER_FORECAST,
      queryParameters
    );
    return response;
  } catch (error) {
    console.error("Get getVilageFcst data failed: ", error);
    throw error;
  }
};

// 예보버전조회 API
export const getFcstVersion = async (
  requestData: FcstVersionType
): Promise<ActionResult<FcstVersionResponseType>> => {
  try {
    const queryParameters = apiQueryParameter(requestData);
    const response = await getRequest<FcstVersionResponseType>(
      `${API_URL.FORECAST_VERSION}?${queryParameters}`
    );
    return response;
  } catch (error) {
    console.error("Get getFcstVersion data failed: ", error);
    throw error;
  }
};

// 중기전망조회 API
export const getMidFcst = async (
  requestData: MidFcstType
): Promise<ActionResult<MidFcstResponseType>> => {
  try {
    const queryParameters = apiQueryParameter(requestData);
    const response = await getRequest<MidFcstResponseType>(
      `${API_URL.MID_FORECAST}?${queryParameters}`
    );
    return response;
  } catch (error) {
    console.error("Get getMidFcst data failed: ", error);
    throw error;
  }
};

// 중기육상예보조회 API
export const getMidLandFcst = async (
  requestData: MidLandFcstType
): Promise<ActionResult<MidLandFcstResponseType>> => {
  try {
    const queryParameters = apiQueryParameter(requestData);
    const response = await getRequest<MidLandFcstResponseType>(
      `${API_URL.MID_LAND_FORECAST}?${queryParameters}`
    );
    return response;
  } catch (error) {
    console.error("Get getMidLandFcst data failed: ", error);
    throw error;
  }
};

// 중기기온조회 API
export const getMidTa = async (
  requestData: MidTaType
): Promise<ActionResult<MidTaResponseType>> => {
  try {
    const queryParameters = apiQueryParameter(requestData);
    const response = await getRequest<MidTaResponseType>(
      `${API_URL.MID_TEMPERATURE}?${queryParameters}`
    );
    return response;
  } catch (error) {
    console.error("Get getMidTa data failed: ", error);
    throw error;
  }
};

// 중기해상예보조회 API
export const getMidSea = async (
  requestData: MidSeaType
): Promise<ActionResult<MidSeaResponseType>> => {
  try {
    const queryParameters = apiQueryParameter(requestData);
    const response = await getRequest<MidSeaResponseType>(`${API_URL.MID_SEA}?${queryParameters}`);
    return response;
  } catch (error) {
    console.error("Get getMidSea data failed: ", error);
    throw error;
  }
};
