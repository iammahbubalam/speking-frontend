import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { subject: 'Speaking', A: 78, fullMark: 90 },
    { subject: 'Writing', A: 65, fullMark: 90 },
    { subject: 'Reading', A: 55, fullMark: 90 },
    { subject: 'Listening', A: 82, fullMark: 90 },
    { subject: 'Fluency', A: 70, fullMark: 90 },
    { subject: 'Pronun.', A: 60, fullMark: 90 },
];

const StatsRadar = () => {
    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 90]} tick={false} axisLine={false} />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', borderColor: '#f1f5f9' }}
                        itemStyle={{ color: '#7c3aed', fontWeight: 'bold' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatsRadar;
