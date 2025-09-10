import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import '../styles/CSVReader.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// ChartDisplay Component
const ChartDisplay = ({ data, chartType, xColumn, yColumn }) => {
  const prepareChartData = () => {
    const labels = data.map(row => row[xColumn]).slice(0, 20);
    const values = data.map(row => {
      const value = parseFloat(row[yColumn]);
      return isNaN(value) ? 0 : value;
    }).slice(0, 20);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: yColumn,
          data: values,
          backgroundColor: [
            'rgba(117, 66, 14, 0.8)',
            'rgba(85, 59, 8, 0.8)',
            'rgba(166, 124, 58, 0.8)',
            'rgba(61, 41, 6, 0.8)',
            'rgba(200, 150, 100, 0.8)',
            'rgba(117, 66, 14, 0.6)',
            'rgba(85, 59, 8, 0.6)',
            'rgba(166, 124, 58, 0.6)',
            'rgba(61, 41, 6, 0.6)',
            'rgba(200, 150, 100, 0.6)',
          ],
          borderColor: [
            'rgba(117, 66, 14, 1)',
            'rgba(85, 59, 8, 1)',
            'rgba(166, 124, 58, 1)',
            'rgba(61, 41, 6, 1)',
            'rgba(200, 150, 100, 1)',
            'rgba(117, 66, 14, 1)',
            'rgba(85, 59, 8, 1)',
            'rgba(166, 124, 58, 1)',
            'rgba(61, 41, 6, 1)',
            'rgba(200, 150, 100, 1)',
          ],
          borderWidth: 2,
          fill: chartType === 'line' ? false : true,
          tension: 0.1,
        },
      ],
    };

    return chartData;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: `${yColumn} by ${xColumn}`,
        color: '#75420e',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#666',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#666',
          maxRotation: 45,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const chartData = prepareChartData();

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={{
          ...chartOptions,
          scales: undefined // Pie charts don't need scales
        }} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        {renderChart()}
      </div>
      
      <div className="data-summary">
        <h4>📊 Data Summary</h4>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Total Records:</span>
            <span className="stat-value">{data.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">X Axis:</span>
            <span className="stat-value">{xColumn}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Y Axis:</span>
            <span className="stat-value">{yColumn}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Chart Type:</span>
            <span className="stat-value">{chartType.charAt(0).toUpperCase() + chartType.slice(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main CSVReader Component
const CSVReader = () => {
  const [csvData, setCsvData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [selectedColumns, setSelectedColumns] = useState({ x: '', y: '' });
  const [fileName, setFileName] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    
    Papa.parse(file, {
      complete: (results) => {
        console.log('Parsed data:', results.data);
        setCsvData(results.data);
        if (results.data.length > 0) {
          setHeaders(Object.keys(results.data[0]));
        }
      },
      header: true,
      skipEmptyLines: true
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx']
    },
    multiple: false
  });

  const resetData = () => {
    setCsvData(null);
    setHeaders([]);
    setSelectedColumns({ x: '', y: '' });
    setFileName('');
  };

  return (
    <div className="csv-reader-container">
      <div className="csv-header">
        <h3>📊 CSV Data Visualizer</h3>
        <p>Upload a CSV file and create interactive charts</p>
      </div>
      
      {/* File Upload Area */}
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <div className="dropzone-content">
          <div className="upload-icon">📁</div>
          {isDragActive ? (
            <p className="dropzone-text">Drop the CSV file here...</p>
          ) : (
            <>
              <p className="dropzone-text">Drag & drop a CSV file here, or click to select</p>
              <p className="dropzone-subtext">Supports .csv, .xls, .xlsx files</p>
            </>
          )}
        </div>
      </div>
          {/* Sample Data Download */}
        <div className="sample-download-section">
        <div className="download-content">
            <div className="download-info">
            <h4>📋 Need a sample CSV file?</h4>
            <p>Download our automobile dataset with 398 car records including MPG, horsepower, weight, and more.</p>
            </div>
            <a 
            href="../projects/Automobile.csv" 
            download="Automobile.csv"
            className="download-btn"
            >
            ⬇️ Download Sample CSV
            </a>
        </div>
        </div>
      {/* File Info */}
      {fileName && (
        <div className="file-info">
          <span className="file-name">📄 {fileName}</span>
          <button onClick={resetData} className="reset-btn">🗑️ Remove</button>
        </div>
      )}

      {/* Chart Configuration */}
      {csvData && headers.length > 0 && (
        <div className="chart-controls">
          <div className="control-group">
            <label>Chart Type:</label>
            <select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value)}
              className="control-select"
            >
              <option value="bar">📊 Bar Chart</option>
              <option value="line">📈 Line Chart</option>
              <option value="pie">🥧 Pie Chart</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>X Axis:</label>
            <select 
              value={selectedColumns.x}
              onChange={(e) => setSelectedColumns({...selectedColumns, x: e.target.value})}
              className="control-select"
            >
              <option value="">Select X Column</option>
              {headers.map(header => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label>Y Axis:</label>
            <select 
              value={selectedColumns.y}
              onChange={(e) => setSelectedColumns({...selectedColumns, y: e.target.value})}
              className="control-select"
            >
              <option value="">Select Y Column</option>
              {headers.map(header => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Data Preview */}
      {csvData && (
        <div className="data-preview">
          <h4>📋 Data Preview ({csvData.length} records)</h4>
          <div className="preview-table">
            <table>
              <thead>
                <tr>
                  {headers.slice(0, 5).map(header => (
                    <th key={header}>{header}</th>
                  ))}
                  {headers.length > 5 && <th>...</th>}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 3).map((row, index) => (
                  <tr key={index}>
                    {headers.slice(0, 5).map(header => (
                      <td key={header}>{row[header]}</td>
                    ))}
                    {headers.length > 5 && <td>...</td>}
                  </tr>
                ))}
                {csvData.length > 3 && (
                  <tr>
                    <td colSpan={headers.length > 5 ? 6 : headers.length}>
                      ... and {csvData.length - 3} more rows
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Chart Display */}
      {csvData && selectedColumns.x && selectedColumns.y && (
        <ChartDisplay 
          data={csvData}
          chartType={chartType}
          xColumn={selectedColumns.x}
          yColumn={selectedColumns.y}
        />
      )}
    </div>
  );
};

export default CSVReader;