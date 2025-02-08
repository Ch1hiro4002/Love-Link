import { useState } from 'react';
import './Sidebar.css'; // 引入样式文件

const Sidebar = () => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className={`sidebar ${isOpened ? '' : 'collapsed'}`}>
            {isOpened ? (
                <>
                    {/* 侧边栏顶部图片 */}
                    <div className="sidebar-header">
                        <img
                            src="https://oss-of-ch1hiro.oss-cn-beijing.aliyuncs.com/imgs/202407082229562.jpg" // 替换为你的图片URL
                            alt="Profile"
                            className="profile-image"
                        />
                    </div>

                    {/* 个人信息 */}
                    <div className="sidebar-content">
                        <h3>用户名</h3>
                        <p>邮箱：user@example.com</p>
                        <p>角色：玩家</p>
                    </div>
                </>
            )  : (
                <div className="collapsed-text">个人信息</div>
            )}

            {/* 隐藏/显示按钮 */}
            <button
                className="toggle-button"
                onClick={() => setIsOpened(!isOpened)}
            >
                {isOpened ? '<' : '>'}
            </button>
        </div>
    );
};

export default Sidebar;