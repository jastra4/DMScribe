import store from '../store';
import axios from 'axios';

export const CHANGE_TAB = 'CHANGE_TAB';
export const ADD_MONSTER = 'ADD_MONSTER';
export const DELETE_MONSTER = 'DELETE_MONSTER';
export const CLEAR_MONSTERS = 'CLEAR_MONSTERS';
export const ADD_MONSTER_IMG = 'ADD_MONSTER_IMG';
export const ADD_PLAYER = 'ADD_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const ADD_CLASS_IMG = 'ADD_CLASS_IMG';
export const ADD_CUSTOM_MONSTER = 'ADD_CUSTOM_MONSTER';
export const ASSIGN_TURN_VALUE = 'ASSIGN_TURN_VALUE';

export const populateMonsterUrls = () => {
  axios('http://www.dnd5eapi.co/api/monsters')
  .then(res => {
    store.dispatch({
      type: 'POPULATE_MONSTER_URLS',
      payload: res.data.results
    });
  });
};

export const addMonster = (url, checked) => {
  axios.get(url)
  .then(res => {
    const monster = res.data;
    monster.init = Math.floor((monster.dexterity - 10) / 2);
    if (checked) {
      monster.order = monster.init + (Math.floor(Math.random() * Math.floor(20)));
      store.dispatch({type: ADD_MONSTER, payload: monster});
    } else {
      store.dispatch({type: ADD_MONSTER, payload: monster});
    }

    store.dispatch(generateTurnOrder());

    fetchMonsterImg(monster.name)
    .then(url => {
        addMonsterImg(url, monster.id);
    });
  });
}

const fetchMonsterImg = monsterName => {
  return axios.get('http://localhost:3000/monsterimg', {
    params: {
      monsterName: monsterName
    }
  })
  .then(res => res.data);
};

const addMonsterImg = (url, id) => {
  store.dispatch({
    type: ADD_MONSTER_IMG,
    payload: {
      url: url,
      id: id
    }
  });
};

export const addCustomMonster = (monster) => {
  store.dispatch({
    type: ADD_CUSTOM_MONSTER,
    payload: monster
  })
}

export const clearMonstersField = () => {
  store.dispatch({
    type: CLEAR_MONSTERS,
    payload: []
  });
}

export const clearOrderField = () => {
  store.dispatch({
    type: 'CLEAR_ORDER',
    payload: []
  })
}

export const removeMonster = id => {
  return {
    type: DELETE_MONSTER,
    payload: {
      id: id
    }
  }
}

export const addPlayer = (player) => {
  store.dispatch({
    type: ADD_PLAYER,
    payload: player
  });
  fetchClassImg(player.class)
  .then(url => {
    addClassImg(url, player.id);
  })
}

const fetchClassImg = className => {
  return axios.get('http://localhost:3000/classimg', {
    params: {
      className: className
    }
  })
  .then(res => res.data);
}

const addClassImg = (url, id) => {
  store.dispatch({
    type: ADD_CLASS_IMG,
    payload: {
      url: url,
      id: id
    }
  })
}

export const removePlayer = name => {
  return {
    type: DELETE_PLAYER,
    payload: {
      name: name
    }
  }
}

export const generateTurnOrder = () => {
  return {
    type: 'ORDER'
  }
}

export const selectTab = tab => {
  return {
    type: CHANGE_TAB,
    payload: tab
  }
}

export const assignTurnValue = (name, value) => {
  store.dispatch({
    type: ASSIGN_TURN_VALUE,
    payload: {
      name: name,
      value: value
    }
  });
};
