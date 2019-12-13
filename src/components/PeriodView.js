import React from 'react';
import { Div } from '@vkontakte/vkui';

export interface PeriodViewProps extends React.HTMLAttributes<HTMLElement>/*, HasChildren, HasRootRef<HTMLElement>*/ {
  name?: string,
  cab?: string,
  type?: 'prac' | 'lab' | 'lec',
  tch?: string,
  time?: string
}

const getTime = time => {
  switch (time) {
    case 1:
      return '9:00-10:30';
    case 2:
      return '10:40-12:10';
    case 3:
      return '12:40-14:10';
    case 4:
      return '14:20-15:50';
    case 5:
      return '16:20-17:50';
    default:
      return time;
  }
};

const getType = type => {
	switch (type.replace('.', '').toLowerCase()) {
		case 'пр': return <div id='type_prac'>Практика</div>;
		case 'лаб': return <div id='type_lab'>Лаб.</div>;
		case 'лек': return <div id='type_lec'>Лекция</div>;
		default: return <div id='type_'></div>;
	}
}
		

const PeriodView: React.FunctionComponent<PeriodViewProps> = (props: PeriodViewProps) => {
  //const platform = usePlatform();
  if (props.cab === '') { 
  return <div/>;
  } else {
	  return <Div>
				<div id='timecab'><div id='time'>{getTime(props.time)}</div><div id='cab'>{props.cab}</div></div>
				<div id='nametype'><div id='name'>{props.name}</div>{getType(props.type)}</div>
				<div id='tch'>{props.tch}</div>
			</Div>
  }
};

PeriodView.defaultProps = {
  name: 'Программирование',
  cab: '1404',
  type: 'prac',
  tch: 'Иванов И.И.',
  time: 1
};

export default PeriodView;
