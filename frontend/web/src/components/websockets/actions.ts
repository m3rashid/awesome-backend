import { SetterOrUpdater } from 'recoil';

const handleServerMessage = (
  msg: string,
  auth: AuthAtom | null,
  setAuth: SetterOrUpdater<AuthAtom | null>
) => {
  try {
    const message = JSON.parse(msg) as ServerToClientMessageFormat;
    console.log(message);
    if (message.actionType === 'logout') {
      localStorage.removeItem('awesome:token');
      console.log('logout', auth);
      setAuth(null);
    }
  } catch (err: any) {
    console.log(err);
  }
};

export default handleServerMessage;
