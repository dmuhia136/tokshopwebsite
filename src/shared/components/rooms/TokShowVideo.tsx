import AgoraUIKit, { PropsInterface } from "agora-react-uikit";
import React, { useEffect, useState } from "react";
import { IAgoraRTCRemoteUser, NetworkQuality } from "agora-rtc-sdk-ng";
import Tab from "../VideoTabs/Tab";
import useSpinner from "../spinner/useSpinner";
import { useNavigate } from "react-router-dom";
const TokShowVideo: React.FC<{ room: any; userData: any }> = ({
  room,
  userData,
}) => {
  const appId: any = import.meta.env.VITE_appId;
  const [start, setStart] = useState<boolean>(false);
  const join = async (room: any) => {


    var props: PropsInterface = {
      rtcProps: {
        appId: appId,
        channel: room?._id,
        role: room?.ownerId?._id == userData._id ? "host" : "audience",
        layout: 0,
        uid: userData.agorauid,
        token: room?.token,
        enableAudio: room?.ownerId?._id == userData._id,
        enableVideo: room?.ownerId?._id == userData._id,
      },
      callbacks: {
        EndCall: () => setVideocall(false),
        "user-joined": (user: IAgoraRTCRemoteUser) => {
          setAllUsers(allusers++);
        },
        "user-left": (user: IAgoraRTCRemoteUser) => {},
        "network-quality": (stats: NetworkQuality) => {},
      },
      styleProps: {
        localBtnContainer: { backgroundColor: "blueviolet" },
      },
    };
    setRoomProps(props);
    setStart(true);
  };

  const [videocall, setVideocall] = useState(true);
  var [allusers, setAllUsers] = useState(0);
  const [props, setRoomProps] = useState<PropsInterface>();
  const { renderSpinner } = useSpinner();
  const navigate = useNavigate();

  useEffect(() => {
    room?._id?.length > 0 && room?.token?.length > 0 && join(room);
  }, [room]);

  return (
    <div className="flex flex-col lg:flex-row w-full gap px-2 lg:-mt-10">
      <div className="absolute top-1/4 left-1/2">{renderSpinner(!start)}</div>
      <div className="flex min-h-[70vh] lg:min-h-[90vh] w-full relative">
        {props && start && (
          <AgoraUIKit
            rtcProps={props.rtcProps}
            callbacks={props.callbacks}
            styleProps={props.styleProps}
          />
        )}
        <div className="flex flex-col absolute z-20 top-5 left-5 ">
          <div className="flex items-center gap-4">
            <img
              src={room?.shopId?.image}
              alt=""
              className="w-20 h-20 lg:w-32 lg:h-32 object-scale-down rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{room?.title}</p>
              <p className=" font-semibold">
                <span className="font-light">by</span>
                {"   "}
                {room?.ownerId?.firstName}
                {"  "}
                {room?.ownerId?.lastName}
              </p>
            </div>
          </div>
        </div>

        {room?.ownerId?._id !== userData._id && (
          <div className="absolute flex left-5 bottom-32">
            <button
              onClick={() => navigate(`/product/${room?.productIds[0]?._id}`)}
              className="red-btn"
            >
              From{"    "}${room?.productPrice}
              {"    "} buy
            </button>
          </div>
        )}
      </div>
      <div className="">{start && <Tab room={room} />}</div>
    </div>
  );
};

export default TokShowVideo;
