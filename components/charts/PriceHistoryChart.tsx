'use client';
/* eslint-disable */

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// --- Define types for our new, clean data structure ---
interface Dataset {
  label: string;
  data: (number | null)[];
  borderColor: string;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface PriceHistoryChartProps {
  // The component now expects the new data shape
  data: ChartData;
}

// A custom, better-looking tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{`Date: ${label}`}</p>
        <div className="mt-2 space-y-1">
          {payload.map((pld: any) => (
            <div key={pld.name} className="flex items-center">
              <div
                className="w-3 h-3 mr-2 rounded-full"
                style={{ backgroundColor: pld.color }}
              />
              <span className="text-sm text-gray-700">
                {`${pld.name}: `}
                <span className="font-bold">
                  ₹{pld.value.toLocaleString('en-IN')}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function PriceHistoryChart({ data }: PriceHistoryChartProps) {
  // --- Handle cases with no data ---
  if (!data || !data.datasets || data.datasets.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-96 bg-gray-50 p-4 rounded-lg border">
        <p className="text-gray-500">No price history available to display.</p>
      </div>
    );
  }

  // --- Transform the data into the format Recharts expects ---
  // The old `formatData` function is no longer needed. This is much simpler.
  const transformedData = data.labels.map((label, index) => {
    const dataPoint: { [key: string]: string | number | null } = {
      timestamp: label,
    };
    data.datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    return dataPoint;
  });

  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg border shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#ccc' }}
            tickLine={{ stroke: '#ccc' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#ccc' }}
            tickLine={{ stroke: '#ccc' }}
            tickFormatter={(value: number) =>
              `₹${(value / 1000).toFixed(0)}k`
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />

          {/* --- ✅ The complex `generateLines` function is gone! --- */}
          {/* We just map over our clean datasets array. */}
          {data.datasets.map((dataset) => (
            <Line
              key={dataset.label}
              type="monotone"
              dataKey={dataset.label}
              name={dataset.label}
              stroke={dataset.borderColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              connectNulls={true} // Important: This connects lines over days with no data
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}