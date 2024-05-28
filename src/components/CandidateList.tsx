import {Candidate} from "../../types/candidate";
import {CandidateListItem} from "./CandidateListItem";

interface CandidateListProps {
  candidates: Candidate[];
}

export function CandidateList({candidates}: CandidateListProps) {
  return (
    <ul>
      {candidates.map((candidate) => (
        <li key={candidate.id}>
          <CandidateListItem {...candidate} />
        </li>
      ))}
    </ul>
  );
}
