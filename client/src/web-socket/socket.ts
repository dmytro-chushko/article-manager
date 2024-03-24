import { Socket, io } from 'socket.io-client';

export const socket: Socket = io(import.meta.env.VITE_BASE_URL || '');
