"use server";
import {
  getAPostRecordById,
  createAPostRecord,
  changeLikeCount,
  changeCommentCount,
} from "@/repository/firebase";
export const onGetPostRecord = async (postId: string) => {
  try {
    const postRecords = await getAPostRecordById(postId);
    return postRecords;
  } catch (error) {
    throw error;
  }
};

export const createPostRecordHandler = async (postId: string) => {
  try {
    return await createAPostRecord(postId);
  } catch (error) {
    throw error;
  }
};

export const changeLikeCountHandler = async (
  postId: string,
  counter: 1 | -1
) => {
  try {
    return await changeLikeCount(postId, counter);
  } catch (error) {
    throw error;
  }
};
export const changeCommentCountHandler = async (
  postId: string,
  counter: 1 | -1
) => {
  try {
    return await changeCommentCount(postId, counter);
  } catch (error) {
    throw error;
  }
};
