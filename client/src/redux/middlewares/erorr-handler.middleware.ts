import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IPayloadError } from 'src/types';

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
      toast.error((action.payload.data as { message: string }).message);
    }

    if (action.error.message === 'Rejected') {
      toast.error('Something went wrong');
      console.log(
        (action.payload as { status: number; data: IPayloadError }).data
          .message,
      );
    }
  }

  return next(action);
};
