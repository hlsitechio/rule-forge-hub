import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Package, DollarSign, Calendar, Star, TrendingUp, Clock } from 'lucide-react';

interface Purchase {
  id: string;
  amount: number;
  created_at: string;
}

interface DashboardStatsProps {
  purchases: Purchase[];
}

export const DashboardStats = ({ purchases }: DashboardStatsProps) => {
  const totalSpent = purchases.reduce((sum, p) => sum + (p.amount / 100), 0);
  const latestPurchase = purchases.length > 0 ? new Date(purchases[0].created_at).toLocaleDateString() : 'None';
  const averageOrderValue = purchases.length > 0 ? (totalSpent / purchases.length) : 0;

  const stats = [
    {
      icon: Package,
      label: 'Total Purchases',
      value: purchases.length.toString(),
      change: '+12%',
      changeType: 'positive' as const,
      color: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500'
    },
    {
      icon: DollarSign,
      label: 'Total Spent',
      value: `$${totalSpent.toFixed(2)}`,
      change: '+8%',
      changeType: 'positive' as const,
      color: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-500'
    },
    {
      icon: TrendingUp,
      label: 'Avg. Order Value',
      value: `$${averageOrderValue.toFixed(2)}`,
      change: '+15%',
      changeType: 'positive' as const,
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500'
    },
    {
      icon: Calendar,
      label: 'Latest Purchase',
      value: latestPurchase,
      change: 'Recent',
      changeType: 'neutral' as const,
      color: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300 group overflow-hidden relative">
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              initial={false}
            />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className={`text-xs px-2 py-1 rounded-full ${
                    stat.changeType === 'positive' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-gray-500/10 text-gray-500'
                  }`}
                >
                  {stat.change}
                </motion.div>
              </div>
              
              <div className="space-y-1">
                <motion.div
                  className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};