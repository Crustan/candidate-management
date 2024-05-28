import {Candidate} from "../types/candidate";

export const api = {
  async getCandidates(q?: string): Promise<Candidate[]> {
    const res = await fetch("/api/candidates" + (q ? `?q=${q}` : ""));

    if (!res.ok) {
      throw new Error("Error fetching candidates");
    }

    const candidatesData = await res.json();
    return candidatesData;
  },
  async getCandidate(id: string): Promise<Candidate> {
    const res = await fetch("/api/candidate/" + id);

    if (!res.ok) {
      throw new Error("Error fetching candidate");
    }

    const candidatesData = await res.json();
    return candidatesData;
  },
  async createCandidate(candidate: Omit<Candidate, "id">): Promise<Candidate> {
    const res = await fetch("/api/candidates", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(candidate),
    });

    if (!res.ok) {
      throw new Error("Error adding candidate");
    }

    return await res.json();
  },
  async updateCandidate(candidate: Candidate): Promise<Candidate> {
    const res = await fetch("/api/candidates/" + candidate.id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(candidate),
    });

    if (!res.ok) {
      throw new Error("Error updating candidate");
    }

    return await res.json();
  },
  async updateCandidateStatus(
    id: Candidate["id"],
    status: Candidate["status"]
  ): Promise<Candidate> {
    const res = await fetch("/api/candidates/" + id, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({status}),
    });

    if (!res.ok) {
      throw new Error("Error updating candidate status");
    }

    return await res.json();
  },
  async deleteCandidate(id: Candidate["id"]): Promise<void> {
    const res = await fetch("/api/candidates/" + id, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Error deleting candidate");
    }
  },
};
