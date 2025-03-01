import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

const VideoCall = ({ roomName }) => {
	console.log("room Name 1 : ", roomName);
	return (
		<div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ height: '100%', width: '100%' }}>
				<JitsiMeeting
					domain="meet.jit.si"
					roomName={roomName}
					configOverwrite={{
						startWithAudioMuted: true,
						startWithVideoMuted: true,
					}}
					interfaceConfigOverwrite={{
						TOOLBAR_BUTTONS: [
							'microphone', 'camera', 'desktop', 'fullscreen',
							'fodeviceselection', 'hangup', 'profile', 'chat',
							'recording', 'livestreaming', 'etherpad', 'sharedvideo',
							'settings', 'raisehand', 'videoquality', 'filmstrip',
							'invite', 'feedback', 'stats', 'shortcuts', 'tileview',
							'videobackgroundblur', 'download', 'help', 'mute-everyone',
							'e2ee'
						]
					}}
					userInfo={{
						displayName: 'User Name',
						email: 'user@example.com'
					}}
					getIFrameRef={iframeRef => {
						iframeRef.style.height = '100%';
						iframeRef.style.width = '100%';
					}}
				/>
			</div>
		</div>
	);
};

export default VideoCall;
