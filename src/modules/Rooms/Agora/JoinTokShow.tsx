import { useEffect, useState } from "react";
import useFetch from "shared/hooks/useFetch";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "shared/recoil/user";
import TokShowVideo from "shared/components/rooms/TokShowVideo";

const VideoCall = () => {
  let userData = useRecoilValue<any>(user);


  const { getObject } = useFetch();
  const [room, setRoom] = useState<any>({});
  const { roomId } = useParams<string>();

  const getRoom = async () => {
    let data = await getObject(`/rooms/rooms/${roomId}`, "GET", {});
    setRoom(data);
  };

  useEffect(() => {
    getRoom();
  }, []);

  return <TokShowVideo room={room} userData={userData} />;
};

export default VideoCall;
