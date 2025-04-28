export interface BaseChampion {
  id: string;
  name: string;
  en_name: string;
  image: string;
}

// MongoDB 에서 가져온 챔피언 타입
export interface MongoChampion {
  _id: string;
  name: string;
  en_name: string;
}

// MongoDB 에서 가져온 챔피언 타입을 변환하는 유틸리티 타입
type ConvertMongoId<T> = Omit<T, "_id"> & { id: string };

// summary 에 쓰일 챔피언 타입
export interface BanChampion extends BaseChampion {
  count: number;
}

export interface PickChampion extends BaseChampion {
  winRate: number;
  count: number;
}

export interface WorstChampion extends BaseChampion {
  winRate: number;
  count: number;
}

// MongoDB 에서 가져온 챔피언 타입을 변환한 타입
// 챔피언 팔레트에서 사용되는 챔피언 타입
export interface ChampionList extends ConvertMongoId<MongoChampion> {
  image: string;
}

// 챔피언 팔레트에서 선택된 밴된 챔피언 타입
export interface SelectedBanChampion {
  id: string;
  name: string;
  image: string;
}

// 글로벌 밴 챔피언 타입
export interface GlobalBanChampion {
  name: string;
  en_name: string;
}

// 스와이퍼용 챔피언 타입
export interface SwiperChampion {
  count: number;
  winRate: number;
  name: string;
  en_name: string;
  image: string;
  logo: string;
}
