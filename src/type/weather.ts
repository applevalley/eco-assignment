// 초단기 실황조회
export type UltraSrtNcstType = {
  serviceKey: string; // 	공공데이터포털에서 받은 인증키
  pageNo: number; // 페이지번호
  numOfRows: number; // 한 페이지 결과 수
  dataType: string; // 요청자료형식(XML/JSON) Default: XML
  base_date: number; // 20250102 ‘25년 1월 2일 발표
  base_time: string; // 0600 06시 발표(정시단위)
  nx: number; // 예보지점의 X 좌표값
  ny: number; // 예보지점의 Y 좌표값
};

export type UltraSrtNcstResponseType = {
  response: {
    header: {
      resultCode: string; // 응답 메시지코드
      resultMsg: string; // 	응답 메시지 설명
    };
    body: {
      dataType: string; // 	응답자료형식 (XML/JSON)
      items: {
        item: Array<{
          baseDate: string; // 발표일자
          baseTime: string; // 발표시각
          category: string; // 자료구분코드
          nx: number; // 예보지점 X 좌표
          ny: number; // 예보지점 Y 좌표
          obsrValue: string; // 실황 값
        }>;
      };
      pageNo: number; // 페이지 수
      numOfRows: number; // 한 페이지당 표출 데이터 수
      totalCount: number; // 데이터 총 개수
    };
  };
};

// 초단기예보조회
export type UltraSrtFcstType = {
  serviceKey: string; // 공공데이터포털에서 받은 인증키
  pageNo: number; // 페이지번호
  numOfRows: number; // 한 페이지 결과 수
  dataType: string; // 요청자료형식(XML/JSON) Default: XML
  base_date: number; // 발표일자(필수)
  base_time: string; // 발표시각(필수) - 매시각 45분 이후 호출
  nx: number; // 예보지점 X 좌표값(필수)
  ny: number; // 예보지점 Y 좌표값(필수)
};

export type UltraSrtFcstResponseType = {
  numOfRows: number; // 한 페이지당 표출 데이터 수
  pageNo: number; // 페이지 수
  totalCount: number; // 데이터 총 개수
  resultCode: string; // 응답 메시지코드
  resultMsg: string; // 응답 메시지 설명
  dataType: string; // 응답자료형식 (XML/JSON)
  baseDate: number; // 발표일자
  baseTime: string; // 발표시각
  nx: number; // 예보지점 X 좌표
  ny: number; // 예보지점 Y 좌표
  category: string; // 자료구분코드
  fcstDate: number; // 예측일자(YYYYMMDD)
  fcstTime: string; // 예측시간(HH24MI)
  fcstValue: string; // 예보 값
};

// 단기예보조회
export type VilageFcstType = {
  serviceKey: string; // 공공데이터포털에서 받은 인증키
  pageNo: number; // 페이지번호
  numOfRows: number; // 한 페이지 결과 수
  dataType: string; // 요청자료형식(XML/JSON) Default: XML
  base_date: number; // 발표일자
  base_time: string; // 발표시각
  nx: number; // 예보지점의 X 좌표값
  ny: number; // 예보지점의 Y 좌표값
};

export type VilageFcstResponseType = {
  response: {
    header: {
      resultCode: string; // 응답 메시지코드
      resultMsg: string; // 응답 메시지 설명
    };
    body: {
      dataType: string; // 	응답자료형식 (XML/JSON)
      items: {
        item: Array<{
          baseDate: string; // 발표일자
          baseTime: string; // 발표시각
          fcstDate: string; // 예보일자
          fcstTime: string; // 예보시각
          category: string; // 자료구분코드
          nx: number; // 예보지점 X 좌표
          ny: number; // 예보지점 Y 좌표
          fcstValue: string; // 예보 값
        }>;
      };
      pageNo: number; // 페이지 수
      numOfRows: number; // 한 페이지당 표출 데이터 수
      totalCount: number; // 데이터 총 개수
    };
  };
};

// 예보버전조회
export type FcstVersionType = {
  serviceKey: string; // 공공데이터포털에서 받은 인증키
  pageNo: number; // 페이지번호
  numOfRows: number; // 한 페이지 결과 수
  dataType: string; // 요청자료형식(XML/JSON) Default: XML
  ftype: string; // 파일구분 (ODAM: 초단기실황, VSRT: 초단기예보, SHRT: 단기예보)
  basedatetime: number; // 발표일시분
};

export type FcstVersionResponseType = {
  numOfRows: number; // 한 페이지당 표출 데이터 수
  pageNo: number; // 페이지 수
  totalCount: number; // 데이터 총 개수
  resultCode: string; // 응답 메시지코드
  resultMsg: string; // 응답 메시지 설명
  dataType: string; // 응답자료형식 (XML/JSON)
  version: string; // 파일버전 정보 - 파일 생성 시간
  filetype: string; // 파일구분 (ODAM: 초단기실황, VSRT: 초단기예보, SHRT: 단기예보)
};

