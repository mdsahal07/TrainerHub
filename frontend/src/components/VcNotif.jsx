import React from 'react';

const VcNotif = ({ notifications, onJoinCall }) => {
	return (
		<ul className="list-disc pl-5">
			{notifications.map((notification, index) => (
				<li key={index} className="mb-2 flex items-center justify-between">
					<span>{notification.message}</span>
					{notification.message.includes('Join the call at') && (
						<button
							className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
							onClick={() => onJoinCall(notification.message.split(' ').pop())}
						>
							Join Call
						</button>
					)}
				</li>
			))}
		</ul>
	);
};

export default VcNotif;
