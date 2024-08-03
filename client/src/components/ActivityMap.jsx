import React from 'react';
import HeatMap from '@uiw/react-heat-map';
import  { useState} from 'react';
import Tooltip from '@uiw/react-tooltip';

const currentDate = new Date();
const startDate = new Date(currentDate);
startDate.setMonth(currentDate.getMonth() - 6);
const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Last day of the current month

// filler values
const value = [
  { date: '2024/01/11', count:2 },
  { date: '2024/04/12', count:2 },
  { date: '2024/05/01', count:3 },
  { date: '2024/05/02', count:3 },
  { date: '2024/05/03', count:1 },
  { date: '2024/05/04', count:1 },
  { date: '2024/05/08', count:3 },
  { date: '2024/08/02', count:3 },

];

console.log(value);

const ActivityMap = () => {
    const [selected, setSelected] = useState('')
    return (
      <div>
        <HeatMap
          width='1100'
          height="189"
          style={{'--rhm-rect-active': '#f0f0f0'}}
          value={value}
          weekLabels={['월', '화', '수', '목', '금', '토', '일']}
          monthLabels={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
          startDate={new Date('2024-01-01')}
          endDate={new Date('2024-12-31')}
          panelColors={{
            0: 'white',
            1: '#80ED99',
            2: '#66cc88',
            3: '#4BAF66'
          }}          
          rectSize={19}
          rectRender={(props, data) => {
            if (selected !== '') {
              props.opacity = data.date === selected ? 1 : 0.45
            }
            return (
              <rect {...props} onClick={() => {
                setSelected(data.date === selected ? '' : data.date);
              }} />              
            // add tooltip on select
            );
          }}
        />
      </div>
    )
  };

export default ActivityMap