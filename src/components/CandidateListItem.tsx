import {Candidate} from "../../types/candidate";

interface CandidateListItemProps extends Candidate {
  onClick: (id: Candidate["id"]) => void;
}

export function CandidateListItem({onClick, ...candidate}: CandidateListItemProps) {
  function handleClick() {
    return onClick(candidate.id);
  }

  return (
    <article role="button" className="candidate-item" onClick={handleClick}>
      <span className="candidate-item__name">
        {candidate.name} ({candidate.age})
      </span>
      <span className="candidate-item__email">{candidate.email}</span>
      <span className="candidate-item__status" data-status={candidate.status}>
        {candidate.status}
      </span>
      {candidate.address ? (
        <p className="candidate-item__address">
          {candidate.address.street}
          {candidate.address.postalCode} {candidate.address.city}
          {candidate.address.country}
        </p>
      ) : null}
    </article>
  );
}
