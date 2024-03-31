import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IPayloadError } from 'src/types/error';

export const errorHandler: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    if (
      typeof action === 'object' &&
      'payload' in action &&
      typeof action.payload === 'object' &&
      action.payload &&
      'data' in action.payload &&
      action.payload.data &&
      typeof action.payload.data === 'object' &&
      'message' in action.payload.data
    ) {
      console.log((action.payload.data as { message: string }).message);
    }

    if (action.error.message === 'Rejected') {
      console.log(action.payload);
      if (
        typeof action.payload === 'object' &&
        action.payload &&
        'data' in action.payload
      ) {
        const { errorType, message } = (
          action.payload as { status: number; data: IPayloadError }
        ).data;

        if (errorType === 'UnauthorizedException') {
          toast.error(message);
        } else {
          toast.error('Something went wrong');
        }
      }
    }
  }

  return next(action);
};
