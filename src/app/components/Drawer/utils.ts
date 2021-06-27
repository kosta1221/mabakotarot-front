export const useCreateToggleDrawerUtil = (dispatch, actions) => (
  payload: boolean,
) => event => {
  if (
    event &&
    event.type === 'keydown' &&
    (event.key === 'Tab' || event.key === 'Shift')
  ) {
    return;
  }

  dispatch(actions.setIsDrawerDisplayed(payload));
};
