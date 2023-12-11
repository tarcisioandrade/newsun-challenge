import { LeadProps, Lead } from "../entities/lead";

export interface LeadRepository {
  create(input: Lead): Promise<Required<LeadProps>>;
  getByEmail(email: string): Promise<Required<Omit<LeadProps, "unidades">> | null>;
  getById(id: string): Promise<Required<Omit<LeadProps, "unidades">> | null>;
}
