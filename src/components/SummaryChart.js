import React, { useContext } from 'react';
import {
  PieChart, Pie, Cell
} from 'recharts';

import { GlobalContext } from '../context/GlobalState';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, ...rest
}) => {
  
    // console.log("Rest", rest);
    const { text } = rest;
    const RADIAN = Math.PI / 180;
    // eslint-disable-next-line
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    // eslint-disable-next-line
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // eslint-disable-next-line
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {text} ({`${(percent * 100).toFixed(0)}%`})
      </text>
    );
  
};


export default function Example() {
  //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

  const { transactions } = useContext(GlobalContext);
  console.log('Transactions: ', transactions);

    return (
      <PieChart width={600} height={400}>
        <Pie
          data={transactions}
          cy={200}
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="amount"
        >
          {
            transactions.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    );

}