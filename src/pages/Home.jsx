import React, { useContext, useReducer, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Home.module.css";
import logo from "../assets/images/logo.gif";
import { io } from "socket.io-client";
import { useTranslation } from "react-i18next";
import { generateString } from "../utils/helper/helper";
import { Theme } from "../utils/theme/ThemeContext";
import { updateRoomId } from "../redux/gameSlice";
import { useDispatch } from "react-redux";
import Loading from "../assets/images/loading.gif";

const URL = process.env.REACT_APP_SOCKET_URL;

export const color_coordinated = [
  { id: "1", x: -100, y: 0 },
  { id: "2", x: -200, y: 0 },
  { id: "3", x: -400, y: 0 },
  { id: "4", x: -500, y: 0 },
  { id: "5", x: -600, y: 0 },
  { id: "6", x: -700, y: 0 },
  { id: "7", x: -800, y: 0 },
  { id: "7", x: -900, y: 0 },
];
export const eyes_coordinated = [
  { id: "1", x: -100, y: 0 },
  { id: "2", x: -200, y: 0 },
  { id: "3", x: -400, y: 0 },
  { id: "4", x: -500, y: 0 },
  { id: "5", x: -600, y: 0 },
  { id: "6", x: -700, y: 0 },
  { id: "7", x: -800, y: 0 },
  { id: "7", x: -900, y: 0 },
];
export const mouth_coordinated = [
  { id: "1", x: -100, y: 0 },
  { id: "2", x: -200, y: 0 },
  { id: "3", x: -400, y: 0 },
  { id: "4", x: -500, y: 0 },
  { id: "5", x: -600, y: 0 },
  { id: "6", x: -700, y: 0 },
  { id: "7", x: -800, y: 0 },
  { id: "7", x: -900, y: 0 },
];
export const special_coordinated = [
  { id: "1", x: -100, y: 0 },
  { id: "2", x: -200, y: 0 },
  { id: "3", x: -400, y: 0 },
  { id: "4", x: -500, y: 0 },
  { id: "5", x: -600, y: 0 },
  { id: "6", x: -700, y: 0 },
  { id: "7", x: -800, y: 0 },
  { id: "7", x: -900, y: 0 },
];
export const avatar_list = [
  { id: "1", x: -100, y: 0 },
  { id: "2", x: -200, y: 0 },
  { id: "3", x: -400, y: 0 },
  { id: "4", x: -500, y: 0 },
  { id: "5", x: -600, y: 0 },
  { id: "6", x: -700, y: 0 },
  { id: "7", x: -800, y: 0 },
  { id: "7", x: -900, y: 0 },
];

function generateIndex(index, list) {
  const len = list.length;
  if (index == -999) {
    const index = Math.floor(Math.random() * len);
    return index;
  } else {
    if (index <= -1) {
      return len - 1;
    } else if (index >= len) {
      return 0;
    } else return index;
  }
}

function avatarReducer(state, action) {
  let ind;
  console.log(action);
  const { type, index } = action;
  console.log(type);
  switch (type) {
    case "color":
      ind = generateIndex(index, color_coordinated);
      return { ...state, color: ind };
    case "eyes":
      ind = generateIndex(index, eyes_coordinated);
      console.log(state.eyes, ind);
      return { ...state, eyes: ind };
    case "mouth":
      ind = generateIndex(index, mouth_coordinated);
      return { ...state, mouth: ind };
    case "special":
      ind = generateIndex(index, special_coordinated);
      return { ...state, special: ind };
    default:
      return {
        ...state,
        color: generateIndex(-999, color_coordinated),
        eyes: generateIndex(-999, eyes_coordinated),
        mouth: generateIndex(-999, mouth_coordinated),
        special: generateIndex(-999, special_coordinated),
      };
  }
}

function miniAvatarReducer(state, action) {
  let ind;
  const { type, index } = action;
  switch (type) {
    case "color":
      ind = generateIndex(index, color_coordinated);
      return { ...state, color: ind };
    case "eyes":
      ind = generateIndex(index, eyes_coordinated);
      console.log(state.eyes, ind);
      return { ...state, eyes: ind };
    case "mouth":
      ind = generateIndex(index, mouth_coordinated);
      return { ...state, mouth: ind };
    case "special":
      ind = generateIndex(index, special_coordinated);
      return { ...state, special: ind };
    default:
      return {
        ...state,
        color: generateIndex(-999, color_coordinated),
        eyes: generateIndex(-999, eyes_coordinated),
        mouth: generateIndex(-999, mouth_coordinated),
        special: generateIndex(-999, special_coordinated),
      };
  }
}

const Login = () => {
  const { roomId } = useParams();
  console.log("--------------", roomId, typeof roomId);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatar, dispatchAvatar] = useReducer(avatarReducer, {
    color: Math.floor(Math.random() * color_coordinated.length),
    eyes: Math.floor(Math.random() * eyes_coordinated.length),
    mouth: Math.floor(Math.random() * mouth_coordinated.length),
    special: Math.floor(Math.random() * special_coordinated.length),
  });
  const [miniAvatar, changeMiniAvatar] = useState(
    Array.from({ length: 8 }, (_, index) => ({
      id: index.toString(),
      color: index + 1,
      eyes: generateIndex(-999, eyes_coordinated),
      mouth: generateIndex(-999, mouth_coordinated),
      special: generateIndex(-999, special_coordinated),
    }))
  );
  const [active, setActive] = useState(new Array(8).fill(false));
  const [name, setName] = useState("");
  const [lang, setLang] = useState("eng");
  const { updateSocket } = useContext(Theme);

  //  useEffect(() => {

  //    return () => {

  //    }
  //  }, [])

  const updateMiniAvatar = (index) => {
    changeMiniAvatar((prevState) =>
      prevState.map((avatar, i) => {
        if (i === index) {
          return {
            ...avatar,
            eyes: generateIndex(-999, eyes_coordinated),
            mouth: generateIndex(-999, mouth_coordinated),
            special: generateIndex(-999, special_coordinated),
          };
        }
        return avatar;
      })
    );
    let newActive = [...active];
    newActive.splice(index, 1, true);
    setActive(newActive);
    setTimeout(() => {
      setActive(new Array(8).fill(false));
    }, 100);
  };

  async function establishSocketConnection() {
    setLoading(true);
    const { createSocket } = await import("../utils/socket");
    try {
      const socket = createSocket(URL);
      updateSocket(socket);
      socket.on("joined", (data) => {
        dispatch(updateRoomId(data.roomId));
        console.log(data, data.roomId);
        navigate("/dashboard");
      });
      socket.on("join-error", (data) => {
        console.log(data);
      });
      return socket;
    } catch (err) {
      console.log(err);
    }
  }

  const joinRoom = async () => {
    console.log(roomId, !roomId);
    if (!roomId) return;
    if (!name || name.length < 3) return;
    const socket = await establishSocketConnection();
    console.log(socket);
    const roomName = generateString(6);
    console.log(roomName);

    socket.emit("join", { roomId: roomId, name: name, avatar: avatar });
    socket.on("joined", (data) => console.log(data));
  };

  const createRoom = async () => {
    if (!name || name.length < 3) return;
    const socket = await establishSocketConnection();
    console.log(socket);

    console.log(socket);
    console.log(name);
    socket.emit("create-room", { name: name, avatar: avatar });
  };

  const changeLang = (e) => {};
  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex:'99999'
          }}
        >
          <img src={Loading} alt="loading..." style={{width:'8rem',height:'8rem'}}/>
        </div>
      )}
      <div className={styles.home}>
        <div className={styles.logo_big}>
          <Link to="/">
            <span>
              <div>clone</div>
            </span>
            <img src={logo} alt="LOGO" />
          </Link>
          <div className={styles.mini_avatar_container}>
            {miniAvatar.map((data, index) => (
              <div
                className={`${styles.mini_avatar} ${active[index] ? styles.clicked : ""}`}
                style={{ "--size": 48 + "px" }}
                onClick={() => updateMiniAvatar(index)}
              >
                <div
                  className={styles.color}
                  style={{
                    "--coordinateX": color_coordinated[data.color]?.x + "%",
                    "--coordinateY": color_coordinated[data.color]?.y + "%",
                  }}
                ></div>
                <div
                  className={styles.eyes}
                  style={{
                    "--coordinateX": eyes_coordinated[data.eyes].x + "%",
                    "--coordinateY": eyes_coordinated[data.eyes].y + "%",
                  }}
                ></div>
                <div
                  className={styles.mouth}
                  style={{
                    "--coordinateX": mouth_coordinated[data.mouth].x + "%",
                    "--coordinateY": mouth_coordinated[data.mouth].y + "%",
                  }}
                ></div>
                <div
                  className={styles.special}
                  style={{
                    "--coordinateX": special_coordinated[data.special].x + "%",
                    "--coordinateY": special_coordinated[data.special].y + "%",
                  }}
                ></div>
                <div className={styles.owner}></div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.form}>
            <input
              placeholder={t("input_1")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className={styles.avatar_customizer}>
            <div
              className={styles.randomise}
              onClick={() => dispatchAvatar({ type: "", index: -999 })}
            ></div>
            <div className={styles.arrows}>
              <div
                className={styles.arrow_left}
                onClick={() =>
                  dispatchAvatar({
                    type: "color",
                    index: avatar.color - 1,
                  })
                }
              ></div>
              <div
                className={styles.arrow_left}
                onClick={() =>
                  dispatchAvatar({
                    type: "eyes",
                    index: avatar.eyes - 1,
                  })
                }
              ></div>
              <div
                className={styles.arrow_left}
                onClick={() =>
                  dispatchAvatar({
                    type: "mouth",
                    index: avatar.mouth - 1,
                  })
                }
              ></div>
            </div>
            <div className={styles.avatar_container}>
              <div className={styles.avatar} style={{ "--size": 96 + "px" }}>
                <div
                  className={styles.color}
                  style={{
                    "--coordinateX": color_coordinated[avatar.color].x + "%",
                    "--coordinateY": color_coordinated[avatar.color].y + "%",
                  }}
                ></div>
                <div
                  className={styles.eyes}
                  style={{
                    "--coordinateX": eyes_coordinated[avatar.eyes].x + "%",
                    "--coordinateY": eyes_coordinated[avatar.eyes].y + "%",
                  }}
                ></div>
                <div
                  className={styles.mouth}
                  style={{
                    "--coordinateX": mouth_coordinated[avatar.mouth].x + "%",
                    "--coordinateY": mouth_coordinated[avatar.mouth].y + "%",
                  }}
                ></div>
                {/* <div className={styles.special}></div> */}
                <div className={styles.owner}></div>
              </div>
            </div>
            <div className={styles.arrows}>
              <div
                className={styles.arrow_right}
                onClick={() =>
                  dispatchAvatar({
                    type: "color",
                    index: avatar.color + 1,
                  })
                }
              ></div>
              <div
                className={styles.arrow_right}
                onClick={() =>
                  dispatchAvatar({
                    type: "eyes",
                    index: avatar.eyes + 1,
                  })
                }
              ></div>
              <div
                className={styles.arrow_right}
                onClick={() =>
                  dispatchAvatar({
                    type: "mouth",
                    index: avatar.mouth + 1,
                  })
                }
              ></div>
            </div>
          </div>
          <button
            className={`${styles.button} ${styles.play}`}
            onClick={joinRoom}
          >
            <span>{t("btn_1")}</span>
          </button>
          <button
            className={`${styles.button} ${styles.create}`}
            onClick={createRoom}
          >
            <span>{t("btn_2")}</span>
          </button>
        </div>
      </div>
      {/* // <form>
    //     <div class="avatar">
    //         <div class="color" style="background-position: -700% 0%;"></div>
    //         <div class="eyes" style="background-position: -400% -500%;"></div><div class="mouth" style="background-position: -300% 0%;"></div>
    //         <div class="special" style="display: none;"></div>
    //         <div class="owner" style="display: none;"></div>
    //     </div>
    // </form> */}
    </>
  );
};

export default Login;
