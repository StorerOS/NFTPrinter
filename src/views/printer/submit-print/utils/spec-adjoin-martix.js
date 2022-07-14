import AdjoinMatrix from './adjoin-martix'

export default class SpecAdjoinMatrix extends AdjoinMatrix {
  specList;
  specCombinationList;

  constructor(specList, specCombinationList) {
    super(specList.reduce((total, current) => [...total, ...current.list], []))
    this.specList = specList
    this.specCombinationList = specCombinationList
    // Created from a matrix of optional specification lists
    this.initSpec()
    // Sibling Vertex Creation
    this.initSameLevel()
  }

  /**
   * Fill in the values of the adjacency matrix according to the optional specification combinations
   */
  initSpec() {
    this.specCombinationList.forEach((item, index) => {
      this.fillInSpec(item.specs, index + 2) // 0用于互不相连，1用于同级，权级就从2开始
    })
  }
  // Fill in the peer point
  initSameLevel() {
    // Get all initial options
    const specsOption = this.getCollection(this.vertex)
    this.specList.forEach((item) => {
      const params = []
      // Get vertices of the same level
      item.list.forEach((value) => {
        if (specsOption.includes(value)) params.push(value)
      })
      // Creation of peer-to-peer points
      this.fillInSpec(params, 1)
    })
  }
  /*
   * @params
   * Pass in the vertex array to query the optional specification
   */
  getSpecscOptions(params) {
    let specOptionCanchoose = []
    if (params.some(Boolean)) {
      // get optional (intersection)
      specOptionCanchoose = this.getUnions(params.filter(Boolean))
    } else {
      // all options
      specOptionCanchoose = this.getCollection(this.vertex)
    }
    return specOptionCanchoose
  }

  /*
   * @params
   * Fill in the values of the adjacency matrix
   */
  fillInSpec(params, weight) {
    params.forEach((param) => {
      this.setAdjoinVertexs(param, params, weight)
    })
  }
}
