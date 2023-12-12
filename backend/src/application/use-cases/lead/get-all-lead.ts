import { UseCase } from "@/application/shared/use-case";
import { Lead } from "@/domain/entities/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";

export class GetAllLead implements UseCase<void, Lead[]> {
  constructor(private readonly leadRepo: LeadRepository) {}
  async execute() {
    const leadCreated = await this.leadRepo.getAllLead();

    return leadCreated;
  }
}
