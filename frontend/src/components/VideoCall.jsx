import React from 'react';
import { useParams } from 'react-router-dom';

const VideoCall = () => {
  const { roomId } = useParams();

  return (
    <div>
      <h1>Video Call</h1>
      <iframe
        src={`https://meet.jit.si/${roomId}`}
        style={{ width: '100%', height: '500px', border: 'none' }}
        allow="camera; microphone"
      ></iframe>
    </div>
  );
};

export default VideoCall;
