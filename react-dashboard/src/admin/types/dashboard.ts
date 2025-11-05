export interface DashboardData {
  stats: {
    totalUsers: number;
    totalSales: number;
    newOrders: number;
  };
  recentActivity: {
    id: string;
    message: string;
    timestamp: string;
  }[];
}
