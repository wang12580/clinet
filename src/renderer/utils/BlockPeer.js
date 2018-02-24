// const AschJS = require('asch-js');
const axios = require('axios');

export function peers(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/peers?limit=2`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function serverStatus(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('BLOCK_SET_SERVER_STATUS', [data[2], '连接成功'])
        obj.$store.commit('BLOCK_SET_SERVER', data);
        peers(obj, data)
      } else {
        obj.$store.commit('BLOCK_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
    })
    .catch((err) => {
      obj.$store.commit('BLOCK_SET_SERVER_STATUS', [data[2], '连接失败'])
      console.log(err);
    });
}

// export function peersVersion(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/peers/version`)
//     .end((req, res) => {
//       console.log('获取本节点版本号等信息')
//       if (res) {
//         console.log(res.body)
//       }
//     })
// }

// export function peersGetIp(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/peers/get?ip=192.168.0.1&port=4096`)
//     .end((req, res) => {
//       console.log('获取指定ip节点信息')
//       if (res) {
//         console.log(res.body)
//       }
//     })
// }

// export function peerList(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/peer/list`)
//     .set('magic', '594fe0f3')
//     .set('version', '')
//     .end((req, res) => {
//       console.log('查找dapp peer')
//       if (res) {
//         console.log(res.body)
//       }
//     })
// }

// export function peerBlocks(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/peer/blocks/common`)
//     .set('magic', '594fe0f3')
//     .set('version', '')
//     .end((req, res) => {
//       console.log('查找common block')
//       if (res) {
//         console.log(res.body)
//       }
//     })
// }
