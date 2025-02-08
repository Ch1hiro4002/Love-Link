// src/page/Home/Home.tsx

import Logo from "../../assets/Logo/Logo";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* 背景装饰 */}
      <div className="background"></div>

      {/* 游戏 Logo */}
      <h1 className="logo"><Logo /></h1>

      {/* 主题介绍 */}
      <h2 className="theme">「命中注定的相遇，区块链见证的爱情」</h2>

      {/* 背景故事 */}
      <p className="story">
        在未来世界，每个人的缘分都被星象计算。当两颗相匹配的灵魂
        相遇，区块链将会记录这段奇妙的旅程。你，准备好邂逅你的命运之人了吗？
      </p>

      {/* 进入游戏按钮 */}
      <button className="start-button" onClick={() => navigate("/login")}>
        进入游戏
      </button>
    </div>
  );
};

export default Home;