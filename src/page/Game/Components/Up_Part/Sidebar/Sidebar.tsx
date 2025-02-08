import React, { useState } from 'react';
import styled from 'styled-components';

// 类型定义
interface SidebarProps {
  width?: string;
  collapsedWidth?: string;
  transitionDuration?: number;
  backgroundColor?: string;
  children?: React.ReactNode;
}

interface MenuItem {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
}

// 侧边栏容器
const SidebarContainer = styled.div<{
  $collapsed: boolean;
  $width: string;
  $collapsedWidth: string;
  $transitionDuration: number;
  $backgroundColor: string;
}>`
  height: 100vh;
  position: relative;
  background-color: ${(props) => props.$backgroundColor};
  width: ${(props) => (props.$collapsed ? props.$collapsedWidth : props.$width)};
  transition: width ${(props) => props.$transitionDuration}ms ease;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

// 内容容器
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
`;

// 菜单项样式
const MenuItemButton = styled.button<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  span {
    opacity: ${(props) => (props.$collapsed ? 0 : 1)};
    transition: opacity 0.2s;
    white-space: nowrap;
  }
`;

// 切换按钮
const ToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: -2.5rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Sidebar: React.FC<SidebarProps> = ({
  width = '250px',
  collapsedWidth = '60px',
  transitionDuration = 300,
  backgroundColor = '#2c3e50',
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContainer
      $collapsed={isCollapsed}
      $width={width}
      $collapsedWidth={collapsedWidth}
      $transitionDuration={transitionDuration}
      $backgroundColor={backgroundColor}
    >
      <Content>
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            $collapsed: isCollapsed
          })
        )}
      </Content>
      <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? '→' : '←'}
      </ToggleButton>
    </SidebarContainer>
  );
};

// 菜单项组件
const SidebarMenuItem: React.FC<{ item: MenuItem; $collapsed?: boolean }> = ({
  item,
  $collapsed = false
}) => {
  return (
    <MenuItemButton
      $collapsed={$collapsed}
      onClick={item.onClick}
      aria-label={item.text}
    >
      {item.icon}
      <span>{item.text}</span>
    </MenuItemButton>
  );
};

export { Sidebar, SidebarMenuItem };
