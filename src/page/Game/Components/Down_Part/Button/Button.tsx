import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaQuestionCircle, FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useUser } from '../../../../../context/UserContext';
import './Button.css';

const Button = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useUser();
    const [showShopModal, setShowShopModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    // 退出按钮触发
    useEffect(() => {
        if (showLogout) {
            navigate('/');
        }
    }, [showLogout]);

    return (
        <div className='action-button'>
            <div className="button-group">
                <button
                    type="button"
                    className="ac-button"
                    onClick={() => { setShowShopModal(true) }}
                >
                    <FaShoppingCart /> 商场
                </button>
                <button
                    type="button"
                    className="ac-button"
                    onClick={() => { setShowUserModal(true) }}
                >
                    <FaUser /> 个人
                </button>
            </div>
            <div className="button-group">
                <button
                    type="button"
                    className="ac-button"
                >
                    <FaQuestionCircle /> 帮助
                </button>
                <button
                    type="button"
                    className="ac-button"
                    onClick={() => { setShowLogout(true) }}
                >
                    <FaSignOutAlt /> 退出
                </button>
            </div>

            {/* 商店弹窗 */}
            {showShopModal && (
                <div className="shop-modal-overlay">
                    <div className="shop-modal-content">
                        <h2>商店</h2>
                        <div className="shop-items">
                            {/* 商品列表 */}
                            <div className="shop-item">
                                <img src="roses.jpg" alt="玫瑰花" />
                                <p>玫瑰花</p>
                                <button>购买</button>
                            </div>
                            <div className="shop-item">
                                <img src="love_letter.jpg" alt="情书" />
                                <p>情书</p>
                                <button>购买</button>
                            </div>
                            <div className="shop-item">
                                <img src="necklace.jpg" alt="项链" />
                                <p>项链</p>
                                <button>购买</button>
                            </div>
                            <div className="shop-item">
                                <img src="tickets.jpg" alt="电影票" />
                                <p>电影票</p>
                                <button>购买</button>
                            </div>
                        </div>
                        <button
                            className="close-button"
                            onClick={() => setShowShopModal(false)}
                        >
                            关闭
                        </button>
                    </div>
                </div>
            )}

            {/* 个人信息弹窗 */}
            {showUserModal && (
                <div className="user-modal-overlay">
                    <div className="user-modal-content">
                        <h2>个人信息</h2>
                        <div className="user-info">
                            {isEditing ? (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    setIsEditing(false);
                                }}>
                                    <div>
                                        <label>姓名：</label>
                                        <input
                                            type="text"
                                            value={userInfo.name}
                                            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>年龄：</label>
                                        <input
                                            type="text"
                                            value={userInfo.age}
                                            onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>性格：</label>
                                        <input
                                            type="text"
                                            value={userInfo.personality}
                                            onChange={(e) => setUserInfo({ ...userInfo, personality: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>学历：</label>
                                        <input
                                            type="text"
                                            value={userInfo.education}
                                            onChange={(e) => setUserInfo({ ...userInfo, education: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>外貌特征：</label>
                                        <input
                                            type="text"
                                            value={userInfo.appearance}
                                            onChange={(e) => setUserInfo({ ...userInfo, appearance: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>家庭背景：</label>
                                        <input
                                            type="text"
                                            value={userInfo.familyBackground}
                                            onChange={(e) => setUserInfo({ ...userInfo, familyBackground: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>经济情况：</label>
                                        <input
                                            type="text"
                                            value={userInfo.wealth}
                                            onChange={(e) => setUserInfo({ ...userInfo, wealth: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>头像：</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setUserInfo({ ...userInfo, avatar: e.target.files[0] });
                                                }
                                            }}
                                        />
                                    </div>
                                    <button type="submit" className='save-button'>保存</button>
                                </form>
                            ) : (
                                <>
                                    {userInfo.avatar && (
                                        <img
                                            src={URL.createObjectURL(userInfo.avatar)}
                                            alt="头像"
                                            className="user-avatar"
                                        />
                                    )}
                                    <p><strong>姓名：</strong>{userInfo.name || '未填写'}</p>
                                    <p><strong>年龄：</strong>{userInfo.age || '未填写'}</p>
                                    <p><strong>性格：</strong>{userInfo.personality || '未填写'}</p>
                                    <p><strong>学历：</strong>{userInfo.education || '未填写'}</p>
                                    <p><strong>外貌特征：</strong>{userInfo.appearance || '未填写'}</p>
                                    <p><strong>家庭背景：</strong>{userInfo.familyBackground || '未填写'}</p>
                                    <p><strong>经济情况：</strong>{userInfo.wealth || '未填写'}</p>
                                </>
                            )}
                        </div>
                        <div className="modal-buttons">
                            <button
                                className="edit-button"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? '取消' : '修改信息'}
                            </button>
                            <button
                                className="close-button"
                                onClick={() => setShowUserModal(false)}
                            >
                                关闭
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Button;