"use client";

import { useRegsiterModal } from "@/hooks/use-register-modal";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginModal } from "@/hooks/use-login-modal";
import axios from 'axios';
import { toast } from 'react-hot-toast'

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "username should be two charechter long." }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be 6 charechter long." }),
});

const RegisterModal = () => {
  const registerModal = useRegsiterModal();
  const loginModal = useLoginModal()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      },
      resolver : zodResolver(formSchema)
  });

  const Loading  = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.post('/api/register', values)
        toast.success("Success")
        form.reset();
        loginModal.onOpen()
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
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              <Button
                disabled={Loading}
                type="submit"
                className="w-full bg-rose-500"
              >
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
                <div className="font-semibold text-neutral-400">
            Already have an account <span onClick={() => {
              loginModal.onOpen();
                    }} className="underline ml-2 cursor-pointer !text-rose-500">Login</span>
                </div>
            </div>
      </div>
    );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title="Register"
      onClose={registerModal.onClose}
          body={body}    
          footer={footer}
    />
      
  );
};

export default RegisterModal;
