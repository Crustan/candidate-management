import {useForm} from "react-hook-form";
import {Candidate, Status} from "../../../types/candidate";
import {capitalizeFirstLetter} from "../../utils/capitalize";
import "./CandidateForm.module.css";

interface CandidateFormProps {
  onSubmit: ((candidate: Candidate) => void) | ((candidate: Omit<Candidate, "id">) => void);
  onDelete?: (id: Candidate["id"]) => void;
  candidate?: Candidate;
}

export function CandidateForm({onSubmit, candidate, onDelete}: CandidateFormProps) {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Candidate>(candidate ? {defaultValues: candidate} : undefined);

  function handleDelete() {
    if (!candidate || !onDelete) return;
    onDelete(candidate.id);
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <label>
        Name {errors.name && <span className="error">This field is required</span>}
        <input type="text" {...register("name", {required: true})} />
      </label>
      <label>
        Age {errors.age && <span className="error">This field is required</span>}
        <input type="text" inputMode="numeric" {...register("age", {required: true})} />
      </label>
      <label>
        Email {errors.email && <span className="error">This field is required</span>}
        <input type="email" {...register("email", {required: true})} />
      </label>

      <label>
        Street (optional)
        <input type="text" {...register("address.street")} />
      </label>
      <label>
        Postal Code (optional)
        <input type="text" {...register("address.postalCode")} />
      </label>
      <label>
        City (optional)
        <input type="text" {...register("address.city")} />
      </label>
      <label>
        Country (optional)
        <input type="text" {...register("address.country")} />
      </label>
      <label>
        Status
        <select {...register("status")} defaultValue={Status.contact}>
          {Object.keys(Status).map((status) => (
            <option key={status} value={status}>
              {capitalizeFirstLetter(status)}
            </option>
          ))}
        </select>
      </label>
      <footer>
        {candidate ? (
          <button type="button" className="button secondary" onClick={handleDelete}>
            Delete candidate
          </button>
        ) : null}

        <button type="submit" className="button primary">
          {candidate ? "Edit candidate" : "Add candidate"}
        </button>
      </footer>
    </form>
  );
}
