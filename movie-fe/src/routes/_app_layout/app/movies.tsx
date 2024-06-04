import { MoviesResponse, searchMovie } from "@/api/searchMovies";
import Loading from "@/components/blocks/loading";
import NoResult from "@/components/blocks/no-result";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export const Route = createFileRoute("/_app_layout/app/movies")({
  component: Movies,
});

function Movies() {
  const [searchKey, setSearchKey] = useState("");
  const [movies, setMovies] = useState<MoviesResponse>();
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (key: string) => {
    if (!key) return;
    setLoading(true);
    setMovies(undefined);
    const resp = await searchMovie(key);
    console.log(resp);
    setMovies(resp.data);
    setLoading(false);
  };

  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 500), []);

  useEffect(() => {
    debouncedFetchMovies(searchKey);
  }, [searchKey]);

  return (
    <div className="flex flex-col w-full h-full flex-1 overflow-scroll">
      <div className="w-full flex flex-row justify-center items-center">
        <div className="relative m-2 mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
          />
        </div>
      </div>
      {loading && (
        <div className="flex flex-row flex-1 w-full m-4">
          <Loading />
        </div>
      )}
      {!loading && !movies && <NoResult />}
      {movies && (
        <div className="flex flex-row flex-wrap justify-evenly gap-4 mt-4 overflow-scroll">
          {movies?.Search.map((movie) => <MovieCard {...movie} />)}
        </div>
      )}
    </div>
  );
}

type MovieCardProps = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export default function MovieCard(props: MovieCardProps) {
  const { Poster, Title, Type, Year, imdbID } = props;
  const router = useRouter();

  const onMovieClick = () => {
    router.navigate({
      to: "/app/movie/$id",
      params: { id: imdbID },
    });
  };
  return (
    <div
      className="rounded-lg shadow-md overflow-hidden w-full max-w-xs"
      onClick={onMovieClick}
    >
      <div className="relative">
        <img
          src={Poster}
          width={400}
          height={750}
          alt="Movie Poster"
          className="w-full h-[450px] object-cover"
        />
        <div
          className="absolute bottom-0 left-0 right-0  p-4"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5928965336134453) 54%, rgba(0,0,0,1) 100%)",
          }}
        >
          <h2 className="text-white text-xl font-bold mb-1">{Title}</h2>
          <div className="flex items-center text-gray-300 space-x-2">
            <span>{Year}</span>
            <span>{Type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
