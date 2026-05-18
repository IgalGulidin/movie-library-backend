import { Router, Request, Response } from "express";
import axios from "axios";
import { TMDBResponse } from "../types/movie.types";

const router = Router();
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

router.get("/search", async ( req: Request, res: Response) => {
    try {
        const query = req.query.q as string

        if (!query) {
            res.status(400).json({ error: "Search query is required "})
            return
        }

        const response = await axios.get<TMDBResponse>(
            `${TMDB_BASE_URL}/search/movie`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                    language: "en-US",
                    query: query,
                    page: 1,
                },
            }
        )
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: "Failed to search movies" })
    }
})

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

router.get("/in-theaters", async (req: Request, res: Response) => {
  try {
    const response = await axios.get<TMDBResponse>(
      `${TMDB_BASE_URL}/movie/now_playing`,
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
    res.status(500).json({ error: "Failed to fetch in theaters movies" });
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
      },
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top rated movies" });
  }
});

router.get("/recently-released", async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const response = await axios.get<TMDBResponse>(
      `${TMDB_BASE_URL}/discover/movie`,
      {
        params: {
          api_key: TMDB_API_KEY,
          language: "en-US",
          sort_by: "release_date.desc",
          "promary_release_date.gte": formatDate(threeMonthsAgo),
          "primary_release_date.lte": formatDate(today),
          page: 1,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recently released movies" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}`,
      {
        params: {
          api_key: TMDB_API_KEY,
          language: "en-US",
        },
      }
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie details" })
  }
})

export default router;
