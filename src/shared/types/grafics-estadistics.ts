
export interface GraficsEstadisticByMonth {
  year: number;
  totalAnnualSales: number;
  totalSalesCount: number;
  monthlyData: MonthlyDatum[];
}

export interface MonthlyDatum {
  month: number;
  monthName: string;
  totalSales: number;
  salesCount: number;
}


export interface CategoriByProductGraficDonaut {
  data: Datum[];
  total: number;
}

export interface Datum {
  id: string;
  name: string;
  productCount: number;
  porcentage: number;
  [key: string]: string | number;
}
