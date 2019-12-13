import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, FormLayout, Select } from '@vkontakte/vkui';

import './ScheduleScreen.css';


const ChooseGroup = props => {
	//const list = require('../ScheduleList');
	return (
		<Panel id="choose">
			<PanelHeader> Выберите группу </PanelHeader>
			<FormLayout>
				<Select top="Обычный Select" placeholder="Выберите пол">
					
				</Select>
			</FormLayout>
		</Panel>
	)
};

ChooseGroup.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default ChooseGroup;