// 중기전망조회
export type MidFcstType = {
  serviceKey: string; // 공공데이터포털에서 받은 인증키
  pageNo: number; // 페이지번호
  numOfRows: number; // 한 페이지 결과 수
  dataType: string; // 요청자료형식(XML/JSON) Default: XML
  stnId: string; // 지점번호
  tmFc: number; // 발표시각 (일 2회 - 06:00, 18:00)
};

export type MidFcstResponseType = {
  numOfRows: number; // 한 페이지당 표출 데이터 수
  pageNo: number; // 페이지 수
  totalCount: number; // 데이터 총 개수
  resultCode: string; // 응답 메시지코드
  resultMsg: string; // 응답 메시지 설명
  dataType: string; // 응답자료형식 (XML/JSON)
  wfSv: string; // 기상전망 정보
};

// 중기육상예보조회
export type MidLandFcstType = {
  serviceKey: string; // 공공데이터포털에서 받은 인증키
  pageNo: number; // 페이지번호
  numOfRows: number; // 한 페이지 결과 수
  dataType: string; // 요청자료형식(XML/JSON) Default: XML
  regId: string; // 예보구역코드
  tmFc: number; // 발표시각 (일 2회 - 06:00, 18:00)
};

export type MidLandFcstResponseType = {
  numOfRows: number; // 한 페이지당 표출 데이터 수
  pageNo: number; // 페이지 수
  totalCount: number; // 데이터 총 개수
  resultCode: string; // 응답 메시지코드
  resultMsg: string; // 응답 메시지 설명
  dataType: string; // 응답자료형식 (XML/JSON)
  regId: string; // 예보구역코드
  rnSt4Am: number; // 4일 후 오전 강수 확률
  rnSt4Pm: number; // 4일 후 오후 강수 확률
  rnSt5Am: number; // 5일 후 오전 강수 확률
  rnSt5Pm: number; // 5일 후 오후 강수 확률
  rnSt6Am: number; // 6일 후 오전 강수 확률
  rnSt6Pm: number; // 6일 후 오후 강수 확률
  rnSt7Am: number; // 7일 후 오전 강수 확률
  rnSt7Pm: number; // 7일 후 오후 강수 확률
  rnSt8: number; // 8일 후 강수 확률
  rnSt9: number; // 9일 후 강수 확률
  rnSt10: number; // 10일 후 강수 확률
  wf4Am: string; // 4일 후 오전 날씨예보
  wf4Pm: string; // 4일 후 오후 날씨예보
  wf5Am: string; // 5일 후 오전 날씨예보
  wf5Pm: string; // 5일 후 오후 날씨예보
  wf6Am: string; // 6일 후 오전 날씨예보
  wf6Pm: string; // 6일 후 오후 날씨예보
  wf7Am: string; // 7일 후 오전 날씨예보
  wf7Pm: string; // 7일 후 오후 날씨예보
  wf8: string; // 8일 후 날씨예보
  wf9: string; // 9일 후 날씨예보
  wf10: string; // 10일 후 날씨예보
};

// 중기기온조회
export type MidTaType = {
  serviceKey: string; // 공공데이터포털에서 받은 인증키
  pageNo: number; // 페이지번호
  numOfRows: number; // 한 페이지 결과 수
  dataType: string; // 요청자료형식(XML/JSON) Default: XML
  regId: string; // 예보구역코드
  tmFc: number; // 발표시각 (일 2회 - 06:00, 18:00)
};

