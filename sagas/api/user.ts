import { reduxSagaFirebase } from '../../util/firebase';

export const signupAPI = (data: any) => reduxSagaFirebase.auth.createUserWithEmailAndPassword(data.email, data.password);
