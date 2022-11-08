// react state 관리 라이브러리 recoil
// isDarkAtom 이란 state를 생성 키는 isDark 로 받아야 하며 값은 false

// recoil의 값을 받아올 땐 useRecoilValue(isDarkAtom)
// recoil의 값을 수정할땐 useSetRecoilState(isDarkAtom) 로 function 을 호출해서 사용

// recoil 값과 수정 둘다 하려면 useRecoilState(isDarkAtom) 를 사용 const [isDark, setIsDark] = useRecoilState(isDarkAtom)
import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist"; // 리코일을 로컬 스토리지에 저장 (새로고침해도 안사라짐)
const { persistAtom } = recoilPersist();

// 로그인 시 사용될 예정 토큰, 유저아이디, 유저명 저장
export const isLoginAtom = atom({
  key: 'isToken',
  default: '',
  effects_UNSTABLE: [persistAtom], // 새로고침 해도 안사라짐
});

// default 값을 obejct로도 설정 가능 default: { access: false, user: "", id: 0 },