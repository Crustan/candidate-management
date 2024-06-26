import {useQuery} from "@tanstack/react-query";
import {api} from "../api";

export function useGetCandidates(q?: string) {
  return useQuery({
    queryKey: ["candidates", q],
    queryFn: () => api.getCandidates(q),
  });
}
