export type MovieGenre = {
  id: number;
  name: string;
};

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object | null;
  budget: number;
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  genres: MovieGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  department: string;
  job: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type Movies = Movie[];

export type FetchOptions = Record<string, string | number | boolean>;

export type GenericSetter<T> = React.Dispatch<React.SetStateAction<T>>;
