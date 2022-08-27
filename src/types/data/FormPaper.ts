import { WithChildren } from "../data/WithChildren";
import { EditMode } from "./EditProps";

export type FormPaper = {
  onCreateOrUpdate?: () => void
  resource: string;
  context: EditMode;
  data: any;
} & WithChildren;
