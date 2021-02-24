import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { IAppState } from '../../interface/state';
import {
  TAllAction,
  ESubjectsPageAction,
  ISubjectsPageAction,
} from '../../interface/action';
import { ISubjectModels } from '../../interface/model';
import Firebase from '../../service';

const TABLE_NAME = 'subjects';

const setLoading = (isLoading: boolean): ISubjectsPageAction => ({
  type: ESubjectsPageAction.SUBJECT_SET_LOADING,
  payload: { isLoading },
});

export const resetStateData = () => ({
  type: ESubjectsPageAction.SUBJECT_RESET_STATE,
});

export const setSubjectList = (list: ISubjectModels[]): ISubjectsPageAction => ({
  type: ESubjectsPageAction.SUBJECT_SET_LIST,
  payload: { list },
});

export const getSubjects = ()
: ThunkAction<void, IAppState, {}, TAllAction> => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const firebase = new Firebase();
    const list = await firebase.getDocumentsFromCollections<ISubjectModels[]>(TABLE_NAME);
    dispatch(setSubjectList(list));
  } catch (err) {
    toast.error(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};
