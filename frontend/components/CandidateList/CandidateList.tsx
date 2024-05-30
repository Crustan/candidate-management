import {Candidate, Status} from "../../../types/candidate";
import {CandidateListItem} from "../CandidateListItem/CandidateListItem";
import css from "./CandidateList.module.css";

interface CandidateListProps {
  candidates: Candidate[];
  onCandidateClick: (id: Candidate["id"]) => void;
}

// function sortOnStatus(a: Candidate, b: Candidate) {
//   const statusOrder = Object.values(Status);

//   if (statusOrder.indexOf(a.status) < statusOrder.indexOf(b.status)) {
//     return -1;
//   } else if (statusOrder.indexOf(a.status) > statusOrder.indexOf(b.status)) {
//     return 1;
//   }
//   return 0;
// }

function categorizeCandidates(candidates: Candidate[]) {
  return Object.keys(Status).reduce((acc, status) => {
    acc[status as keyof typeof Status] = candidates.filter(
      (candidate) => candidate.status === status
    );
    return acc;
  }, {} as Record<keyof typeof Status, Candidate[]>);

  // return candidates.sort(sortOnStatus).reduce((acc, candidate) => {
  //   if (!acc[candidate.status]) {
  //     acc[candidate.status] = [];
  //   }
  //   acc[candidate.status].push(candidate);
  //   return acc;
  // }, {} as Record<keyof typeof Status, Candidate[]>);
}

export function CandidateList({candidates, onCandidateClick}: CandidateListProps) {
  if (candidates.length === 0) {
    return <p className="empty-message">No candidates found. Add a new candidate</p>;
  }

  const categorizedCandidates = categorizeCandidates(candidates);

  return (
    <div className={css["list-grid"]}>
      {Object.entries(categorizedCandidates).map(([status, candidates]) => (
        <div key={status} className={css["column"]}>
          <h2 className={css["col-heading"]}>{status}</h2>
          <ul className={css["list"]}>
            {candidates.map((candidate) => (
              <li key={candidate.id}>
                <CandidateListItem {...candidate} onClick={onCandidateClick} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
