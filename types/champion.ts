export interface BaseChampion {
  id: string;
  name: string;
  en_name: string;
  image: string;
}

export interface MongoChampion {
  _id: string;
  name: string;
  en_name: string;
}

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

export interface ChampionList extends ConvertMongoId<MongoChampion> {
  image: string;
}
