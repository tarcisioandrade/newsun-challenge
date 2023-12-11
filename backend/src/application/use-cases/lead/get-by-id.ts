import { UseCase } from "@/application/shared/use-case";
import { LeadProps } from "@/domain/entities/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";

export class GetById
  implements UseCase<string, Required<Omit<LeadProps, "unidades">> | null>
{
  constructor(private readonly leadRepo: LeadRepository) {}
  async execute(id: string) {
    const lead = await this.leadRepo.getById(id);

    return lead;
  }
}
