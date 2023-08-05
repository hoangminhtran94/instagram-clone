"use server";

import { prisma } from "./prisma";

import { redirect } from "next/navigation";

export const createNewPost = async (req: Request) => {
  const data = await req.formData();
};
