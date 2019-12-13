import React from 'react';
import PropTypes from 'prop-types';
import connect from '@vkontakte/vk-connect';
import { Panel, PanelHeader, FormLayout, /*Select,*/ Input, Button } from '@vkontakte/vkui';

import './ScheduleScreen.css';


class ChooseGroup extends React.Component {
	
	access_token = null;
	constructor(props) {
		super(props);
		this.setGroup = this.setGroup.bind(this);
		this.setupConnect();
	}
	
	setupConnect = () => {
		connect.subscribe(({ detail: { type, data }}) => {
				if (type === 'VKWebAppUpdateConfig') {
					const schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
					document.body.attributes.setNamedItem(schemeAttribute);
				}
				if (type === 'VKWebAppAccessTokenReceived') {
					this.access_token = data.access_token;
				} 
				if (type === 'VKWebAppCallAPIMethodResult') {
					if(data.response === '') {
						this.props.go('choose');
					} else if(data.request_id === "setGroup") {
						this.props.go('schedule');
					}
				}
			});
			connect.send("VKWebAppGetAuthToken", {"app_id": 7241048, "scope": ''});
	}
	
	setGroup = (event) => {
		connect.send("VKWebAppCallAPIMethod",  {
				"method": "storage.set", 
				"params": {"v":"5.103", "access_token": this.access_token, "request_id": "setGroup", "value": document.getElementById("group-input").value, "key": "rsu-group", "global": 1}
			}
		);
	}
	
	render() {
		return (
			<Panel id="choose">
				<PanelHeader>Выберите группу</PanelHeader>
				<FormLayout>
					<Input id="group-input" top="Введите группу" placeholder="MVA-117" />
					<Button size="xl" onClick={this.setGroup}>Готово</Button>
				</FormLayout>
			</Panel>
		)
	}
};

ChooseGroup.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default ChooseGroup;
