import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../api";

export function useUpdateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.updateCandidate,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["candidates"]}),
  });
}
