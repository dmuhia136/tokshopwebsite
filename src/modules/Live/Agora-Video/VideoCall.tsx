import { ShowStore } from "modules/Live/store/ShowStore";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import useFetch from "shared/hooks/useFetch";
import { user } from "shared/recoil/user";

import TokShowVideo from "shared/components/rooms/TokShowVideo";

const VideoCall = () => {
  const show = useRecoilValue(ShowStore);
  const { _id } = useRecoilValue<any>(user);
  const resetStore = useResetRecoilState(ShowStore);

  const { getObject } = useFetch();
  const [room, setRoom] = useState<any>();
  let userData = useRecoilValue<any>(user);
  const createRoom = async () => {
    let room = await getObject(`rooms/${_id}`, "POST", {
      title: show.title,
      token: "",
      productIds: [show.product.id],
      hostIds: [_id],
      userIds: [],
      raisedHands: [],
      speakerIds: [],
      invitedIds: [],
      shopId: show.product.shopId,
      status: true,
      productPrice: show.product.price,
      productImages: show.product.images,
      description: show.description,
    });
    let agoraToken = await getObject(
      `rooms/agora/rooom/generatetoken`,
      "POST",
      {
        channel: room._id,
        uid: _id,
      }
    );
    let newRoom = await getObject(`rooms/rooms/updatenew/${room._id}`, "PUT", {
      token: agoraToken.token,
      activeTime: Date.now(),
    });
    setRoom(newRoom);
    
  };

  useEffect(() => {
    createRoom();
    return ()=>{
      resetStore()
    }
  }, []);

  return <TokShowVideo room={room} userData={userData} />;
};

export default VideoCall;
