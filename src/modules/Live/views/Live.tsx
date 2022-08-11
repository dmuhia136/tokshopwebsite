import {Route, Routes} from "react-router-dom";
import History from "../components/Rooms/History";
import One from "../components/One/One";
import Two from "../components/Two/Two";
import Three from "../components/Three/Three";
import VideoCall from "../Agora-Video/VideoCall";

const Live = () => {
  return (
    <div className="bg-teal-50 -mt-8 w-full min-h-screen">
      <Routes>
        <Route index element={<One />} />
        <Route path="/two" element={<Two/>} />
        <Route path="/three" element={<Three />} />
        <Route path="/show" element={<VideoCall/>} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
};

export default Live;
