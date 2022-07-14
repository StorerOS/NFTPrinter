
export default class AdjoinMatrix {
  vertex; // vertex array
  quantity; // matrix length
  adjoinArray; // array of matrices

  constructor(vertx) {
    this.vertex = vertx
    this.quantity = this.vertex.length
    this.adjoinArray = []
    this.init()
  }
  // initialize the array
  init() {
    this.adjoinArray = Array(this.quantity * this.quantity).fill(0)
  }

  /*
   * @param id string
   * @param sides Array<string>
   *  Pass in a vertex, and an array of vertices reachable by the current vertex, and set the weight of the corresponding position
   */
  setAdjoinVertexs(id, sides, weight) {
    const pIndex = this.vertex.indexOf(id)
    sides.forEach((item) => {
      const index = this.vertex.indexOf(item)
      const cur = this.adjoinArray[pIndex * this.quantity + index]
      if (typeof cur !== 'number') { // When specList.length > 3, there is a case of unilateral multiple rights
        this.adjoinArray[pIndex * this.quantity + index].push(weight)
      } else if (cur > 1) {
        this.adjoinArray[pIndex * this.quantity + index] = [cur, weight]
      } else {
        this.adjoinArray[pIndex * this.quantity + index] = weight
      }
    })
  }

  /*
   * @param id string
   * Pass in the value of the vertex, get the column of the vertex
   */
  getVertexCol(id) {
    const index = this.vertex.indexOf(id)
    const col = []
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex])
    })
    return col
  }

  /*
   *  @param params Array<string>
   * Pass in an array of vertices and find the union
   */
  getCollection(params) {
    const paramsVertex = params.map((id) => this.getVertexCol(id))
    const collections = []
    paramsVertex.forEach((col, index) => {
      if (col.some(item => item !== 0)) {
        collections.push(params[index])
      }
    })
    return collections
  }

  /*
   *  @param params Array<string>
   * Pass in an array of vertices and find the intersection
   */
  getUnions(params) {
    const paramsVertex = params.map((id) => this.getVertexCol(id))
    const unions = []
    this.vertex.forEach((type, index) => {
      const row = paramsVertex.map(col => col[index]).filter(t => t !== 1)
      if (this.isItemEqual(row)) {
        unions.push(type)
      }
    })
    return unions
  }

  /*
   *  @param params
   * Pass in an intersection row to determine whether the interiors are equal to each other
   */
  isItemEqual(params) {
    if (params.includes(0)) return false

    let weight = -1

    // find the weight
    if (params.length) {
      params.some(t => {
        if (typeof t === 'number') weight = t
        return typeof t === 'number'
      })
      if (weight === -1) { // are all multi-weight edge arrays
        return this.isArrayUnions(params)
      }
    }

    return params.every(t => {
      if (typeof t === 'number') {
        return t === weight
      } else {
        return t.includes(weight)
      }
    })
  }

  /*
   *  @param params
   * Pass in multiple arrays to determine whether there is an intersection
   */
  isArrayUnions(params) {
    if (!params.length) return false
    return params[0].some(t => {
      return params.every(_t => _t.includes(t))
    })
  }
}
