import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateMockData = (targetValue: number, volatility: number = 0.1) => {
  // Generate daily data points
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
  const daysPerMonth = 30;
  const totalDays = months.length * daysPerMonth;
  
  // Start with a very small initial value (0.5% of target)
  const initialValue = targetValue * 0.005;
  // Calculate growth rate to reach target with exponential growth
  const growthRate = Math.pow(targetValue / initialValue, 1/totalDays);

  const data = [];
  let currentValue = initialValue;

  for (let day = 0; day < totalDays; day++) {
    // Add some random volatility to make it look more realistic
    const randomFactor = 1 + (Math.random() - 0.5) * volatility;
    currentValue = currentValue * growthRate * randomFactor;
    
    // Get month index and day
    const monthIndex = Math.floor(day / daysPerMonth);
    const dayOfMonth = (day % daysPerMonth) + 1;
    
    data.push({
      month: `${months[monthIndex]} ${dayOfMonth}`,
      value: Math.round(currentValue * 1000) / 1000, // Round to 3 decimal places
      tooltipMonth: months[monthIndex],
      tooltipDay: dayOfMonth
    });
  }

  // Ensure the last value matches our target exactly
  data[data.length - 1].value = targetValue;
  
  return data;
};

// Generate data ending at $12.5M (Total dUSD Supply)
const circulatingSupplyData = generateMockData(12.5);
// Generate data ending at $8.3M (AMO Supply)
const amoSupplyData = generateMockData(8.3, 0.15); // Slightly more volatile

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg">
        <p className="text-gray-400">{data.tooltipMonth} {data.tooltipDay}</p>
        <p className="text-white font-medium">
          ${payload[0].value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}M
        </p>
      </div>
    );
  }
  return null;
};

const CustomizedAxisTick = ({ x, y, payload }: any) => {
  // Only show the month part for better readability
  const month = payload.value.split(' ')[0];
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#9CA3AF"
        fontSize="12px"
      >
        {month}
      </text>
    </g>
  );
};

const SupplyCharts: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-8">
      <div className="flex-1 bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-white text-lg font-medium mb-4">dUSD Circulating Supply</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={circulatingSupplyData}>
              <defs>
                <linearGradient id="colorCirculating" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8702ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8702ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF"
                tick={<CustomizedAxisTick />}
                interval={30}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(value) => `$${value}M`}
                domain={[0, 'auto']}
              />
              <Tooltip content={<CustomTooltip />}/>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8702ff" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCirculating)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex-1 bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-white text-lg font-medium mb-4">dUSD AMO Supply</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={amoSupplyData}>
              <defs>
                <linearGradient id="colorAMO" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8702ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8702ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF"
                tick={<CustomizedAxisTick />}
                interval={30}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(value) => `$${value}M`}
                domain={[0, 'auto']}
              />
              <Tooltip content={<CustomTooltip />}/>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8702ff" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAMO)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SupplyCharts;