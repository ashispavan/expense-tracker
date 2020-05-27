import React, { useContext } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer
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

const filterData = (transactions) => {
  const data = [...transactions];

  const filterData = data.filter(item => item.amount > 0);

  let holder = {};

  filterData.forEach(function(d) {
    if (holder.hasOwnProperty(d.text)) {
      holder[d.text] = holder[d.text] + d.amount;
    } else {
      holder[d.text] = d.amount;
    }
  });
  
  let result = [];
  
  for (var prop in holder) {
    result.push({ text: prop, amount: holder[prop] });
  }

  return result;
}


export default function Example() {
  //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

  const { transactions } = useContext(GlobalContext);
  console.log('Transactions: ', transactions);
  const renderData = filterData(transactions);



  if (renderData.length <= 0) {

    return (
      <>
      <h3>Expense Summary</h3>
      <h5>No expenses added</h5>
      </>
    )
  }
    return (
      <>
      <h3>Expense Summary</h3>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart width={600} height={400}>
          <Pie
            data={renderData}
            cy={200}
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="amount"
          >
            {
              renderData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </>
    );

}