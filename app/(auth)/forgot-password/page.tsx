"use client";
import { requestPasswordReset } from "@/app/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import React from 'react';

const ForgotPasswordPage = () => {

     const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as Record<string, string>;

    const { data, error } = await requestPasswordReset({
        email: userData.email,
        redirectTo: "/reset-password"
    });

    console.log('After giving email', data, error)
  };

    return (
        <div className="mx-auto my-20">
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
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
      <div className="flex gap-3 justify-center items-center">
        <Button type="submit" className={'bg-green-600'}>
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary" className={'text-green-600'}>
          Reset
        </Button>
      </div>
    </Form>
        </div>
    );
};

export default ForgotPasswordPage;