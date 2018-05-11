export class DataCollectorItem {
  constructor(collection, key, parent) {
    this.db = collection
    this.key = key
    this.publicActions = {}
    this.parent = parent
  }
  paginator (query, params) {
    return this.db.count(query).then(total => {
      let pages = Math.ceil(total / params.limit)
      return { total, pages }
    })
  }
  getPages (query, params) {
    return this.db.count(query).then(total => {
      return this._pages(params, total)
    })
  }
  getAggPages (aggregate, params) {
    return new Promise((resolve, reject) => {
      aggregate.push({
        $group: { _id: 'result', TOTAL: { $sum: 1 } }
      })
      // review this
      // let options = { allowDiskUse: true }
      let options = {}
      this.db.aggregate(aggregate, options, (err, cursor) => {
        if (err) reject(err)
        cursor.toArray().then(res => {
          let total = res[0].TOTAL
          resolve(this._pages(params, total))
        })
      })
    })
  }

  _pages (params, total) {
    let page = 1
    let skip = 0
    let pages = 1
    let perPage = params.limit || 10
    if (total) {
      page = params.page > 0 ? params.page : 1
      pages = Math.ceil(total / perPage)
      page = page * perPage < total ? page : pages
      skip = (page - 1) * perPage
    }
    return { page, total, pages, perPage, skip }
  }
  _formatPrevNext (PREV, DATA, NEXT) {
    return { PREV, DATA, NEXT }
  }
  getOne (query, projection) {
    return this.db.findOne(query, projection).then(DATA => {
      return { DATA }
    })
  }
  find (query, sort, limit) {
    sort = sort || {}
    limit = limit || 0
    return this.db
      .find(query)
      .sort(sort)
      .limit(limit)
      .toArray()
      .then(DATA => {
        return { DATA }
      })
  }
  getPrevNext (params, query, queryP, queryN, sort) {
    return this._findPN(query, sort).then(DATA => {
      if (DATA) {
        let jsonData = JSON.stringify(DATA)
        return this._findPN(queryP, sort).then(PREV => {
          if (jsonData == JSON.stringify(PREV)) PREV = null
          return this._findPN(queryN, sort).then(NEXT => {
            if (jsonData == JSON.stringify(NEXT)) NEXT = null
            return { DATA, NEXT, PREV }
          })
        })
      }
    })
  }
  _findPN (query, sort) {
    return this.db
      .find(query)
      .sort(sort)
      .limit(1)
      .toArray()
      .then(res => {
        return res[0]
      })
  }
  _findPages (query, PAGES, sort) {
    return this.db
      .find(query)
      .sort(sort)
      .skip(PAGES.skip)
      .limit(PAGES.perPage)
      .toArray()
  }
  _aggregatePages (aggregate, PAGES) {
    // review this
    let options = {}
    // options.allowDiskUse = true
    aggregate.push({ $skip: PAGES.skip })
    aggregate.push({ $limit: PAGES.perPage })
    return this.db.aggregate(aggregate, options).toArray()
  }

  getAggPageData (aggregate, params, sort) {
    return this.getAggPages(aggregate.concat(), params).then(PAGES => {
      if (sort) aggregate.push({ $sort: sort })
      return this._aggregatePages(aggregate, PAGES).then(DATA => {
        // console.log(PAGES, DATA)
        return { PAGES, DATA }
      })
    })
  }
  getPageData (query, params) {
    let sort = params.sort || this.sort || {}
    // allow only one field to user sort
    if (Object.keys(sort).length > 1) sort = this.sort
    return this.getPages(query, params).then(PAGES => {
      PAGES.sort = sort
      return this._findPages(query, PAGES, sort).then(DATA => {
        return { PAGES, DATA }
      })
    })
  }
  // value: string| array of searched values | Object: 'value':true|false
  fieldFilterParse (field, value, query) {
    query = query || {}
    let fieldQuery
    let inArr = []
    let ninArr = []
    if ('string' === typeof (value)) {
      fieldQuery = value
    } else if (Array.isArray(value)) {
      inArr = value
    } else if ('object' === typeof (value)) {
      for (let p in value) {
        if (value[p]) inArr.push(p)
        else ninArr.push(p)
      }
    }
    if (inArr.length || ninArr.length) fieldQuery = {}
    if (inArr.length) fieldQuery['$in'] = inArr
    if (ninArr.length) fieldQuery['$nin'] = ninArr
    if (fieldQuery) query[field] = fieldQuery
    return query
  }
}
export default DataCollectorItem