export interface Poll {
  id: string;
  question: string;
  options: string[];
  startDate?: Date;
  endDate: Date;
  votes: number;
}
