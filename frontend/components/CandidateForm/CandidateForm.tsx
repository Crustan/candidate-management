import {useForm} from "react-hook-form";
import {Candidate, Status} from "../../../types/candidate";
import {capitalizeFirstLetter} from "../../utils/capitalize";
import css from "./CandidateForm.module.css";
import {useEffect} from "react";

interface CandidateFormProps {
  onSubmit: ((candidate: Candidate) => void) | ((candidate: Omit<Candidate, "id">) => void);
  onDelete?: (id: Candidate["id"]) => void;
  candidate?: Candidate;
}

export function CandidateForm({onSubmit, candidate, onDelete}: CandidateFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<Candidate>(candidate ? {defaultValues: candidate} : undefined);

  useEffect(() => {
    if (!candidate) reset();
  }, [candidate, reset]);

  function handleDelete() {
    if (!candidate || !onDelete) return;
    onDelete(candidate.id);
  }

  return (
    <form className={css.form} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <label>
        Name {errors.name && <span className={css.error}>This field is required</span>}
        <input type="text" {...register("name", {required: true})} />
      </label>
      <label>
        Age {errors.age && <span className={css.error}>This field is required</span>}
        <input type="text" inputMode="numeric" {...register("age", {required: true})} />
      </label>
      <label>
        Email {errors.email && <span className={css.error}>This field is required</span>}
        <input type="email" {...register("email", {required: true})} />
      </label>

      <label>
        Street
        <input type="text" {...register("address.street")} />
      </label>
      <label>
        Postal Code
        <input type="text" {...register("address.postalCode")} />
      </label>
      <label>
        City
        <input type="text" {...register("address.city")} />
      </label>
      <label>
        Country
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
