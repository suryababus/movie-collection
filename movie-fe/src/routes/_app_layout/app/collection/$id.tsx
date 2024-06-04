import { addMovieToCollection } from "@/api/addMovieToCollection";
import { CollectionResponse, getCollection } from "@/api/getCollection";
import { MoviesResponse, searchMovie } from "@/api/searchMovies";
import ErrorComponent from "@/components/blocks/error";
import Loading from "@/components/blocks/loading";
import NoResult from "@/components/blocks/no-result";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
// import { debounce } from "@/lib/utils";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export const Route = createFileRoute("/_app_layout/app/collection/$id")({
  component: CollectionDetails,
});

function CollectionDetails() {
  const collectionId = Route.useParams().id;
  const [collection, setCollection] = useState<CollectionResponse | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    setLoading(true);
    const _collection = await getCollection(collectionId);
    setCollection(_collection.data ?? null);
    setLoading(false);
  };

  const onMovieClick = async (imbdId: string) => {
    router.navigate({
      to: "/app/movie/$id",
      params: { id: imbdId },
    });
  };

  if (loading)
    return (
      <div className="flex flex-1 w-full m-4">
        <Loading />
      </div>
    );

  if (!collection)
    return (
      <div>
        <ErrorComponent />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full flex-1 overflow-scroll">
      <div className="text-3xl flex flex-row justify-between w-full p-8">
        Collection: {collection.name}
        <AddMovieToCollection />
      </div>
      {collection.movies && (
        <div className="flex flex-row flex-wrap m-4 gap-4 mt-4 flex-1">
          {collection.movies?.map((movie) => (
            <MovieCard
              Poster={movie.poster}
              Title={movie.title}
              Type={movie.type}
              Year={movie.year.toString()}
              imdbID={movie.imdbID}
              onClick={() => onMovieClick(movie.imdbID)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AddMovieToCollection() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">Add new movie</Button>
      </DialogTrigger>
      <DialogContent className="dark text-foreground w-5/6 h-5/6 overflow-scroll">
        <DialogHeader className="flex-1 h-full w-full overflow-scroll">
          <DialogTitle>Add new movie to collection</DialogTitle>
          <DialogDescription className="flex-1 h-full w-full overflow-scroll ">
            <MoviesSearch />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function MoviesSearch() {
  const [searchKey, setSearchKey] = useState("");
  const [movies, setMovies] = useState<MoviesResponse>();
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (key: string) => {
    if (!key) return;
    setLoading(true);
    const resp = await searchMovie(key);
    console.log(resp);
    setMovies(resp.data);
    setLoading(false);
  };

  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 500), []);

  const collectionId = Route.useParams().id as string;

  useEffect(() => {
    debouncedFetchMovies(searchKey);
  }, [searchKey]);
  const onMovieClick = async (props: MovieCardProps) => {
    const { Poster, Title, Type, Year, imdbID } = props;
    await addMovieToCollection({
      collectionId: collectionId,
      imdbID,
      name: Title,
      poster: Poster,
      type: Type,
      year: parseInt(Year),
    });
    window.location.reload();
  };

  return (
    <div className="flex flex-col w-full h-full flex-1 overflow-scroll pl-1">
      <div className="relative m-2 mt-4 mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search movies..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          onChange={(e) => setSearchKey(e.target.value)}
          value={searchKey}
        />
      </div>
      {loading && (
        <div className="m-4">
          <Loading />
        </div>
      )}
      {!loading && !movies && <NoResult />}
      {movies && (
        <div className="flex flex-row flex-wrap justify-evenly gap-4 mt-4 flex-1 overflow-scroll">
          {movies?.Search.map((movie) => (
            <MovieCard {...movie} onClick={() => onMovieClick(movie)} />
          ))}
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
  onClick?: () => void;
};

export default function MovieCard(props: MovieCardProps) {
  const { Poster, Title, Type, Year, onClick } = props;

  return (
    <div
      className="rounded-lg shadow-md overflow-hidden w-full max-w-xs"
      onClick={onClick}
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
