import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';

const client = new MongoClient(process.env.MONGO_DB_URL!);
const db = client.db('my-own-auth-user');
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),

  emailAndPassword: { 
    enabled: true,
    sendResetPassword: async({ user, url }) => {
      void resend.emails.send({
        from: 'Acme <my-own-better-auth-app@resend.dev>',
        to: user.email,
        subject: 'Reset your password',
        html: `Click <a href="${url}">here</a> to reset your password.`,
      });
    },
  }, 


  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async({ user, url }) => {
      void resend.emails.send({
        from: 'Acme <my-own-better-auth-app@resend.dev>',
        to: user.email,
        subject: 'Verify your email address',
        html: `Click <a href="${url}">here</a> to verify your email.`,
      });
    },
  },

  socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});