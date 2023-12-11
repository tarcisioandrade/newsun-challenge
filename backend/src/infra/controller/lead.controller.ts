import { Request, Response } from "express";
import { Create } from "@/application/use-cases/lead/create";
import { LeadPrismaRepository } from "../repository/lead-prisma-repository";
import { UnidadePrismaRepository } from "../repository/unidade-prisma-repository";
import { EntityError } from "@/domain/shared/entity-error";
import { GetByEmail } from "@/application/use-cases/lead/get-by-email";
import { GetById } from "@/application/use-cases/lead/get-by-id";
import { LeadDTO } from "../dto/leadDTO";

const leadRepo = new LeadPrismaRepository();
const unidadeRepo = new UnidadePrismaRepository();

const createLeadUseCase = new Create(leadRepo, unidadeRepo);
const getLeadByEmail = new GetByEmail(leadRepo);
const getLeadById = new GetById(leadRepo);

export async function createLead(req: Request, res: Response) {
  try {
    let lead = req.body;

    const leadInput = new LeadDTO(lead);

    if (
      !leadInput.nomeCompleto ||
      !leadInput.email ||
      !leadInput.telefone ||
      !leadInput.unidades
    ) {
      res.status(500).json({
        success: false,
        message: "Por favor, envie todos os campos necessários.",
      });
      return;
    }

    const alreadyExists = await getLeadByEmail.execute(leadInput.email);

    if (alreadyExists) {
      res
        .status(400)
        .json({ success: false, message: "Este e-mail já existe." });
      return;
    }

    const newLead = await createLeadUseCase.execute(leadInput);

    res.status(200).json({ success: true, lead: newLead });
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

    res.status(200).json({ success: true, lead });
  } catch (error: any) {
    if (error instanceof EntityError) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }
    res.status(500).json({ success: false, message: error.message });
  }
}
