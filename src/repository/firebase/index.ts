import { fireStore } from "@/firebase.config";
import { Timestamp } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

const NEWPOST_RECORD = {
  like_count: 0,
  comment_count: 0,
  updated_at: Timestamp.now(),
};
export interface PostRecord {
  like_count: number;
  comment_count: number;
  updated_date: Timestamp;
}
export const postRef = (id: string) => {
  return doc(fireStore, "Posts", id);
};

export const getAPostRecordById = async (id: string) => {
  try {
    return await getDoc(postRef(id));
  } catch (error) {
    throw error;
  }
};

export const createAPostRecord = async (id: string) => {
  try {
    return await setDoc(
      postRef(id),
      { ...NEWPOST_RECORD, updated_date: Timestamp.now() },
      { merge: true }
    );
  } catch (error) {
    throw error;
  }
};

export const changeLikeCount = async (id: string, counter: 1 | -1) => {
  try {
    const postRecord = await getAPostRecordById(id);
    const recordData = postRecord.data() as unknown as PostRecord;

    return await updateDoc(postRef(id), {
      like_count: recordData.like_count + counter,
      updated_at: Timestamp.now(),
    });
  } catch (error) {
    throw error;
  }
};

export const changeCommentCount = async (id: string, counter: 1 | -1) => {
  try {
    const postRecord = await getAPostRecordById(id);
    const recordData = postRecord.data() as unknown as PostRecord;

    return await updateDoc(postRef(id), {
      comment_count: recordData.like_count + counter,
      updated_at: Timestamp.now(),
    });
  } catch (error) {
    throw error;
  }
};

export const deletePostRecord = async (id: string) => {
  try {
    return await deleteDoc(postRef(id));
  } catch (error) {
    throw error;
  }
};
