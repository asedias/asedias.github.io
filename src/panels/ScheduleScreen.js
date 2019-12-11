import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, PanelHeaderContent } from '@vkontakte/vkui';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';

import './ScheduleScreen.css';

const ScheduleScreen = props => {
	
	var request = require('request');
	//https://github.com/asedias/VKAPPTest/raw/excel/201912120053192314.xls
	var options = {
		hostname: "github.com",
		path: '/asedias/VKAPPTest/raw/excel/201912120053192314.xls',
		method: "GET",
		headers: {
			  'Access-Control-Allow-Origin':'github.com'
		}
	};

	console.log('Requesting file..');
	const https = require("https");

	https.get(options).on('response', function (response) {
		var body = '';
		var i = 0;
	  response.on('data', function (chunk) {
			i++;
			body += chunk;
			console.log('BODY Part: ' + i);
		});
		response.on('end', function () {
			console.log(body);
			console.log('Finished');
		});
	});
	
	return (
		<Panel id="schedule">
			<PanelHeader>
				<PanelHeaderContent aside={<Icon16Dropdown />} >
					Неделя
				</PanelHeaderContent>
			</PanelHeader>
			<text id="group_name">МВА-117</text><br></br>
			<text id="metro_station">м. Шаболовская</text>
		</Panel>
	)
};

ScheduleScreen.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default ScheduleScreen;
