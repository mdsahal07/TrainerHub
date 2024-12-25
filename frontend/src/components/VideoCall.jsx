
import React, { useEffect } from "react";

const VideoCall = () => {
  useEffect(() => {
    // Dynamically load the Jitsi Meet API script
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Jitsi Meet once the script is loaded
      const domain = "meet.jit.si";
      const options = {
        roomName: `TrainerHub-${Date.now()}`, // Unique room name
        width: "100%",
        height: 700,
        parentNode: document.getElementById("jitsi-container"),
        userInfo: {
          displayName: localStorage.getItem("username") || "Guest", // User's display name
        },
        configOverwrite: {
          prejoinPageEnabled: false, // Skip the pre-join screen
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            "microphone", "camera", "chat", "desktop", "fullscreen", "hangup",
          ],
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      // Clean up the script and meeting instance when the component unmounts
      return () => {
        api.dispose();
        document.body.removeChild(script);
      };
    };

    script.onerror = () => {
      console.error("Jitsi Meet API script failed to load.");
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div id="jitsi-container" style={{ width: "100%", height: "700px" }}></div>
    </div>
  );
};

export default VideoCall;
