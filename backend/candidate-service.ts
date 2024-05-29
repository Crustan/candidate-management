import {Candidate} from "../types/candidate";

export class CandidateService {
  constructor() {
    if (!process.env.DB_HOST) {
      throw new Error("DB_HOST is not set");
    }
    this.dbUrl = process.env.DB_HOST;
  }
  private dbUrl: string;

  private isCandidate(candidate: unknown): candidate is Candidate {
    return (typeof candidate === "object" &&
      candidate !== null &&
      "id" in candidate &&
      "name" in candidate &&
      "age" in candidate &&
      "email" in candidate &&
      "address" in candidate &&
      "status" in candidate &&
      candidate.id &&
      candidate.name &&
      candidate.age &&
      candidate.email &&
      candidate.address &&
      candidate.status) as boolean;
  }

  private searchCandidate(candidate: Candidate, q: string): boolean {
    if (!q) {
      return true;
    }
    return candidate.name?.includes(q) || candidate.email?.includes(q);
  }

  private mapCandidate(candidate: unknown): Candidate {
    if (!this.isCandidate(candidate)) {
      console.log("Invalid candidate data in database");
      throw new Error("Invalid candidate data in database");
    }
    return {
      id: candidate.id ?? "MISSING_ID",
      name: candidate.name ?? "MISSING_NAME",
      age: candidate.age ?? 0,
      email: candidate.email ?? "MISSING_EMAIL",
      address: candidate.address,
      status: candidate.status ?? "contact",
    };
  }

  public async getCandidates(q: string): Promise<Candidate[]> {
    const res = await fetch(this.dbUrl);

    if (!res.ok) {
      throw new Error("Error fetching candidates");
    }

    const candidatesData = await res.json();

    return candidatesData
      .map((c: unknown) => this.mapCandidate(c))
      .filter((c: Candidate) => this.searchCandidate(c, q));
  }

  public async addCandidate(candidate: Omit<Candidate, "id">): Promise<Candidate> {
    const res = await fetch(this.dbUrl, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(candidate),
    });

    if (!res.ok) {
      throw new Error("Error adding candidate");
    }

    const candidateData = await res.json();

    return this.mapCandidate(candidateData);
  }

  public async getCandidate(id: string): Promise<Candidate> {
    const res = await fetch(this.dbUrl + "/" + id);

    if (!res.ok) {
      throw new Error("Error fetching candidate");
    }

    const candidateData = await res.json();

    return this.mapCandidate(candidateData);
  }

  public async updateCandidate(id: string, candidate: Candidate): Promise<Candidate> {
    const res = await fetch(this.dbUrl + "/" + id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(candidate),
    });

    if (!res.ok) {
      throw new Error("Error updating candidate");
    }

    const candidateData = await res.json();

    return this.mapCandidate(candidateData);
  }

  public async updateCandidateStatus(
    id: Candidate["id"],
    status: Candidate["status"]
  ): Promise<Candidate> {
    const res = await fetch(this.dbUrl + "/" + id, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({status}),
    });

    if (!res.ok) {
      throw new Error("Error updating candidate status");
    }

    const candidateData = await res.json();

    return this.mapCandidate(candidateData);
  }

  public async deleteCandidate(id: Candidate["id"]): Promise<void> {
    const res = await fetch(this.dbUrl + "/" + id, {method: "DELETE"});
    if (!res.ok) {
      throw new Error("Error deleting candidate");
    }
  }
}
