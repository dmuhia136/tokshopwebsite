import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { user } from "shared/recoil/user";
import "shared/styles/scroller.css";
import { db } from "shared/firebase/index";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
import moment from "moment";

async function getChats(id: string) {
  const chatsCol = collection(db, `chats/${id}/messages`);
  const chatSnapshot = await getDocs(chatsCol);
  const chatList = chatSnapshot.docs.map((doc) => doc.data());
  return chatList;
}

const Chat: React.FC<{ id: string }> = ({ id }) => {
  const { _id, userName, profilePhoto } = useRecoilValue<any>(user);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<any>([]);
  const ref = useRef<any>(null);

  

  const sendMsg = async () => {
    var msgRef = doc(db, `chats/${id}/messages/${Date.now()}`);
    await setDoc(msgRef, {
      date: Date.now(),
      id: id,
      message: text,
      seen: false,
      sender: _id,
      senderName: userName ?? "",
      senderProfileUrl: profilePhoto ?? "",
    });

    ref.current?.scrollIntoView({ behavior: "smooth" });
  };



  useEffect(() => {
    const q = query(collection(db, `chats/${id}/messages`));
    onSnapshot(q, (querySnapshot) => {
      const updateUser: any = [];
      querySnapshot.forEach((doc) => {
        updateUser.push(doc.data());
      });
      setMsgs([...updateUser]);
      ref.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div className="flex flex-col lg:min-w-[25rem] h-[40vh] lg:h-[80vh] relative">
      <div className="flex flex-col gap-4  mt-4 overflow-y-auto py-8">
        {msgs.map((msg: any, index: number) => (
          <div
            className={`${
              msg.sender === _id ? "self-start" : "self-end"
            } flex flex-col relative w-full`}
          >
            {msg.sender !== _id && (
              <p className="text-xs self-end">{msg.senderName}</p>
            )}
            <p
              key={index}
              className={`${
                msg.sender === _id
                  ? "bg-gray-400 self-start"
                  : "bg-blue-40 self-end"
              }
                py-1 px-4 rounded-lg text-white text-xl flex flex-wrap  break-all w-2/3`}
            >
              {msg.message}
            </p>
            {msg.sender !== _id && (
              <p className="text-xs self-end">{moment(msg.date).fromNow()}</p>
            )}
          </div>
        ))}
        <div ref={ref} className="" />
      </div>

      <div className="flex gap-4 mt-6 absolute bottom-0 z-10 bg-white w-full">
        <textarea
          value={text}
          onChange={(evt) => setText(evt.target.value)}
          placeholder="Type something"
          id=""
          className="inputs justify-end lg:w-[20rem] scroller border-blue-30 focus:border-blue-30"
        />
        <FontAwesomeIcon
          onClick={() => {
            text.length > 0 && sendMsg();
            setText("");
          }}
          className="text-3xl text-white rotate-45 w-7 h-7 rounded-full border-[1px] border-blue-40 p-1 bg-blue-40"
          icon={faLocationArrow}
        />
      </div>
    </div>
  );
};

export default Chat;
