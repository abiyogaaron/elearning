import { ThunkAction } from 'redux-thunk';
import { batch } from 'react-redux';
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

const TABLE_NAME = 'subjects';

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

export const setFormDefaultData = (formDefault: ISubjectModels): ISubjectConfigPageAction => ({
  type: ESubjectConfigPageAction.SUBJECT_SET_FORM_DEFAULT,
  payload: { formDefault },
});

export const addSubject = (
  form: ISubjectModels,
  history: History,
  userId: string,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const formData = { ...form };
    formData.created_at = new Date().getTime();
    formData.created_by = userId;

    const firebase = new Firebase();
    await firebase.addDocumentToCollections<ISubjectModels>(TABLE_NAME, formData);
    history.push('/subjects');
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getSubjectById = (
  id: string,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const firebase = new Firebase();
    const subject = await firebase.getDocumentsFromCollectionsById<ISubjectModels>(TABLE_NAME, id);
    batch(() => {
      dispatch(setFormData(subject));
      dispatch(setFormDefaultData(subject));
    });
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateSubject = (
  form: ISubjectModels,
  id: string,
  userId: string,
): ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const firebase = new Firebase();
    const formData = { ...form };
    formData.updated_at = new Date().getTime();
    formData.updated_by = userId;

    await firebase.updateDocumentsFromCollections<ISubjectModels>(TABLE_NAME, formData, id);
    toast.success(`${id} successfully updated ...`);
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};
