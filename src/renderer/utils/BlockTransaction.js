const AschJS = require('asch-js');
const axios = require('axios');
const qs = require('qs');
// const targetAddress = '16358246403719868041';
// const amount = 100 * 100000000; // 100 XAS
// const message = '备注';
// const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor';
// const secondSecret = '123456'

// const trans = AschJS.transaction.createTransaction(targetAddress, amount, message, secret, secondSecret || undefined)
// console.log('在主链转账')
// console.log(trans)

// const transId = AschJS.crypto.getId(trans)
// console.log('获取交易ID')
// console.log(transId)

// /peer相关的api，在请求时都需要设置一个header
// key为magic，testnet value:594fe0f3, mainnet value:5f5b3cf5
// key为version，value为''
export function blockPost(obj, data) {
  const targetAddress = data[2].targetAddress;
  const amount = parseInt(data[2].amount, 10); // 100 XAS
  const message = data[2].message;
  const secret = global.hitbdata.blockchain_user;
  const secondSecret = data[2].secondPassword;
  console.log(amount);
  const trs = AschJS.transaction.createTransaction(targetAddress, amount, message, secret, secondSecret || undefined);
  const serverIp = '127.0.0.1'
  const serverPort = '80'
  const objs2 = {};
  objs2.type = '转账';
  objs2.trs = JSON.stringify(trs);
  axios({
    method: 'post',
    url: `http://${serverIp}:${serverPort}/block/blockchain_post`,
    data: qs.stringify(objs2),
    async: false,
    // headers: { magic: '594fe0f3', version: '' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
    if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_TRANS', res.data)
    }
  })
    .catch((err) => {
      console.log(err);
    });
}
export function transactions1(obj, data) {
  console.log(data);
  const targetAddress = data[2].targetAddress;
  const amount = parseInt(data[2].amount, 10); // 100 XAS
  const message = data[2].message;
  const secret = global.hitbdata.blockchain_user;
  const secondSecret = data[2].secondPassword;
  const transaction = AschJS.transaction.createTransaction(targetAddress, amount, message, secret, secondSecret || undefined);
  console.log(transaction);
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/peer/transactions`,
    data: { transaction: transaction },
    headers: { magic: '594fe0f3', version: '' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
    if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_TRANS', res.data)
    }
  })
    .catch((err) => {
      console.log(err);
    });
  // Request
  //   .post(`${data[0]}:${data[1]}/peer/transactions`)
  //   .send({ transaction: trans })
  //   .set('Content-Type', 'application/json')
  //   .set('magic', '594fe0f3')
  //   .set('version', '')
  //   .end((err, res) => {
  //     console.log('转账交易')
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(res.body)
  //     }
  //   })
}

// export function transactions2(obj, data) {
//   Request
//     .put(`${data[0]}:${data[1]}/api/transactions`)
//     .send({ secret: secret,
//       amount: 10000,
//       recipientId: '16723473400748954103'
//     }).set('Content-Type', 'application/json')
//     .end((err, res) => {
//       console.log('创建交易并广播')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }
// 获取交易信息
// export function getTransactions(obj, data) {
//   console.log(obj.$store.state.Block.pege);
//   const page = obj.$store.state.Block.pege * 10
//   axios.get(`http://${data[0]}:${data[1]}/api/transactions?limit=10&offset=${page}`)
//     .then((res) => {
//       console.log(res.data)
//       if (res.status === 200) {
//         obj.$store.commit('BLOCK_SET_TRANS', res.data)
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// 根据交易id查看交易详情
export function getTransactionsById(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/transactions/get?id=${data[2]}`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 根据未确认交易id查看详情
export function transactionsUnconfirmed(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/transactions/unconfirmed/get?id=${data[2]}`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function transactionsUnconfirmedAll(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/transactions/unconfirmed?limit=2`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        obj.$store.commit('BLOCK_SET_TRANSUN', res.data)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
