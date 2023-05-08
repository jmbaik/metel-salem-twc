import { atom } from "recoil";
// import { recoilPersist } from 'recoil-persist';
import { getUserFromSessionStorage } from "@/utils/sessionStorage";

// const { persistAtom } = recoilPersist();

export const adminUserState = atom({
  key: "adminUserState",
  default: getUserFromSessionStorage(),
  /*
  default: {
    email: '',
    phone: '',
    password: '',
    name: '',
    userId: '',
    cCode: '',
    adminLevel: '',
    churchName: '',
    regDate: '',
    updDate: '',
    token: '',
  },
  effects_UNSTABLE: [persistAtom],
  */
});
