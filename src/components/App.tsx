import {useState} from "react";
import {useDebouncedValue} from "../hooks/use-debounced-value";
import {useGetCandidates} from "../hooks/use-get-candidates";
import {CandidateList} from "./CandidateList";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({value, onChange}: SearchInputProps) {
  return <input type="search" placeholder="Search candidates" value={value} onChange={onChange} />;
}

function App() {
  const [q, setQ] = useState("");
  const debouncedQuery = useDebouncedValue(q, 300);
  const {isPending, error, data: candidates} = useGetCandidates(debouncedQuery);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQ(e.target.value);
  }

  return (
    <div className="app-wrapper">
      <h1 className="heading-1">Candidate management</h1>
      <SearchInput value={q} onChange={handleSearchChange} />
      {isPending ? <p>Searching...</p> : null}

      {candidates ? <CandidateList candidates={candidates} /> : null}
      {error ? <p>Error: {error.message}</p> : null}
    </div>
  );
}

export default App;
