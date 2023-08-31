"use client";
import { FC, useRef, useState, useEffect, Fragment } from "react";
import Post from "../PostComponents/Post";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import Spinner from "../UI/Spinner/Spinner";
import { useInView } from "framer-motion";
const Posts: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const atBottom = useInView(ref);
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["home-page-posts"],
      queryFn: async ({ signal, pageParam = 1 }) => {
        console.log(pageParam);
        try {
          const response = await fetch(`/api/post?page=${pageParam}`, {
            signal,
          });
          return await response.json();
        } catch (error) {
          throw error;
        }
      },

      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) {
          return;
        }
        return allPages.length + 1;
      },
    });
  useEffect(() => {
    if (atBottom && !isLoading) {
      fetchNextPage();
      // queryClient.invalidateQueries({ queryKey: ["home-page-posts"] });
    }
  }, [atBottom]);

  return (
    <div className="w-[470px] mx-auto flex flex-col gap-5">
      {data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.map((id: string) => {
            return <Post id={id} key={id} />;
          })}
        </Fragment>
      ))}
      {isFetching && (
        <div className="h-[300px]">
          <Spinner />{" "}
        </div>
      )}
      <div ref={ref} />
    </div>
  );
};
export default Posts;
