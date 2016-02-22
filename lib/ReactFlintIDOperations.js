const blessedNodes = {};

class ReactBlessedIDOperations {
  add(ID, node) {
    blessedNodes[ID] = node;
    return this;
  }

  get(ID) {
    const numPeriods = ID.match(/\./g).length;

    // If the node is root, we return the scene
    if (numPeriods === 0) {
      return Flint.scene;
    }

    return blessedNodes[ID];
  }

  getParent(ID) {
    const numPeriods = ID.match(/\./g).length;

    // If the node is root, we return null
    if (numPeriods === 1) {
      return Flint.scene;
    }

    const parentID = ID.split('.').slice(0, -1).join('.');
    return this.get(parentID);
  }

  drop(ID) {
    delete blessedNodes[ID];
    return this;
  }
}

export default new ReactBlessedIDOperations();