import react, { useState } from "react";
import axios from "axios";
import { localhost } from "../consts";
import UserCookie from "../utils/cookie";

import styled from "styled-components";
import "../styles/SetNickname.scss";

function SetNickname() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [nickname, setNickname] = useState("");

  const handleInput = (e) => {
    const input = e.target.value;

    if (input.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setNickname(input);
  };

  const handleNextButton = async () => {
    if (!isDisabled) {
      try {
        const response = await axios.get(
          `http://${localhost}:5000/user/id?nickname="${nickname}"`
        );
        const userId = response.data.id;

        if (userId === -1) {
          const res = await axios.get(
            `http://${localhost}:5000/user/create?nickname="${nickname}"`
          );

          const createdId = res.data.id;
          UserCookie.saveUserId(createdId);
          window.location.assign("/set-taste");
        } else {
          UserCookie.saveUserId(userId);
          window.location.assign("/main");
        }
      } catch (err) {
        console.log("@@@@@@@ handle next button error", err);
      }
    }
  };

  return (
    <div className="set-nickname">
      <div className="set-nickname__text">
        <span>Input Your Nickname!</span>
      </div>
      <div className="set-nickname__form-nickname">
        <input className="main-input" onChange={handleInput}></input>
        <NextButton
          className="main-button"
          disabled={isDisabled}
          onClick={handleNextButton}
        >
          NEXT
        </NextButton>
      </div>
    </div>
  );
}

const NextButton = styled.button`
  background-color: ${(props) =>
    props.disabled ? "gray" : "var(--main-purple)"};
`;

export default SetNickname;
