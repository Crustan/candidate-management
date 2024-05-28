import {useQuery} from "@tanstack/react-query";
import {api} from "../api";

export function useGetCandidate(id: string) {
  return useQuery({
    queryKey: ["candidate"],
    queryFn: () => api.getCandidate(id),
  });
}
