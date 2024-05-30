import {useEffect, useState} from "react";
import {useDebouncedValue} from "../hooks/use-debounced-value";
import {useGetCandidates} from "../hooks/use-get-candidates";
import {CandidateList} from "./CandidateList";
import {useCreateCandidate} from "../hooks/use-create-candidate";
import {CandidateForm} from "./CandidateForm/CandidateForm";
import {Candidate} from "../../types/candidate";
import {Dialog} from "./Dialog/Dialog";
import {useGetCandidate} from "../hooks/use-get-candidate";
import {useUpdateCandidate} from "../hooks/use-update-candidate";
import {useDeleteCandidate} from "../hooks/use-delete-candidate";
import {ThemeToggle} from "./ThemeToggle/ThemeToggle";
import {SearchInput} from "./SearchInput";
import {SearchBar} from "./SearchBar/SearchBar";

function App() {
  const [q, setQ] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const debouncedQuery = useDebouncedValue(q, 300);
  const {
    isPending: isCandidatesListLoading,
    error: candidatesListError,
    data: candidates,
  } = useGetCandidates(debouncedQuery);
  const {isFetching: isCandidateLoading, data: candidate} = useGetCandidate(candidateId);
  const {mutate: createCandidate, isSuccess: createCandidateSuccess} = useCreateCandidate();
  const {mutate: updateCandidate, isSuccess: updateCandidateSuccess} = useUpdateCandidate();
  const {mutate: deleteCandidate, isSuccess: deleteCandidateSuccess} = useDeleteCandidate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (createCandidateSuccess || updateCandidateSuccess || deleteCandidateSuccess) {
      setIsDialogOpen(false);
    }
  }, [createCandidateSuccess, updateCandidateSuccess, deleteCandidateSuccess]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQ(e.target.value);
  }

  function handleOnAddCandidateClick() {
    setCandidateId("");
    setIsDialogOpen(true);
  }

  function handleOnCandidateClick(id: Candidate["id"]) {
    setCandidateId(id);
    setIsDialogOpen(true);
  }

  return (
    <div className="app-wrapper">
      <ThemeToggle />
      <main>
        <h1 className="heading-1">Candidate management</h1>

        <SearchBar>
          <SearchInput value={q} onChange={handleSearchChange} />
          <button className="button primary" onClick={handleOnAddCandidateClick}>
            Add new candidate
          </button>
        </SearchBar>

        {isCandidatesListLoading ? <p>Searching...</p> : null}

        {candidates ? (
          <CandidateList candidates={candidates} onCandidateClick={handleOnCandidateClick} />
        ) : null}
        {candidatesListError ? <p>Error: {candidatesListError.message}</p> : null}
      </main>
      <Dialog isOpen={isDialogOpen} onCancel={() => setIsDialogOpen(false)}>
        {isCandidateLoading ? null : (
          <CandidateForm
            key={candidate?.id}
            onSubmit={candidate ? updateCandidate : createCandidate}
            onDelete={candidate ? deleteCandidate : undefined}
            candidate={candidate}
          />
        )}
      </Dialog>
    </div>
  );
}

export default App;
