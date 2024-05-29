import express from "express";
import {CandidateService} from "./candidate-service";
import {Candidate, Status} from "../types/candidate";

const PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 3001;

const app = express();
const candidateService = new CandidateService();

app.use(express.json());

app.get("/candidates", async (req, res) => {
  const {q} = req.query;
  const candidates: Candidate[] = await candidateService.getCandidates(q as string);
  res.json(candidates);
});

app.get("/candidates/:id", async (req, res) => {
  const id = req.params.id;
  const candidate: Candidate = await candidateService.getCandidate(id);

  if (!candidate) {
    res.sendStatus(404);
    return;
  }

  res.json(candidate);
});

app.post("/candidates", async (req, res) => {
  try {
    const candidateDraft: Omit<Candidate, "id"> = req.body;
    // TODO: Validate candidateDraft
    const candidate: Candidate = await candidateService.addCandidate(candidateDraft);
    res.status(201).json(candidate);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    } else {
      res.sendStatus(500);
    }
  }
});

app.put("/candidates/:id", async (req, res) => {
  const id = req.params.id;
  const candidateDraft: Candidate = req.body;
  // TODO: Validate candidateDraft
  const candidate: Candidate = await candidateService.updateCandidate(id, candidateDraft);
  res.json(candidate);
});

app.patch("/candidates/:id", async (req, res) => {
  const id = req.params.id;
  const {status}: Pick<Candidate, "status"> = req.body;
  if (Object.keys(Status).includes(status) === false) {
    res.status(400).send("Invalid status");
    return;
  }

  const candidate: Candidate = await candidateService.updateCandidateStatus(id, status);
  res.json(candidate);
});

app.delete("/candidates/:id", async (req, res) => {
  const id = req.params.id;
  await candidateService.deleteCandidate(id);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
