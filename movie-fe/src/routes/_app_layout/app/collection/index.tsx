import { createCollection } from "@/api/createCollection";
import { MyCollectionResponse, myCollections } from "@/api/myCollections";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import image from "@/assets/movie-collage-bg.jpeg";
import { Checkbox } from "@/components/ui/checkbox";
import { allCollections } from "@/api/allCollections";
import Loading from "@/components/blocks/loading";
import ErrorComponent from "@/components/blocks/error";
import { debounce } from "@/lib/utils";
import { Search } from "lucide-react";
import NoResult from "@/components/blocks/no-result";

export const Route = createFileRoute("/_app_layout/app/collection/")({
  component: HomeScreen,
});

function HomeScreen() {
  const [data, setData] = useState<MyCollectionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    fetchData("");
  }, []);

  const fetchData = async (key: string) => {
    setLoading(true);
    const response = await allCollections(key);

    setData(response.data);
    setLoading(false);
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 500), []);

  useEffect(() => {
    debouncedFetchData(searchKey);
  }, [searchKey]);

  const onCollectionClick = (id: number) => {
    router.navigate({
      to: "/app/collection/" + id,
    });
  };

  if (!data)
    return (
      <div className="flex flex-1 w-full justify-center items-center">
        <ErrorComponent />
      </div>
    );

  return (
    <div className="flex flex-col flex-1 w-full p-8">
      <div className="flex w-full justify-between items-end mb-4">
        <div className="text-3xl">All Collections</div>
        <AddNewMovieCollection />
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <div className="relative m-2 mt-4 mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search collections..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
          />
        </div>
      </div>

      {loading && (
        <div className="flex flex-1 w-full m-4">
          <Loading />
        </div>
      )}
      {!loading && !data.length && <NoResult />}
      <div className="flex flex-row gap-4 w-full flex-wrap">
        {data.map((item) => (
          <Card
            className="max-w-md w-80 rounded-lg overflow-hidden shadow-lg dark:shadow-none"
            onClick={() => onCollectionClick(item.id)}
          >
            <img
              src={image}
              alt="Movie Poster"
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />
            {item.private && (
              <div className="relative">
                <div className="absolute  right-0 top-1 bg-red-500 rounded-xl m-2">
                  <div className="text-white text-lg font-bold mx-4 my-2">
                    Private
                  </div>
                </div>
              </div>
            )}
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {item.movies.length} movies
                </p>
              </div>
              <p className="text-sm leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const createMovieCollectionSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  privateCollection: z.boolean(),
});

function AddNewMovieCollection() {
  const form = useForm<z.infer<typeof createMovieCollectionSchema>>({
    resolver: zodResolver(createMovieCollectionSchema),
    defaultValues: {
      name: "",
      description: "",
      privateCollection: false,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await createCollection(data);
    window.location.reload();
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">Create New Collection</Button>
      </DialogTrigger>
      <DialogContent className="dark text-foreground w-96">
        <DialogHeader>
          <DialogTitle>Create new movie collection</DialogTitle>
          <DialogDescription className="">
            <Form {...form}>
              <form onSubmit={onSubmit}>
                <div className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="privateCollection"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2 pt-4">
                          <FormControl>
                            <Checkbox
                              onCheckedChange={(e) => field.onChange(e)}
                              checked={field.value}
                            />
                          </FormControl>
                          <FormLabel>Private</FormLabel>
                        </div>

                        <FormDescription>
                          Private collection will only be visible to you
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full">Create Collection</Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
