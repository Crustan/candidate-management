import {Candidate} from "../../types/candidate";

interface CandidateListItemProps extends Candidate {}

export function CandidateListItem({...candidate}: CandidateListItemProps) {
  return (
    <article className="candidate-item">
      <span className="candidate-item__name">
        {candidate.name} ({candidate.age})
      </span>
      <span className="candidate-item__email">{candidate.email}</span>
      <span className="candidate-item__status" data-status={candidate.status}>
        {candidate.status}
      </span>
      {candidate.address ? (
        <address className="candidate-item__address">
          {candidate.address.street}, {candidate.address.postalCode} {candidate.address.city},{" "}
          {candidate.address.country}
        </address>
      ) : null}
    </article>
  );
}
