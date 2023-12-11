import { UseCase } from "@/application/shared/use-case";
import { Lead, LeadProps } from "@/domain/entities/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";
import { UnidadeRepository } from "@/domain/repository-interfaces/unidade-repository";

export class Create implements UseCase<LeadProps, LeadProps> {
  constructor(
    private readonly leadRepo: LeadRepository,
    private readonly unidadeRepo: UnidadeRepository
  ) {}
  async execute(input: LeadProps) {
    const lead = Lead.create(input);
    const leadCreated = await this.leadRepo.create(lead);

    await this.unidadeRepo.create(leadCreated.unidades, leadCreated.id);

    return leadCreated;
  }
}
