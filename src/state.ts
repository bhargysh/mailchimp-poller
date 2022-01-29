let state: boolean = true;

export const getState = () => state;

export const setState = (nextState: boolean) => {
  state = nextState;
};
