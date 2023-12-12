import { UseCase } from "@/application/shared/use-case";
import { Lead } from "@/domain/entities/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";

export class GetByEmail implements UseCase<string, Lead | null> {
  constructor(private readonly leadRepo: LeadRepository) {}
  async execute(email: string) {
    const leadCreated = await this.leadRepo.getByEmail(email);

    return leadCreated;
  }
}
