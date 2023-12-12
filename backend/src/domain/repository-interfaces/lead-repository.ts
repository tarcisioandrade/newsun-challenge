import { Lead, LeadProps } from "../entities/lead";

export interface LeadRepository {
  create(input: LeadProps): Promise<Lead>;
  getByEmail(email: string): Promise<Lead | null>;
  getById(id: string): Promise<Lead | null>;
  getAllLeadWithFilter(filter: string): Promise<Lead[]>;
  getAllLead(): Promise<Lead[]>;
}
