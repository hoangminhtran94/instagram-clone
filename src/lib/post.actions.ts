"use server";

import { prisma } from "./prisma";
import { checkAuth } from "./auth.middleware";
import { redirect } from "next/navigation";

export const createNewPost = async (req: Request) => {
  const data = await req.formData();
};
