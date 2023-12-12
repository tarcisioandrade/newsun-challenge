import { UseCase } from "@/application/shared/use-case";
import { Lead } from "@/domain/entities/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";

export class GetAllLeadWithFilter implements UseCase<string, Lead[]> {
  constructor(private readonly leadRepo: LeadRepository) {}
  async execute(filter: string) {
    const leadCreated = await this.leadRepo.getAllLeadWithFilter(filter);

    return leadCreated;
  }
}
