import React from 'react';

const NotificationModal = ({ notifications, onClose, onJoinCall }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-50">
				<h2 className="flex justify-center text-2xl mb-4">Notifications</h2>
				<ul>
					{notifications.map((notification) => (
						<li key={notification._id} className="mb-2 flex justify-between items-center">
							<span>{notification.message}</span>
							{notification.message.includes('Join the call at') && (
								<button
									className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
									onClick={() => onJoinCall(notification.message.split(' ').pop())}
								>
									Join
								</button>
							)}
						</li>
					))}
				</ul>
				<div className="flex justify-center">
					<button
						className=" mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
						onClick={onClose}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default NotificationModal;
