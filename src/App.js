import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import ScheduleScreen from './panels/ScheduleScreen';
import ChooseGroup from './panels/ChooseGroup';

const App = () => {
	const [activePanel, setActivePanel] = useState('schedule');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}	
		});
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			console.log(user);
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<ChooseGroup fetchedUser={fetchedUser} id='choose' go={go} />
			<ScheduleScreen fetchedUser={fetchedUser} id='schedule' go={go} />
		</View>
	);
}

export default App;

