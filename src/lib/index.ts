/**
 * アプリのエントリーポイント。全てのモジュール統合
 */

import { Game } from '$lib/game';
import { Socket } from '$lib/socket';
import { Handlers } from '$lib/handlers';
import { NetworkHandlers } from '$lib/network-handlers';
import { Config } from '$lib/config';

const game = new Game();
const socket = new Socket(Config.SERVER_URL);
const handlers = new Handlers();
const network = new NetworkHandlers(socket, handlers);

network.initialize();
socket.connect();
game.init();

// グローバルエラー処理や再接続などの追加もここで行う