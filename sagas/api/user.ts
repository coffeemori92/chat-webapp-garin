import { reduxSagaFirebase } from '../../util/firebase';

export const signupAPI = (data: any) => reduxSagaFirebase.auth.createUserWithEmailAndPassword(data.email, data.password);
export const socialLoginAPI = (data: any) => reduxSagaFirebase.auth.signInWithPopup(data);
export const loginAPI = (data: any) => reduxSagaFirebase.auth.signInWithEmailAndPassword(data.email, data.password);
export const logoutAPI = () => reduxSagaFirebase.auth.signOut();