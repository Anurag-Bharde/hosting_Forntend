import {atom} from 'recoil'

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(savedValue);
  }

  onSet((newValue, _, isReset) => {
    if (isReset) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, newValue);
    }
  });
};

export const valuer=atom({
     key: 'usernameState',
  default: '',
  effects_UNSTABLE: [localStorageEffect('username')],

})