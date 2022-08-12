import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "shared/hooks/useFetch";
import JoinTokShow from "../Agora/JoinTokShow";

import "../styles/rooms.css";

interface Props {
  title: string;
  userName: string;
  shopName: string;
  shopImg: string;
  shopDescription: string;
}

const Rooms = () => {
  const { data, getObject } = useFetch();
  let { roomId } = useParams();

  useEffect(() => {
    getObject(`/rooms/rooms/${roomId}`, "GET", {});
  }, []);
  return (
    <>
      {data.event ? (
        <p className="text-blue-40 text-lg mx-auto w-80">
          Waiting for the host to start the event
        </p>
      ) : (
        <JoinTokShow />
      )}
    </>
  );
};

export default Rooms;
