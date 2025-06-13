import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import * as d3Chromatic from "d3-scale-chromatic";

ChartJS.register(ArcElement, Tooltip, Legend);

const colorScheme = d3Chromatic.schemeSet3; // 12 distinct colors

const getColor = (idx) => colorScheme[idx % colorScheme.length];

const LanguageChart = ({ languageData }) => {
  if (!languageData || Object.keys(languageData).length === 0) return null;

  const labels = Object.keys(languageData);
  const data = Object.values(languageData);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: labels.map((_, idx) => getColor(idx)),
        borderColor: "#22223b",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-xl mx-auto mb-8 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h3 className="text-lg font-semibold mb-4">Languages Used</h3>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-40 h-40">
          <Pie
            data={chartData}
            options={{
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `${context.label}: ${context.parsed.toFixed(1)}%`,
                  },
                },
              },
            }}
          />
        </div>
        <ul className="flex-1 flex flex-col gap-2">
          {labels.map((lang, idx) => (
            <li key={lang} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ background: getColor(idx) }}
              />
              <span className="font-semibold">{lang}:</span>
              <span>{data[idx].toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageChart;
