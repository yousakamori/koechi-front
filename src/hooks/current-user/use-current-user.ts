import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState } from '@/state/current-user';
// ___________________________________________________________________________
//
export const useCurrentUser = () => {
  const currentUser = useRecoilValue(currentUserState);
  const authChecking = currentUser === undefined;
  const setCurrentUser = useSetRecoilState(currentUserState);
  // ___________________________________________________________________________
  //
  return {
    currentUser,
    authChecking,
    setCurrentUser,
  };
};
