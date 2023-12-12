import { UseCase } from "@/application/shared/use-case";
import { Lead, LeadProps } from "@/domain/entities/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";
import { UnidadeRepository } from "@/domain/repository-interfaces/unidade-repository";

export class Create implements UseCase<LeadProps, Lead> {
  constructor(
    private readonly leadRepo: LeadRepository,
    private readonly unidadeRepo: UnidadeRepository
  ) {}
  async execute(input: LeadProps) {
    const leadCreated = await this.leadRepo.create(input);

    await this.unidadeRepo.create(leadCreated.unidades, leadCreated.id.value);

    return leadCreated;
  }
}
