"use client";

import Link from "next/link";
import { extractHashtags } from "./utils-functions-server";

export const includeHashTags = (text: string) => {
  if (!text) {
    return "";
  }
  const hashTags = extractHashtags(text, 0);
  const splittedMessage = text.split(/\s+/);
  const mappedMessage = splittedMessage.map((message) => {
    if (hashTags.includes(message)) {
      return (
        <Link
          key={message}
          className=" text-cyan-800 "
          href={`/explore/search/keyword/?q=${message.slice(1)}`}
        >{`${message} `}</Link>
      );
    }
    return message + " ";
  });
  return mappedMessage;
};
