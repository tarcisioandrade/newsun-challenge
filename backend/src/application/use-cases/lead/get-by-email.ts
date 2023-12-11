import { UseCase } from "@/application/shared/use-case";
import { LeadProps } from "@/domain/entities/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";

export class GetByEmail
  implements UseCase<string, Required<Omit<LeadProps, "unidades">> | null>
{
  constructor(private readonly leadRepo: LeadRepository) {}
  async execute(email: string) {
    const leadCreated = await this.leadRepo.getByEmail(email);

    return leadCreated;
  }
}
