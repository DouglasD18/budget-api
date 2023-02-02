export interface CreateBudget {
  create(userId: number, productsId: number[]): Promise<number>;
}