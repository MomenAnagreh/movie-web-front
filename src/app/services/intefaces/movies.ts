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
  trailerKey: string;
  watch: string;
}

export interface MoviesResponse {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
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
}

export interface Trailer {
  id: number;
  results: [];
}
