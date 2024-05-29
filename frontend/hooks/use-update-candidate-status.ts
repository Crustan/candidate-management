import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../api";
import {Candidate} from "../../types/candidate";

export function useUpdateCandidateStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, status}: Pick<Candidate, "id" | "status">) =>
      api.updateCandidateStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["candidates"]}),
  });
}
