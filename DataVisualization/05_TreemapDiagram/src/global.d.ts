export interface Kickstarter {
  name: string
  children: Array<{
    name: string
    children: Array<{
      name: string
      category: string
      value: string
    }>
  }>
}

export enum MovieGenre {
  Action = 'Action',
  Adventure = 'Adventure',
  Animation = 'Animation',
  Biography = 'Biography',
  Comedy = 'Comedy',
  Drama = 'Drama',
  Family = 'Family',
}

export interface Movies {
  name: string
  children: Array<{
    name: MovieGenre
    chilren: Array<{ name: string; category: MovieGenre; value: string }>
  }>
}

export interface Games {
  name: string
  children: Array<{
    name: string
    children: Array<{ name: string; category: string; value: string }>
  }>
}
