import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { weatherKey } from "./weather.query";

// tanstack query의 useQuery 사용시 쿼리키 관리를 용이하게 하기 위해 query key factory를 사용했습니다.
export const queryKeys = mergeQueryKeys(weatherKey);
