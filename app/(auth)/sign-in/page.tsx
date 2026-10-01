"use client";
import { signIn } from "@/app/lib/auth-client";
import {Eye, EyeSlash, Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField, InputGroup} from "@heroui/react";
import {Icon} from "@iconify/react";
import Link from "next/link";
import React from 'react';
import {useState} from "react";


const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as Record<string, string>
    
    console.log('Data after sign in', userData)

    const { data, error } = await signIn.email({
        email: userData.email,
        password: userData.password, 
        rememberMe: true, 
        callbackURL: "/",
    });

    console.log(data, error)
  };

  const handleGitSignIn = async() => {
    const data = await signIn.social({
        provider: "github"
    })

    console.log('After Github Sign In', data)
  }

  const handleGoogleSignIn = async() => {
    const data = await signIn.social({
      provider: 'google'
    })

    console.log('After Google Sign In', data)
  }

    return (
        <div className="mx-auto my-20">
            <h2 className="text-center font-bold text-2xl">Sign in Page</h2>
            <Form className="flex w-96 flex-col gap-4 my-10" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="Enter your email" />
        <FieldError />
      </TextField>
      <TextField 
        isRequired 
        name="password" 
        minLength={8}
        type={isVisible ? "text" : "password"}
        validate={(value) => {
            if (value.length < 8) {
                return "Password must be at least 8 characters";
            }
            if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
            }
            return null;
            }}
        >
      <Label>Password</Label>
      <InputGroup>
        <InputGroup.Input
            placeholder="Enter your password"
        />
        <InputGroup.Suffix className="pe-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
      <Description>Must be at least 8 characters with 1 number</Description>
      </TextField>
      <div className="flex gap-3 justify-center items-center">
        <Button type="submit" className={'bg-green-600'}>
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary" className={'text-green-600'}>
          Reset
        </Button>
        <Link href={'/forgot-password'}>
        <Button className={'bg-green-600'}>Forgot Password</Button>
        </Link>
      </div>
      <h2 className="text-center font-medium text-lg">Or,</h2>
      <div className="flex flex-row-reverse gap-3 justify-center items-center">
        <Button 
        onClick={() => handleGitSignIn()}
        variant="tertiary"
        className={'w-full'}
        >
            <Icon icon="mdi:github" />
        Sign in with GitHub
        </Button>
        <Button onClick={() => handleGoogleSignIn()} className="w-full" variant="tertiary">
        <Icon icon="devicon:google" />
        Sign in with Google
      </Button>
      </div>
    </Form>
        </div>
    );
};

export default SignInPage;