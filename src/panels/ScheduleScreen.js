import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, PanelHeaderContent } from '@vkontakte/vkui';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import PeriodView from '../components/PeriodView';

import './ScheduleScreen.css';

const ScheduleScreen = props => {
	
	return (
		<Panel id="schedule">
			<PanelHeader>
				<PanelHeaderContent aside={<Icon16Dropdown />} >
					Неделя
				</PanelHeaderContent>
			</PanelHeader>
			<br></br>
			<div id="group_name">МВА-117</div>
			<div id="metro_station">м. Шаболовская</div>
			<PeriodView />
			<PeriodView />
			<PeriodView />
			<PeriodView />
		</Panel>
	)
};

ScheduleScreen.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default ScheduleScreen;
