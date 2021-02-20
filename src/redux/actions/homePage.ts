import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { IAppState } from '../../interface/state';
import {
  TAllAction,
  EHomePageAction,
  IHomePageAction,
} from '../../interface/action';
import Firebase from '../../service';

export const setProgressUpload = (progressUpload: number): IHomePageAction => ({
  type: EHomePageAction.HOME_SET_PROGRESS,
  payload: { progressUpload },
});

export const setLoading = (isLoading: boolean): IHomePageAction => ({
  type: EHomePageAction.HOME_SET_LOADING,
  payload: { isLoading },
});

export const resetStateData = () => ({
  type: EHomePageAction.HOME_RESET_STATE,
});

export const uploadPPT = (
  slideName: string,
  file: any,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    const firebase = new Firebase();
    const uploadTask = firebase.uploadPPT(slideName, file);

    dispatch(setLoading(true));
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        dispatch(setProgressUpload(progress));
      },
      (error) => {
        toast.error(error);
        dispatch(setLoading(false));
      },
      () => {
        toast.success('file has been upload successfully ...');
        setTimeout(() => {
          dispatch(setProgressUpload(0));
        }, 500);
        dispatch(setLoading(false));
      },
    );
  } catch (err) {
    toast.error(err);
    dispatch(setLoading(false));
  }
};
