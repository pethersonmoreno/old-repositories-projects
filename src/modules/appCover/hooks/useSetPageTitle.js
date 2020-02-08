import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../actions/actionsApp';

const useSetPageTitle = title => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle(title));
  }, [dispatch, title]);
};

export default useSetPageTitle;
