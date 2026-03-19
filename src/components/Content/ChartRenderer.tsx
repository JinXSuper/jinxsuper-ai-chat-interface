'use client';

import * as React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';
import { Sparkles, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

interface ChartRendererProps {
  type: 'bar' | 'line' | 'area' | 'pie' | 'scatter';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  title?: string;
  config?: {
    xKey: string;
    yKey: string;
    color?: string;
    colors?: string[];
    stacked?: boolean;
  };
}

const DEFAULT_COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

// Define a type for Recharts Tooltip payload items
interface RechartsTooltipPayload {
  name: string;
  value: number | string;
  unit?: string;
  color?: string;
  dataKey?: string;
  // Add other properties if needed
}

export function ChartRenderer({ type, data, title, config }: ChartRendererProps) {
  const { xKey, yKey, color = '#8b5cf6', colors = DEFAULT_COLORS } = config || {};

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey={xKey || ""} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar dataKey={yKey || ""} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey={xKey || ""} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
            />
            <Line 
              type="monotone" 
              dataKey={yKey || ""} 
              stroke={color} 
              strokeWidth={3} 
              dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#1a1a1a' }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey={xKey || ""} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
            />
            <Area 
              type="monotone" 
              dataKey={yKey || ""} 
              stroke={color} 
              fillOpacity={1} 
              fill="url(#colorArea)" 
              strokeWidth={2}
            />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey={yKey || ""}
              nameKey={xKey || ""}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        );
      default:
        return <div>Unsupported chart type: {type}</div>;
    }
  };

  // CustomTooltip component
  const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: RechartsTooltipPayload[], label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-md text-white text-xs">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value} {entry.unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const Icon = type === 'bar' ? BarChart3 : type === 'line' ? LineChartIcon : type === 'pie' ? PieChartIcon : TrendingUp;

  return (
    <div className="w-full bg-[#0d0d0d] p-6 rounded-3xl border border-border/40 shadow-2xl transition-all hover:border-primary/20 hover:shadow-primary/5 group animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-700 ease-out fill-mode-both delay-150">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-[14px] bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/10">
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">{title || 'Data Analysis'}</span>
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-bold">Interactive Chart</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/20 border border-border/20">
          <Sparkles className="h-3 w-3 text-primary animate-pulse-subtle" />
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">AI Generated</span>
        </div>
      </div>
      
      <div className="h-[240px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
