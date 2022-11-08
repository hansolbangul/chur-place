export interface IGetLocation {
  cat_id: number,
  age: number,
  lat: number,
  lon: number,
  gender: number,
  name: string,
  member_id: number,
}

export interface IGetCatInfo {
  id: number,
  cat_id: number,
  member_name: string,
  comment: string,
  create_date: string;
}

export interface ILatLon { x: number; y: number; _lat: number; _lng: number }

export interface IType { type_id: number; name: string }

export interface ITag { tag_id: number; name: string }

export interface ISelect {
  type: number;
  tag: number[]
}