import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const ExpenseChart = ({ expenses }) => {
  // Helper functions to process data for the charts
  const getCategoryData = () => {
    const categoryData = {};
    expenses.forEach(expense => {
      categoryData[expense.category] = (categoryData[expense.category] || 0) + expense.amount;
    });
    return categoryData;
  };

  const getTagData = () => {
    const tagData = {};
    expenses.forEach(expense => {
      expense.tags.forEach(tag => {
        tagData[tag] = (tagData[tag] || 0) + expense.amount;
      });
    });
    return tagData;
  };

  const getMonthlyData = () => {
    const monthlyData = {};
    expenses.forEach(expense => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyData[month] = (monthlyData[month] || 0) + expense.amount;
    });
    return monthlyData;
  };

  // Prepare data for each chart
  const categoryData = getCategoryData();
  const tagData = getTagData();
  const monthlyData = getMonthlyData();

  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const tagChartData = {
    labels: Object.keys(tagData),
    datasets: [
      {
        label: 'Expenses by Tag',
        data: Object.values(tagData),
        backgroundColor: Object.keys(tagData).map((_, index) => `hsl(${index * 360 / Object.keys(tagData).length}, 70%, 70%)`),
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const monthlyChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Expenses by Month',
        data: Object.values(monthlyData),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Expense Distribution</h2>
      <div style={styles.chartContainer}>
        <div style={styles.card}>
          <h3 style={styles.chartTitle}>Expenses by Category</h3>
          <div style={styles.chart}>
            <Bar data={categoryChartData} options={styles.chartOptions} />
          </div>
        </div>
        <div style={styles.card}>
          <h3 style={styles.chartTitle}>Expenses by Tag</h3>
          <div style={styles.chart}>
            <Pie data={tagChartData} options={styles.chartOptions} />
          </div>
        </div>
        <div style={styles.card}>
          <h3 style={styles.chartTitle}>Monthly Expenses</h3>
          <div style={styles.chart}>
            <Line data={monthlyChartData} options={styles.chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  chartTitle: {
    marginBottom: '15px',
    textAlign: 'center',
  },
  chart: {
    height: '300px',
  },
  chartOptions: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

export default ExpenseChart;
