"use client";
import { updateUser } from "@/app/lib/auth-client";
import {FloppyDisk} from "@gravity-ui/icons";
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
} from "@heroui/react";
import React from 'react';

const UpdateProfile = () => {

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries()) as Record<string, string>;
    
        const { data, error } = await updateUser({
            name: userData.name,
        });
    
        console.log('After Update name', data, error)
      };

    return (
        <div className="mx-auto my-20">
                    <Form className="w-96" onSubmit={onSubmit}>
              <Fieldset>
                <Fieldset.Legend className="text-center font-bold text-2xl">Profile Settings</Fieldset.Legend>
                <Description className="text-center text-lg">Update your profile information.</Description>
                <FieldGroup>
                  <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                      if (value.length < 3) {
                        return "Name must be at least 3 characters";
                      }
                      return null;
                    }}
                  >
                    <Label>Name</Label>
                    <Input placeholder="Update your name" />
                    <FieldError />
                  </TextField>
                </FieldGroup>
                <Fieldset.Actions className="flex justify-center items-center gap-3">
                  <Button type="submit" className={'bg-green-600'} >
                    <FloppyDisk />
                    Save changes
                  </Button>
                  <Button type="reset" variant="secondary" className={'text-green-600'}>
                    Cancel
                  </Button>
                </Fieldset.Actions>
              </Fieldset>
            </Form>
                </div>
    );
};

export default UpdateProfile;