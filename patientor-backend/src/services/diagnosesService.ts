import diagnoses from "../../data/diagnosesEntries";
import { Diagnose } from "../types";

const getAll = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getAll
};