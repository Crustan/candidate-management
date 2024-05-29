import {Candidate} from "../../types/candidate";
import {CandidateListItem} from "./CandidateListItem";

interface CandidateListProps {
  candidates: Candidate[];
  onCandidateClick: (id: Candidate["id"]) => void;
}

export function CandidateList({candidates, onCandidateClick}: CandidateListProps) {
  return (
    <ul>
      {candidates.map((candidate) => (
        <li key={candidate.id}>
          <CandidateListItem {...candidate} onClick={onCandidateClick} />
        </li>
      ))}
    </ul>
  );
}
