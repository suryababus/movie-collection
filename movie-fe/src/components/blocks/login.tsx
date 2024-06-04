import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { login } from "@/api/login";
import { useState } from "react";
import { setAuthToken } from "@/api";
import { useRouter } from "@tanstack/react-router";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be 6 characters or more" }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [_loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    const resp = await login(data);
    console.log(resp.data.token);
    setAuthToken(resp.data.token);
    router.navigate({
      to: "/app/my_collections",
    });
    setLoading(false);
  });
  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full">Log in</Button>
            <Button
              size={"sm"}
              className="w-full"
              variant={"outline"}
              onClick={() => router.navigate({ to: "/auth/signup" })}
            >
              Sign up
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
