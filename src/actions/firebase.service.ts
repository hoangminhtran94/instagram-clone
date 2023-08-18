import { getAPostRecordById, createAPostRecord } from "@/repository/firebase";
export const getPostRecord = async (id: string) => {
  try {
    const postRecords = await getAPostRecordById(id);
    return postRecords;
  } catch (error) {
    throw error;
  }
};

export const createPostRecord = async (id: string) => {
  try {
    return await createAPostRecord(id);
  } catch (error) {
    throw error;
  }
};
