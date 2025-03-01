import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCall from './VideoCall';

const VideoCallRoom = () => {
	const { roomName } = useParams();

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full h-full">
				<h2 className="text-2xl font-bold mb-4">Video Call Room: {roomName}</h2>
				<VideoCall roomName={roomName} />
			</div>
		</div>
	);
};

export default VideoCallRoom;
