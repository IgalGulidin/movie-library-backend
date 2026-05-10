import { Router, Request, Response } from "express";
import axios from "axios";
import { TMDBResponse } from "../types/movie.types";

const router = Router();
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

router.get("/popular", async (req: Request, res: Response) => {
  try {
    const response = await axios.get<TMDBResponse>(
      `${TMDB_BASE_URL}/movie/popular`,
      {
        params: {
          api_key: TMDB_API_KEY,
          language: "en-US",
          page: 1,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetc popular movies" });
  }
});

router.get("/now-playing", async (req: Request, res: Response) => {
    try {
        const response = await axios.get<TMDBResponse>(
            `${TMDB_BASE_URL}/movie/now_playing`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                    language: "en-US",
                    page: 1,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch now playing movies" });
    }
});

router.get("/top-rated", async (req: Request, res: Response) => {
    try {
        const response = await axios.get<TMDBResponse>(
            `${TMDB_BASE_URL}/movie/top_rated`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                    language: "en-US",
                    page: 1,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch top rated movies"});
    }
});

export default router;