export type MidTaResponseType = {
  numOfRows: number; // 한 페이지당 표출 데이터 수
  pageNo: number; // 페이지 수
  totalCount: number; // 데이터 총 개수
  resultCode: string; // 응답 메시지코드
  resultMsg: string; // 응답 메시지 설명
  dataType: string; // 응답자료형식 (XML/JSON)
  regId: string; // 예보구역코드
  taMin4: number; // 4일 후 예상최저기온(℃)
  taMin4Low: number; // 4일 후 예상최저기온 하한범위
  taMin4High: number; // 4일 후 예상최저기온 상한범위
  taMax4: number; // 4일 후 예상최고기온(℃)
  taMax4Low: number; // 4일 후 예상최고기온 하한범위
  taMax4High: number; // 4일 후 예상최고기온 상한범위
  taMin5: number; // 5일 후 예상최저기온(℃)
  taMin5Low: number; // 5일 후 예상최저기온 하한범위
  taMin5High: number; // 5일 후 예상최저기온 상한범위
  taMax5: number; // 5일 후 예상최고기온(℃)
  taMax5Low: number; // 5일 후 예상최고기온 하한범위
  taMax5High: number; // 5일 후 예상최고기온 상한범위
  taMin6: number; // 6일 후 예상최저기온(℃)
  taMin6Low: number; // 6일 후 예상최저기온 하한범위
  taMin6High: number; // 6일 후 예상최저기온 상한범위
  taMax6: number; // 6일 후 예상최고기온(℃)
  taMax6Low: number; // 6일 후 예상최고기온 하한범위
  taMax6High: number; // 6일 후 예상최고기온 상한범위
  taMin7: number; // 7일 후 예상최저기온(℃)
  taMin7Low: number; // 7일 후 예상최저기온 하한범위
  taMin7High: number; // 7일 후 예상최저기온 상한범위
  taMax7: number; // 7일 후 예상최고기온(℃)
  taMax7Low: number; // 7일 후 예상최고기온 하한범위
  taMax7High: number; // 7일 후 예상최고기온 상한범위
  taMin8: number; // 8일 후 예상최저기온(℃)
  taMin8Low: number; // 8일 후 예상최저기온 하한범위
  taMin8High: number; // 8일 후 예상최저기온 상한범위
  taMax8: number; // 8일 후 예상최고기온(℃)
  taMax8Low: number; // 8일 후 예상최고기온 하한범위
  taMax8High: number; // 8일 후 예상최고기온 상한범위
  taMin9: number; // 9일 후 예상최저기온(℃)
  taMin9Low: number; // 9일 후 예상최저기온 하한범위
  taMin9High: number; // 9일 후 예상최저기온 상한범위
  taMax9: number; // 9일 후 예상최고기온(℃)
  taMax9Low: number; // 9일 후 예상최고기온 하한범위
  taMax9High: number; // 9일 후 예상최고기온 상한범위
  taMin10: number; // 10일 후 예상최저기온(℃)
  taMin10Low: number; // 10일 후 예상최저기온 하한범위
  taMin10High: number; // 10일 후 예상최저기온 상한범위
  taMax10: number; // 10일 후 예상최고기온(℃)
  taMax10Low: number; // 10일 후 예상최고기온 하한범위
  taMax10High: number; // 10일 후 예상최고기온 상한범위
};

// 중기해상예보조회
export type MidSeaType = {
  serviceKey: string; // 공공데이터포털에서 받은 인증키
  pageNo: number; // 페이지번호
  numOfRows: number; // 한 페이지 결과 수
  dataType: string; // 요청자료형식(XML/JSON) Default: XML
  regId: string; // 예보구역코드
  tmFc: number; // 발표시각 (일 2회 - 06:00, 18:00)
};

export type MidSeaResponseType = {
  numOfRows: number; // 한 페이지당 표출 데이터 수
  pageNo: number; // 페이지 수
  totalCount: number; // 데이터 총 개수
  resultCode: string; // 응답 메시지코드
  resultMsg: string; // 응답 메시지 설명
  dataType: string; // 응답자료형식 (XML/JSON)
  regId: string; // 예보구역코드
  wf4Am: string; // 4일후 오전날씨예보
  wf4Pm: string; // 4일후 오후날씨예보
  wf5Am: string; // 5일후 오전날씨예보
  wf5Pm: string; // 5일후 오후날씨예보
  wf6Am: string; // 6일후 오전날씨예보
  wf6Pm: string; // 6일후 오후날씨예보
  wf7Am: string; // 7일후 오전날씨예보
  wf7Pm: string; // 7일후 오후날씨예보
  wf8: string; // 8일후 날씨예보
  wf9: string; // 9일후 날씨예보
  wf10: string; // 10일후 날씨예보
  wh4AAm: number; // 4일후 오전 최저 예상파고(m)
  wh4APm: number; // 4일후 오후 최저 예상파고(m)
  wh4BAm: number; // 4일후 오전 최고 예상파고(m)
  wh4BPm: number; // 4일후 오후 최고 예상파고(m)
  wh5AAm: number; // 5일후 오전 최저 예상파고(m)
  wh5APm: number; // 5일후 오후 최저 예상파고(m)
  wh5BAm: number; // 5일후 오전 최고 예상파고(m)
  wh5BPm: number; // 5일후 오후 최고 예상파고(m)
  wh6AAm: number; // 6일후 오전 최저 예상파고(m)
  wh6APm: number; // 6일후 오후 최저 예상파고(m)
  wh6BAm: number; // 6일후 오전 최고 예상파고(m)
  wh6BPm: number; // 6일후 오후 최고 예상파고(m)
  wh7AAm: number; // 7일후 오전 최저 예상파고(m)
  wh7APm: number; // 7일후 오후 최저 예상파고(m)
  wh7BAm: number; // 7일후 오전 최고 예상파고(m)
  wh7BPm: number; // 7일후 오후 최고 예상파고(m)
  wh8A: number; // 8일후 최저예상파고(m)
  wh8B: number; // 8일후 최고 예상파고(m)
  wh9A: number; // 9일후 최저예상파고(m)
  wh9B: number; // 9일후 최고 예상파고(m)
  wh10A: number; // 10일후 최저예상파고(m)
  wh10B: number; // 10일후 최고 예상파고(m)
};
