interface Group {
  _id: string;
  name: string;
}

export interface GroupList {
  groups: Group[];
}

export type GroupUserList = Group[];
