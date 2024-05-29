import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../api";

export function useDeleteCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteCandidate,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["candidates"]}),
  });
}
