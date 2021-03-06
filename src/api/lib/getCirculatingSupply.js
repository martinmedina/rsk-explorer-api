import { TOTAL_SUPPLY } from '../../lib/types'
import { bigNumberDifference, applyDecimals } from '../../lib/utils'

export default async function (collection, { bridge }) {
  try {
    const result = await collection.findOne({ address: bridge })
    if (!result) throw new Error('Missing bridge account from db')
    let { balance, decimals } = result
    decimals = decimals || 18
    const bridgeBalance = applyDecimals(balance, decimals).toString(10)
    let circulatingSupply = bigNumberDifference(TOTAL_SUPPLY, bridgeBalance).toString(10)
    return { circulatingSupply, totalSupply: TOTAL_SUPPLY, bridgeBalance }
  } catch (err) {
    return Promise.reject(err)
  }
}
