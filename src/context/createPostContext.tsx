import { applyFilterToCanvas } from "@/lib/imageFilter";
import { Location } from "@prisma/client";
import {
  FC,
  ReactNode,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
  useEffect,
  useCallback,
} from "react";

interface NewPostContextState {
  imageFiles: File[];
  croppedImages: HTMLCanvasElement[];
  filteredImages: { img: string; alt: string }[];
  content: string;
  location: { lat?: number; long?: number; address: string } | null;
  setImageFiles: Dispatch<SetStateAction<File[]>>;
  setCroppedImages: Dispatch<SetStateAction<HTMLCanvasElement[]>>;
  setFilteredImages: Dispatch<SetStateAction<{ img: string; alt: string }[]>>;
  setContent: Dispatch<SetStateAction<string>>;
  setLocation: Dispatch<
    SetStateAction<{
      lat?: number;
      long?: number;
      address: string;
    } | null>
  >;
  saveCroppedImages: () => void;
  hideLikeView: boolean;
  turnOffComment: boolean;
  setHideLikeView: Dispatch<SetStateAction<boolean>>;
  setTurnOffComment: Dispatch<SetStateAction<boolean>>;
}

const NewPostContext = createContext<NewPostContextState>({
  imageFiles: [],
  croppedImages: [],
  filteredImages: [],
  setImageFiles: () => {},
  setCroppedImages: () => {},
  setFilteredImages: () => {},
  setHideLikeView: () => {},
  setTurnOffComment: () => {},
  saveCroppedImages: () => {},
  setLocation: () => {},
  setContent: () => {},
  content: "",
  location: null,
  hideLikeView: false,
  turnOffComment: false,
});

export const useCreatePostContext = () => useContext(NewPostContext);

const NewPostContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [croppedImages, setCroppedImages] = useState<HTMLCanvasElement[]>([]);
  const DEFAULT_FILTER = "blur(0px)";
  const [filteredImages, setFilteredImages] = useState<
    { img: string; alt: string }[]
  >([]);
  const [content, setContent] = useState<string>("");
  const [location, setLocation] = useState<{
    lat?: number;
    long?: number;
    address: string;
  } | null>(null);
  const [hideLikeView, setHideLikeView] = useState<boolean>(false);
  const [turnOffComment, setTurnOffComment] = useState<boolean>(false);

  const saveCroppedImages = useCallback(
    (filter: string) => {
      const results: { img: string; alt: string }[] = [];
      croppedImages.forEach((canvas) => {
        results.push({
          img: applyFilterToCanvas(canvas, filter).toDataURL(),
          alt: "",
        });
      });
      setFilteredImages(results);
    },
    [croppedImages]
  );

  useEffect(() => {
    setCroppedImages(new Array(imageFiles.length));
    setFilteredImages(new Array(imageFiles.length));
  }, [imageFiles]);

  return (
    <NewPostContext.Provider
      value={{
        saveCroppedImages: () => {
          saveCroppedImages(DEFAULT_FILTER);
        },
        hideLikeView,
        setHideLikeView,
        turnOffComment,
        setTurnOffComment,
        location,
        setLocation,
        content,
        setImageFiles,
        setContent,
        imageFiles,
        croppedImages,
        filteredImages,
        setCroppedImages,
        setFilteredImages,
      }}
    >
      {children}
    </NewPostContext.Provider>
  );
};
export default NewPostContextProvider;
