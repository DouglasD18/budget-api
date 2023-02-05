import { CreateBudget, CreateBudgetData } from "../../domain/useCases/create-budget";

export class CreateBudgetAdapter implements CreateBudget {
  create(data: CreateBudgetData): Promise<number> {
    throw new Error("Method not implemented.");
  }
}
