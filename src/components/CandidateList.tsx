import {Candidate} from "../../types/candidate";

interface CandidateListProps {
  candidates: Candidate[];
}

export function CandidateList({candidates}: CandidateListProps) {
  return (
    <ul>
      {candidates.map((candidate) => (
        <li key={candidate.id}>{candidate.name}</li>
      ))}
    </ul>
  );
}
