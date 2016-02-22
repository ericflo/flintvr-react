import ReactMultiChild from 'react/lib/ReactMultiChild';
import ReactFlintIDOperations from './ReactFlintIDOperations';
import invariant from 'invariant';
import {extend, groupBy, startCase, filter, each} from 'lodash';

const FLINT_TYPES = {
  model: true,
  scene: true
};

export default class ReactFlintComponent {
  constructor(tag) {
    this._tag = tag.toLowerCase();
    this._renderedChildren = null;
    this._previousStyle = null;
    this._previousStyleCopy = null;
    this._rootNodeID = null;
    this._wrapperState = null;
    this._topLevelWrapper = null;
    this._nodeWithLegacyProperties = null;
  }

  construct(element) {
    this._currentElement = element;
  }

  mountComponent(rootID, transaction, context) {
    this._rootNodeID = rootID;

    const node = this.mountNode(
      ReactFlintIDOperations.getParent(rootID),
      this._currentElement
    );

    ReactFlintIDOperations.add(rootID, node);

    // Get the children
    let childrenToUse = this._currentElement.props.children;
    // Make sure it's an array
    childrenToUse = childrenToUse === null ? [] : [].concat(childrenToUse);
    /*
    // Filter out non-Flint types for now
    childrenToUse = filter(childrenToUse, function(child) {
      print('asdf ' + child + ' ' + (typeof child));
      return FLINT_TYPES[typeof child];
    });
    */

    if (childrenToUse.length > 0) {
      this.mountChildren(childrenToUse, transaction, context);
    }
  }

  mountNode(parent, element) {
    const {props, type} = element,
          {children, ...options} = props,
          flintElementExists = FLINT_TYPES[type.toLowerCase()];

    invariant(
      flintElementExists,
      `Invalid Flint element "${type}".`
    );

    let node = null;
    if (type.toLowerCase() === 'scene') {
      print('scene: ' + parent);
      node = Flint.scene;
      each(options, function(value, key) {
        node[key] = value;
      });
    } else {
      print('parent: ' + parent);
      node = Flint.Core[startCase(type)](options);
      parent.add(node);
    }
    
    return node;
  }

  receiveComponent(nextElement, transaction, context) {
    const {props: {children, ...options}} = nextElement,
           node = ReactFlintIDOperations.get(this._rootNodeID);

    // Update the properties on the node
    this._updating = true;
    each(options, function(value, key) {
      // TODO: Bind 'this' to the component such that FlintVR won't override it
      node[key] = value;
    });
    this._updating = false;

    // Updating children
    let childrenToUse = children === null ? [] : [].concat(children);
    /*
    // Filter out non-Flint types for now
    childrenToUse = filter(childrenToUse, function(child) {
      return FLINT_TYPES[typeof child] || false;
    });
    */
    this.updateChildren(childrenToUse, transaction, context);
  }

  unmountComponent() {
    this.unmountChildren();

    const node = ReactFlintIDOperations.get(this._rootNodeID);
    const parent = ReactFlintIDOperations.getParent(this._rootNodeID);
    parent.remove(node);

    ReactFlintIDOperations.drop(this._rootNodeID);

    this._rootNodeID = null;
  }

  getPublicInstance() {
    return ReactFlintIDOperations.get(this._rootNodeID);
  }
}

extend(
  ReactFlintComponent.prototype,
  ReactMultiChild.Mixin
);