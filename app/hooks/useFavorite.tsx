import axios from "axios";
import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import { useLoginModal } from ".";
import { MouseEvent, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

export interface IUserFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

export default function useFavorite({ listingId, currentUser }: IUserFavorite) {
  const router = useRouter();
  const loginModal = useLoginModal();
  
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds ?? [];

    return list.includes(listingId);
  }, [currentUser?.favoriteIds, listingId]);
  const toggleFavorite = useCallback(async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) return loginModal.onOpen();
    try {
      let request;
      if (isFavorite) request = () => axios.delete(`/api/favorites/${listingId}`);
      else request = () => axios.post(`/api/favorites/${listingId}`);
      await request();
      router.refresh();
      toast.success('Success');
    } catch (err) {
      toast.error("Something went wrong");
    }
  }, [currentUser, isFavorite, listingId, loginModal, router]);

  return {
    isFavorite,
    toggleFavorite,
  }
}