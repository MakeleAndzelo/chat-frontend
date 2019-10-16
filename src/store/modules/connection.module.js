import {CONNECTION_CONNECT, CONNECTION_DISCONNECT, CONNECTION_SEND_MESSAGE} from "../actions.type";
import jwtService from "../../services/jwt.service";
import {WEBSOCKET_URL} from "../../common/config";
import {CONNECTION_REMOVE_CONNECTION, CONNECTION_SET_CONNECTION} from "../mutations.type";

const connectionModule = {
  state: {
    connection: null
  },
  getters: {
    connection(state) {
      return state.connection;
    }
  },
  mutations: {
    [CONNECTION_SET_CONNECTION](state, connection) {
      state.connection = connection;
    },
    [CONNECTION_REMOVE_CONNECTION](state) {
      if (null !== state.connection) {
        state.connection.close();
      }
    }
  },
  actions: {
    [CONNECTION_CONNECT](context) {
      const connection = new WebSocket(WEBSOCKET_URL);

      connection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        context.commit(data.type, data.payload);
      };

      connection.onopen = () => {
        connection.send(JSON.stringify({
          type: 'userAuthorization',
          token: jwtService.getToken()
        }));
      };

      context.commit(CONNECTION_SET_CONNECTION, connection);
    },
    [CONNECTION_DISCONNECT](context) {
      context.commit(CONNECTION_REMOVE_CONNECTION);
    },
    [CONNECTION_SEND_MESSAGE](context, message) {
      context.state.connection.send(JSON.stringify(message));
    }
  },
};

export default connectionModule;