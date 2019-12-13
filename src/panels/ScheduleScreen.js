import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, PanelHeaderContent, Spinner, Group, List, Footer, Tabs, TabsItem, HorizontalScroll, FixedLayout } from '@vkontakte/vkui';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import PeriodView from '../components/PeriodView';
import connect from '@vkontakte/vk-connect';

import './ScheduleScreen.css';

class ScheduleScreen extends Component {
	
	list = [];
	header = "";
	access_token = null;
	schedule = null;
	
	constructor(props) {
		super(props);
		var dayOfWeek = new Date().getDay(); dayOfWeek = dayOfWeek > 5 ? 1 : dayOfWeek;
		this.state = {
			loading: true,
			dayNum: dayOfWeek,
			day: null,
			count: 0,
			groupName: '',
		}
		this.setupConnect();
	}
	
	setupConnect = () => {
		connect.subscribe(({ detail: { type, data }}) => {
				console.log(data);
				if (type === 'VKWebAppUpdateConfig') {
					const schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
					document.body.attributes.setNamedItem(schemeAttribute);
				}
				if (type === 'VKWebAppAccessTokenReceived') {
					this.access_token = data.access_token;
					this.fetchData();
				} 
				if (type === 'VKWebAppAccessTokenFailed' | 'VKWebAppCallAPIMethodFailed') {
					
				}
			});
			connect.send("VKWebAppGetAuthToken", {"app_id": 7241048, "scope": ''});
	}
	
	fetchData = () => {
		connect.sendPromise("VKWebAppCallAPIMethod",  {
				"method": "storage.get", 
				"params": {"v":"5.103", "access_token": this.access_token, "request_id": "getGroup", "key": "rsu-group", "global": 1}
			}
		)
		.then(data => {
			if(data.response[0].hasOwnProperty("key")) {
				this.setState({groupName: data.response[0].value});
				this.updateData();
			} else {
				this.setState({groupName: data.response});
				this.updateData();
			}
		})
		.catch(error => {
			console.log(error);
			this.props.go('choose');
		});
	}
	
	clearGroup = (event) => {
		connect.sendPromise("VKWebAppCallAPIMethod",  {
				"method": "storage.set", 
				"params": {"v":"5.103", "access_token": this.access_token, "request_id": "clearGroup", "value": "", "key": "rsu-group", "global": 1}
			}
		)
		.then(data => {
			if(data.response === 1) this.props.go('choose');
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	getDay = (week, day) => {
		switch(day) {
			case 1: return week.mon;
			case 2: return week.tue;
			case 3: return week.wed;
			case 4: return week.thu;
			case 5: return week.fri;
			default: return week.tue;
		}
	}
	
	getCountPlural = (count) => {
		switch(count) {
			case 1: return count + ' пара';
			case 5: return count + ' пар';
			default: return count + ' пары';
		}
	}
	
	updateData = () => {
		console.log(this.state.groupName);
		this.schedule = require('../json/'+this.state.groupName+'.json');
		this.header = 	<PanelHeaderContent
							aside={<Icon16Dropdown />}
							onClick={this.clearGroup} >
								Нечётная неделя
						</PanelHeaderContent>;
		this.updateDay();
	}
	
	updateDay = () => {
		console.log(this.state.dayNum);
		var day = this.getDay(this.schedule.week1, this.state.dayNum);
		var count = 0;
		day.forEach(item => { if(item.cab) count++ });
		this.setState({loading: false, day: day, count: count, dayNum: this.state.dayNum});
	}
	
	render() {
		return (
			<Panel id="schedule">
				<PanelHeader>
					{this.state.loading ? <Spinner /> : this.header }
				</PanelHeader>
				<Group>
					<List>{ this.state.loading ? <div/> :
								this.state.day.map(function (item,index) {
									return (
										<PeriodView name={item.name} type={item.type} time={index+1} tch={item.tch} cab={item.cab} key={index}/>
									);
								}, this)
							
						}
					</List>
				</Group>
				{this.state.loading ? 	<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
											<Spinner size="small" style={{ marginTop: 20 }} />
										</div> : <Footer>{this.getCountPlural(this.state.count)}</Footer> }
				<FixedLayout vertical="bottom">		
					<Tabs type="buttons">
						<HorizontalScroll>
						<TabsItem
							onClick={() => {this.state.dayNum = 1; this.updateDay()}}
							selected={this.state.dayNum === 1}
						>
							Понедельник
						</TabsItem>
						<TabsItem
							onClick={() => {this.state.dayNum = 2; this.updateDay()}}
							selected={this.state.dayNum === 2}
						>
							Вторник
						</TabsItem>
						<TabsItem
							onClick={() => {this.state.dayNum = 3; this.updateDay()}}
							selected={this.state.dayNum === 3}
						>
							Среда
						</TabsItem>
						<TabsItem
							onClick={() => {this.state.dayNum = 4; this.updateDay()}}
							selected={this.state.dayNum === 4}
						>
							Четверг
						</TabsItem>
						<TabsItem
							onClick={() => {this.state.dayNum = 5; this.updateDay()}}
							selected={this.state.dayNum === 5}
						>
							Пятница
						</TabsItem>
						</HorizontalScroll>
					</Tabs>
				</FixedLayout>
			</Panel>
		)
	}
};

ScheduleScreen.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default ScheduleScreen;
