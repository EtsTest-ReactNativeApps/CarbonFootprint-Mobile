/*
 *	Google Native Login Action
*/

import GoogleSignIn from 'react-native-google-sign-in';
import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';

import { googleSignInConfig } from '../config/keys';
import {
	receiveAuth,
	receiveError
} from './AuthAction';
import { loginCustomFirebase } from './firebase/Auth';

export function googleSignIn() {
	return function (dispatch) {
		alert("Trying to sign in");
	    GoogleSignIn.configure(googleSignInConfig)
		.then(() => {
			GoogleSignIn.signInPromise()
			.then((data) => {
				loginCustomFirebase("google", data.idToken, data.accessToken)
				.then((user) => {
					alert("Signed in");
					dispatch(receiveAuth(user));
					Actions.main({type: ActionConst.RESET});
				})
				.catch((error) => {
					alert("Error");
					dispatch(receiveError(error));
				})
			})
			.catch((error) => {
				alert(error.message);
			})
		})
	}
}