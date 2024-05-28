import {QueryProvider} from "./contexts/query-provider";

function App() {
  return (
    <QueryProvider>
      <div className="app-wrapper">
        <h1 className="heading-1">Candidate management</h1>
      </div>
    </QueryProvider>
  );
}

export default App;
