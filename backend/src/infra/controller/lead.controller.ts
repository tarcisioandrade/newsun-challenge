import { Request, Response } from "express";
import { Create } from "@/application/use-cases/lead/create";
import { LeadPrismaRepository } from "../repository/lead-prisma-repository";
import { UnidadePrismaRepository } from "../repository/unidade-prisma-repository";
import { EntityError } from "@/domain/shared/entity-error";
import { GetByEmail } from "@/application/use-cases/lead/get-by-email";
import { GetById } from "@/application/use-cases/lead/get-by-id";
import { LeadDTO } from "../dto/leadDTO";
import { GetAllLeadWithFilter } from "@/application/use-cases/lead/get-all-lead-with-filter";
import { GetAllLead } from "@/application/use-cases/lead/get-all-lead";
import { Lead } from "@/domain/entities/lead";

const leadRepo = new LeadPrismaRepository();
const unidadeRepo = new UnidadePrismaRepository();

const createLeadUseCase = new Create(leadRepo, unidadeRepo);
const getLeadByEmail = new GetByEmail(leadRepo);
const getLeadById = new GetById(leadRepo);
const getAllLeadWithFilter = new GetAllLeadWithFilter(leadRepo);
const getAllLead = new GetAllLead(leadRepo);

export async function createLead(req: Request, res: Response) {
  try {
    let lead = req.body;

    if (!lead.nomeCompleto || !lead.email || !lead.telefone || !lead.unidades) {
      res.status(500).json({
        success: false,
        message: "Por favor, envie todos os campos necessários.",
      });
      return;
    }

    const leadInput = new LeadDTO(lead);

    const alreadyExists = await getLeadByEmail.execute(leadInput.email);

    if (alreadyExists) {
      res
        .status(400)
        .json({ success: false, message: "Este e-mail já existe." });
      return;
    }

    const newLead = await createLeadUseCase.execute(leadInput);

    res.status(200).json({ success: true, lead: newLead.toObject() });
  } catch (error: any) {
    if (error instanceof EntityError) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function leadById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const lead = await getLeadById.execute(id);

    if (!lead) {
      res.status(404).json({ success: false, message: "Lead não encontrado." });
      return;
    }

    res.status(200).json({ success: true, lead: lead.toObject() });
  } catch (error: any) {
    if (error instanceof EntityError) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function leadListFilter(req: Request, res: Response) {
  const filter = req.query.filter;
  let leads: Lead[] = [];

  if (filter) {
    leads = await getAllLeadWithFilter.execute(String(filter));
  } else {
    leads = await getAllLead.execute();
  }

  res
    .status(200)
    .json({ succes: true, leads: leads.map((lead) => lead.toObject()) });
}
