import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * 用户信息store类型
 */
export interface usersStoreType {
  token: string;
  roles: string[];
  setToken(value: string): void;
}

export const useSettingStore = create<usersStoreType>()(
  persist(
    (set) => ({
      token: '', // 登录token
      roles: [], // 权限角色

      // 设置token
      setToken: (value: string) => set({ token: value }),
    }),
    {
      // 进行持久化存储
      name: 'userStorage', // 本地存储的名称
      storage: createJSONStorage(() => localStorage), // 保存的位置
    }
  )
);
