import {Candidate} from "../../../types/candidate";
import css from "./CandidateListItem.module.css";

interface CandidateListItemProps extends Candidate {
  onClick: (id: Candidate["id"]) => void;
}

export function CandidateListItem({onClick, ...candidate}: CandidateListItemProps) {
  function handleClick() {
    return onClick(candidate.id);
  }

  return (
    <article role="button" className={css.candidateItem} onClick={handleClick} data-theme="light">
      <span className={css.candidateName}>
        {candidate.name} ({candidate.age})
      </span>
      <span className={css.candidateEmail}>{candidate.email}</span>
      <span className={css.candidateStatus} data-status={candidate.status}>
        {candidate.status}
      </span>
      {candidate.address ? (
        <p className={css.candidateAddress}>
          {candidate.address.street} {candidate.address.postalCode} {candidate.address.city}{" "}
          {candidate.address.country}
        </p>
      ) : null}
    </article>
  );
}
