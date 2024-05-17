import React from "react";
import { FileSpreadsheetIcon } from "lucide-react";

import { Label } from "../../ui/label";

interface ImportCSVProps {
  prop?: string;
}
export const ImportCSV = ({}: ImportCSVProps) => {
  return (
    <section
      className="flex flex-col  gap-4 pt-2"
      onClick={() => alert("@TODO")}
    >
      <Label className="font-semibold capitalize">Import CSV</Label>
      <div className="flex h-48 w-full flex-col items-center justify-center gap-6 rounded-lg border border-dashed border-accent-foreground/20 bg-muted transition-all hover:cursor-pointer hover:bg-accent-foreground/20">
        <FileSpreadsheetIcon size={32} className="text-accent-foreground/90" />
        <div className="flex flex-col items-center">
          <p className="text-base font-semibold text-accent-foreground">
            Import CSV File
          </p>
          <p className="text-sm font-light text-accent-foreground/80">
            Drop file or click here to chose file.
          </p>
        </div>
      </div>
    </section>
  );
};
