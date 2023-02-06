export interface CreateBudgetData {
  userId: number
  productsId: number[]
}

export interface CreateBudget {
  create(data: CreateBudgetData): Promise<number | string>;
}
