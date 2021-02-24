import { ThunkAction } from 'redux-thunk';
import { History } from 'history';
import { toast } from 'react-toastify';
import { IAppState } from '../../interface/state';
import {
  TAllAction,
  ESubjectConfigPageAction,
  ISubjectConfigPageAction,
} from '../../interface/action';
import { ISubjectModels } from '../../interface/model';
import Firebase from '../../service';

const setLoading = (isLoading: boolean): ISubjectConfigPageAction => ({
  type: ESubjectConfigPageAction.SUBJECT_SET_LOADING,
  payload: { isLoading },
});

export const setErrors = (errors: { [key: string]: string }): ISubjectConfigPageAction => ({
  type: ESubjectConfigPageAction.SUBJECT_SET_ERRORS,
  payload: { errors },
});

export const resetStateData = () => ({
  type: ESubjectConfigPageAction.SUBJECT_RESET_STATE,
});

export const setFormData = (form: ISubjectModels): ISubjectConfigPageAction => ({
  type: ESubjectConfigPageAction.SUBJECT_SET_FORM,
  payload: { form },
});

export const addSubject = (
  form: ISubjectModels,
  history: History,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const firebase = new Firebase();
    await firebase.addDocumentToCollections('subjects', form);
    history.push('/subjects');
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};
