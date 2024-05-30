import {Candidate, Status} from "../../types/candidate";
import {CandidateListItem} from "./CandidateListItem/CandidateListItem";

interface CandidateListProps {
  candidates: Candidate[];
  onCandidateClick: (id: Candidate["id"]) => void;
}

function sortOnStatus(a: Candidate, b: Candidate) {
  const statusOrder = Object.values(Status);

  if (statusOrder.indexOf(a.status) < statusOrder.indexOf(b.status)) {
    return -1;
  } else if (statusOrder.indexOf(a.status) > statusOrder.indexOf(b.status)) {
    return 1;
  }
  return 0;
}

export function CandidateList({candidates, onCandidateClick}: CandidateListProps) {
  if (candidates.length === 0) {
    return <p className="empty-message">No candidates found. Add a new candidate</p>;
  }
  
  return (
    <ul className="list">
      {candidates.sort(sortOnStatus).map((candidate) => (
        <li key={candidate.id}>
          <CandidateListItem {...candidate} onClick={onCandidateClick} />
        </li>
      ))}
    </ul>
  );
}
