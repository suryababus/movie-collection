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
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { signup } from "@/api/signup";
import { useToast } from "../ui/use-toast";
import { useRouter } from "@tanstack/react-router";

const signupFormSchema = z.object({
  email: z.string().email(),
  fullName: z
    .string()
    .min(6, { message: "Fullname must be 6 characters or more" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 characters or more" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be 6 characters or more" }),
});

export function SignupForm() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });
  const { toast } = useToast();
  const route = useRouter();

  const [_loading, setLoading] = useState(false);

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    await signup(data);
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
    });
    console.log("success");
    route.navigate({
      to: "/auth/login",
    });
    setLoading(false);
  });

  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Signup</CardTitle>
            <CardDescription>
              Enter your email below to signup for new account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="new-password"
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input type="text" required {...field} />
                  </FormControl>

                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      type="password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      type="password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type={"submit"} className="w-full">
              Sign up
            </Button>
            <Button
              type="button"
              size={"sm"}
              className="w-full"
              variant={"outline"}
              onClick={() => route.navigate({ to: "/auth/login" })}
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
