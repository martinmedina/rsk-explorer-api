import dataSource from '../lib/dataSource.js'
import conf from '../lib/config'
import web3Connect from '../lib/web3Connect'
import Address from './classes/Address'
import Logger from '../lib/Logger'
import { errors } from '../lib/types'
import { serialize } from '../lib/utils'

const config = Object.assign({}, conf.blocks)
const log = Logger('UserRequests', config.log)
const web3 = web3Connect(config.node, config.port)

dataSource.then(db => {
  const addressCollection = db.collection(config.addrCollection)
  const cache = new RequestCache()
  process.on('message', msg => {
    let action, params, block
    ({ action, params, block } = msg)
    if (action && params && block) {
      switch (action) {
        case 'updateAddress':
          try {
            const address = params.address
            const cached = cache.isRequested(action, address, block)
            if (cached) {
              msg.data = cached
              sendMessage(msg)
            } else {
              const Addr = new Address(address, web3, addressCollection)
              Addr.fetch().then(result => {
                msg.result = result
                cache.set(action, address, result, block)
                const balance = (result.balance) ? result.balance.toString() : 0
                if (balance > 0) {
                  Addr.save()
                    .catch(err => {
                      log.error(`Error saving address ${address}, ${err}`)
                    })
                    .finally(() => {
                      sendMessage(msg)
                    })
                } else {
                  msg.data = result
                  sendMessage(msg)
                }
              }).catch(err => {
                log.error(err)
                msg.error = errors.TEMPORARILY_UNAVAILABLE
                sendMessage(msg)
              })
            }
          } catch (err) {
            log.debug(err)
            msg.error = err
            sendMessage(msg)
          }
          break
      }
    }
  })
})

const sendMessage = (msg) => {
  process.send(serialize(msg))
}
class RequestCache {
  constructor () {
    this.requested = {}
    this.block = null
  }
  set (action, key, value, block) {
    this.setBlock(block)
    let actions = this.getAction(action)
    actions[key] = value
    this.requested[action] = actions
  }
  setBlock (block) {
    if (block !== this.block) {
      this.block = block
      this.requested = {}
    }
  }
  getAction (action) {
    return this.requested[action] || {}
  }
  isRequested (action, key, block) {
    this.setBlock(block)
    return this.getAction(action)[key]
  }
}