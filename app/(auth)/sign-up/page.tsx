"use client";
import { signIn, signUp } from "@/app/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  InputGroup
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { useState } from 'react';

const SignUpPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as Record<string, string>;
    
    console.log('After sign up', userData)

    const { data, error } = await signUp.email({
        name: userData.name, 
        email: userData.email, 
        password: userData.password,
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
            <h2 className="text-center font-bold text-2xl">Sign up page</h2>
            <Form className="flex flex-col gap-4 w-96 my-10" onSubmit={onSubmit}>
      <Fieldset>
        <FieldGroup>
          <TextField
            isRequired
            name="name"
            type="text"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
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
        </FieldGroup>
        <Fieldset.Actions className="flex flex-col gap-3 justify-center items-center">
          <div className="flex gap-2 justify-center items-center">
        <Button type="submit" className='bg-green-600'>
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary" className='text-green-600'>
          Reset
        </Button>
      </div>
      <h2 className="text-center font-medium text-lg">Or,</h2>
            <div className="flex flex-row-reverse gap-3 justify-center items-center">
              <Button 
              onClick={() => handleGitSignIn()}
              variant="tertiary"
              className={'w-full'}
              >
                  <Icon icon="mdi:github" />
              Sign up with GitHub
              </Button>
              <Button onClick={() => handleGoogleSignIn()} className="w-full" variant="tertiary">
              <Icon icon="devicon:google" />
              Sign up with Google
            </Button>
            </div>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
        </div>
    );
};

export default SignUpPage;