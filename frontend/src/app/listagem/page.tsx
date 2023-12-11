import { Input } from "@/components/ui/input";
import React from "react";

const ListagemPage = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex gap-4">
        <select name="" id="">
          <option value="">Email</option>
          <option value="">nome</option>
          <option value="">codigo da unidade</option>
        </select>
        <Input type="search" placeholder="Pesquisar" />
      </div>
    </div>
  );
};

export default ListagemPage;
