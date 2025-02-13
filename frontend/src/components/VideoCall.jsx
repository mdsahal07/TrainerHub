import React, { useEffect, useRef } from 'react';

const VideoCall = ({ roomName }) => {
	const jitsiContainerRef = useRef(null);

	useEffect(() => {
		const domain = 'meet.jit.si';
		const options = {
			roomName: roomName,
			width: '100%',
			height: '100%',
			parentNode: jitsiContainerRef.current,
		};

		const api = new window.JitsiMeetExternalAPI(domain, options);

		return () => api.dispose();
	}, [roomName]);

	return <div ref={jitsiContainerRef} style={{ height: '100vh', width: '100%' }} />;
};

export default VideoCall;
