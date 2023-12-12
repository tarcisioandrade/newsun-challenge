import { UseCase } from "@/application/shared/use-case";
import { Lead } from "@/domain/entities/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";

export class GetById implements UseCase<string, Lead | null> {
  constructor(private readonly leadRepo: LeadRepository) {}
  async execute(id: string) {
    const lead = await this.leadRepo.getById(id);

    return lead;
  }
}
