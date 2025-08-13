import {Genre} from './genre.model';

export interface MovieDetailsModel {
  id: number,
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: string|null,
  budget: number
  genres: Genre[],
  homepage: string,
  imdb_id: string,
  origin_country: String[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  revenue: Number,
  runtime: Number,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}


