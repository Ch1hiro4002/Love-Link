import { useState } from 'react';
import { useUser } from '../../../../../context/UserContext';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpened, setIsOpened] = useState(false);
    const { userInfo } = useUser();

    return (
        <div className={`sidebar ${isOpened ? '' : 'collapsed'}`}>
            {isOpened ? (
                <>
                    {/* 侧边栏顶部图片 */}
                    <div className="sidebar-header">
                        {userInfo.avatar && (
                            <img
                                src={URL.createObjectURL(userInfo.avatar)}
                                alt="Profile"
                                className="profile-image"
                            />
                        )}
                    </div>

                    {/* 个人信息 */}
                    <div className="sidebar-content">
                        <h3>{userInfo.name || 'UserName'}</h3>
                        <p>Name：{userInfo.age || 'NULL'}</p>
                        <p>Age：{userInfo.personality || 'NULL'}</p>
                        <p>Disposition：{userInfo.education || 'NULL'}</p>
                        <p>Degree：{userInfo.appearance || 'NULL'}</p>
                        <p>Appearance：{userInfo.familyBackground || 'NULL'}</p>
                        <p>Background：{userInfo.wealth || 'NULL'}</p>
                    </div>
                </>
            ) : (
                <div className="collapsed-text">Profile</div>
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