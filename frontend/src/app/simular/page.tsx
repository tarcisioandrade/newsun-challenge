import { createLead } from "@/actions/form";
import MainForm from "@/components/main-form";
import React from "react";

const SimularPage = () => {
  return (
    <div className="grid h-screen place-content-center">
      <MainForm formAction={createLead} />
    </div>
  );
};

export default SimularPage;
