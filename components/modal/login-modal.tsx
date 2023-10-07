"use client";

import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegsiterModal } from "@/hooks/use-register-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";
import { Button } from "../ui/button";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Modal from "./modal";
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast'

const formSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be 6 charechter long." }),
});

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegsiterModal();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      signIn("credentials", {
        ...values,
        redirect : false
      }).then((callback) => {
        if (callback?.ok) {
          toast.success("Login Success")
          loginModal.onClose()
          window.location.reload()
        } else {
          toast.error("Something went wrong")
       }
     })
    } catch (error) {
      console.log(error)
    }
  };

  const body = (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Enter your Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-5 flex items-center justify-between">
            <Button disabled={loading} type="submit" className="w-full bg-rose-500">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
  const footer = (
    <div className="flex flex-col space-y-3">
      <Button onClick={() => signIn("google")} variant={"outline"} className="w-full relative">
        <FcGoogle size={24} className="absolute top-[20%] left-2" />
        Google
      </Button>
      <Button onClick={() => signIn("github")} variant={"outline"} className="w-full relative">
        <AiOutlineGithub size={24} className="absolute top-[20%] left-2" />
        Github
      </Button>

      <div className="py-2 text-center">
        <p className="font-semibold text-neutral-400">
          Don&apos;t have an account{" "}
          <span
            onClick={() => {
              registerModal.onOpen();
            }}
            className="ml-2 cursor-pointer !text-rose-500"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      title="Login"
      onClose={loginModal.onClose}
      body={body}
      footer={footer}
    />
  );
};

export default LoginModal;
