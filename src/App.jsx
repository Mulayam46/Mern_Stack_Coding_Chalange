
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    // Fetch transactions when the component mounts or when month, search, or page changes
    loadTransactions();
    // Fetch statistics, bar chart data, etc.
    loadStatistics();
    loadBarChartData();
  }, [month, search, page]);

  const loadTransactions = async () => {
    try {
      const response = await axios.get(`/api/list-transactions?month=${month}&search=${search}&page=${page}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const loadStatistics = async () => {
    try {
      const response = await axios.get(`/api/statistics?month=${month}`);
      setTotalSaleAmount(response.data.totalSaleAmount);
      setTotalSoldItems(response.data.totalSoldItems);
      setTotalNotSoldItems(response.data.totalNotSoldItems);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const loadBarChartData = async () => {
    try {
      const response = await axios.get(`/api/bar-chart?month=${month}`);
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  // Render your React components here, including the transactions table and charts
  return (
    <div>
      <div>
    
        <label>Select Month:</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {/* Populate options dynamically */}
        </select>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions" />
        <button onClick={() => loadTransactions()}>Search</button>
        {/* Render transactions table, pagination, and search functionality */}
      </div>

      <div>
        <h2>Transactions Statistics</h2>
        <p>Total Sale Amount: {totalSaleAmount}</p>
        <p>Total Sold Items: {totalSoldItems}</p>
        <p>Total Not Sold Items: {totalNotSoldItems}</p>
      </div>

      <div>
        <h2>Transactions Bar Chart</h2>
        {/* Render bar chart using barChartData */}
      </div>
    </div>
  );
};

export default App;
