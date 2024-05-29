import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../api";

export function useCreateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createCandidate,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["candidates"]}),
  });
}
