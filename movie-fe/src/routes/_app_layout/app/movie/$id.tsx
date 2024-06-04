import { MovieResponse, getMovie } from "@/api/getMovie";
import Loading from "@/components/blocks/loading";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app_layout/app/movie/$id")({
  component: MovieDetails,
});

function MovieDetails() {
  const movieId = Route.useParams().id as string;
  const [movie, setMovie] = useState<MovieResponse | null>(null);

  useEffect(() => {
    getMovie(movieId).then((movie) => setMovie(movie.data ?? null));
  }, []);

  if (!movie)
    return (
      <div className="flex flex-1 w-full m-4">
        <Loading />
      </div>
    );

  return <MovieDetailedView movie={movie} />;
}

type Props = {
  movie: MovieResponse;
};
export default function MovieDetailedView(props: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <img
            src={props.movie.Poster}
            width={600}
            height={900}
            alt="Movie Poster"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            {props.movie.Title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {props.movie.Year}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {props.movie.imdbRating}/10
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {props.movie.Language}
          </div>
        </div>
      </div>
      <div className="mt-12 md:mt-16 lg:mt-20 grid gap-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Movie Details</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Runtime</p>
              <p>{props.movie.Runtime}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Genre</p>
              <p>{props.movie.Genre}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Director</p>
              <p>{props.movie.Director}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Actors</p>
              <p>{props.movie.Actors}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">
                Release Date
              </p>
              <p>{props.movie.Released}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Country</p>
              <p>{props.movie.Country}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Plot</h2>
          <p className="text-gray-500 dark:text-gray-400">{props.movie.Plot}</p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Awards</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {props.movie.Awards}
          </p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ratings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">IMDb</p>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-primary" />
                <p>{props.movie.imdbRating}/10</p>
              </div>
            </div>
            <div>
              {props.movie.Ratings.map((rating) => {
                return (
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-1">
                      {rating.Source}
                    </p>
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <p>{rating.Value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Additional Info
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">
                Production Company
              </p>
              <p>{props.movie.Production}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">
                Box Office
              </p>
              <p>{props.movie.BoxOffice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
