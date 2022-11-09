export interface Movie {
  poster_path: string;
  id: number;
  name: string;
  image: string;
  backdrop_path: string;
  release_date: string;
  original_language: string;
  vote_average: number;
  overview: string;
  trailerKey: string[];
  watch: string;
  genres?: geners[];
  runtime?: number;
}

export interface geners {
  id: number;
  name: string;
}

export interface production_companies {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface production_countries {
  iso_3166_1: string;
  name: string;
}

export interface spoken_languages {
  iso_639_1: string;
  name: string;
}

export interface Cast {
  name: string;
  picture: string;
}

export interface MoviesResponse {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | object;
  budget: number;
  genres: geners[];
  id: number;
  name: string;
  homepage: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: production_companies[];
  production_countries: production_countries[];
  release_date: string;
  format: Date;
  revenue: number;
  runtime: number | null;
  spoken_languages: spoken_languages[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  cast: Cast[];
}

export interface MoviesResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  original_name: string;
  genres?: geners[];
  runtime?: number;
}

export interface Trailer {
  id: number;
  results: [];
}
