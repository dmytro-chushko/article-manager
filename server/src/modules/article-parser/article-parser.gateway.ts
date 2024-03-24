import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { ArticleEvent } from 'src/utils/consts/ArticleEvent';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ArticleParserGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(ArticleEvent.ARTICLE_UPDATED)
  handleMessage(): void {
    this.server.emit(ArticleEvent.REFETCH_ARTICLE);
  }
}
