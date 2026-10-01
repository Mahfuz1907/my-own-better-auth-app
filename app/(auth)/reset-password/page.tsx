"use client";
import { resetPassword } from "@/app/lib/auth-client";
import {Eye, EyeSlash, Check} from "@gravity-ui/icons";
import {Button, Description, Form, Label, TextField, InputGroup} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import {useState} from "react";
import React from 'react';

const ResetPasswordPage = () => {

    const [isVisible, setIsVisible] = useState(false);
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as Record<string, string>;
    
    console.log('After giving the new password', userData)

    if (!token) {
        console.log('Invalid or missing token')
        return
    }

    const { data, error } = await resetPassword({
        newPassword: userData.password,
        token
    });

    console.log('After new password reset', data, error)
  };


    return (
        <div className="mx-auto my-20">
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField 
      isRequired
      minLength={8}
      className="w-96" 
      name="password"
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
          className="w-96"
          type={isVisible ? "text" : "password"}
          placeholder="Enter new password"
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
      </div>
    </Form>
        </div>
    );
};

export default ResetPasswordPage;