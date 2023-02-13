import diagnoses from "../../data/diagnosesEntries";
import { Diagnosis } from "../types";

const getAll = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getAll
};