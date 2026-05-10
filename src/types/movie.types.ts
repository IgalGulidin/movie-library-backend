export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    backdrop_path: string;
    original_language: string;
    genre_ids: number[];
    adult: boolean;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TMDBResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}