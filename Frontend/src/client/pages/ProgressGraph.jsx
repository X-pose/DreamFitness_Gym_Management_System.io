import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../../public/css/progressGraph.css'
 
 
 

const Graph = () =>{ 
    const [progresses, setProgresses] = useState([]);

    useEffect(() => {
        fetchProgress();
      }, []);

      const fetchProgress = async () => {
        try {
          const response = await fetch('/api/progressdetail');
          const json = await response.json();
    
          if (response.ok) {
            setProgresses(json);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      const getWeightData = () => {
        return progresses.map((progress) => progress.Weight);
      };
    
      const getCaloriesData = () => {
        return progresses.map((progress) => progress.Total_calories.toFixed(2));
      };
    
      const chartData = {
        labels: progresses.map((progress) => progress.selectDate),
        datasets: [
          {
            label: 'Weight',
            data: getWeightData(),
            fill: false,
            borderColor: 'red',
          },
          {
            label: 'Calories',
            data: getCaloriesData(),
            fill: false,
            borderColor: 'blue',
          },
        ],
      };


    

      return(
        <div>
           
         
         
        <h2 className='graphtitle'>Weight and Calories Graph</h2>
        
        
            <div className='conttracker1'>

          <div className='representtracker'>
            Red Represent weight
          </div>

          <div className='representtracker2'>
          Blue Represent calories
          </div>

        </div>
        
        
        <div className='graphdata1'>
        <Line data={chartData} />
        </div>
      </div>
    


      )



}
export default Graph


