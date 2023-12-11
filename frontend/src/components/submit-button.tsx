"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Enviando..." : "Enviar"}
    </Button>
  );
};

export default SubmitButton;
