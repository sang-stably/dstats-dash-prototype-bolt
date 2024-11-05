import React from 'react';
import MetricCard from './MetricCard';
import Navbar from './Navbar';
import SupplyCharts from './SupplyCharts';
import Footer from './Footer';

const Dashboard: React.FC = () => {
  const metrics = [
    // Row 1 - Supply and Collateral Metrics
    {
      title: "Total dUSD Supply",
      value: "$12.5M",
      change: "5.2%",
      isPositive: true
    },
    {
      title: "Available dUSD to Borrow",
      value: "$4.2M",
      change: "2.1%",
      isPositive: true
    },
    {
      title: "Total dUSD Debt",
      value: "$8.3M",
      change: "3.4%",
      isPositive: false
    },
    {
      title: "Total Collateral TVL",
      value: "$25.7M",
      change: "1.8%",
      isPositive: true
    },
    // Row 2 - APR and Ratio Metrics
    {
      title: "dUSD Raw Supply APR",
      value: "8.5%",
      change: "0.5%",
      isPositive: true
    },
    {
      title: "dUSD Raw Borrow APR",
      value: "12.3%",
      change: "0.3%",
      isPositive: false
    },
    {
      title: "dUSD Net Rebate APR",
      value: "3.8%",
      change: "0.2%",
      isPositive: true
    },
    {
      title: "Utilization Ratio",
      value: "66.4%",
      change: "1.2%",
      isPositive: true
    }
  ];

  const firstRow = metrics.slice(0, 4);
  const secondRow = metrics.slice(4);

  return (
    <div className="relative min-h-screen bg-gray-900">
      <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-[#8702ff]/20 to-transparent" />
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          <Navbar />
          
          <div className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {firstRow.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  isPositive={metric.isPositive}
                />
              ))}
            </div>
            
            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {secondRow.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  isPositive={metric.isPositive}
                />
              ))}
            </div>
          </div>

          <SupplyCharts />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;