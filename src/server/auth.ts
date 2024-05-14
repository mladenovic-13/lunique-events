import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { DEFAULT_USER_AVATAR } from "@/config";
import { env } from "@/env.mjs";
import { paths } from "@/routes/paths";
import { db } from "@/server/db";

import { sendVerificationRequest } from "./send-verification-email";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

const PrismaDBAdapter = PrismaAdapter(db);

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: {
    ...PrismaDBAdapter,
    createUser: async (user) => {
      const createdUser = await PrismaDBAdapter.createUser!({
        ...user,
        image: DEFAULT_USER_AVATAR,
      });

      await db.organization.create({
        data: {
          isPersonal: true,
          name: "Personal",
          owner: {
            connect: {
              id: createdUser.id,
            },
          },
        },
      });

      return createdUser;
    },
  },
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  pages: {
    signIn: paths.signin.root,
    newUser: paths.signin.welcome,
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
