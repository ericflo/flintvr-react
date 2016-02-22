flint-react
-----------

This is a small shim library to wrap FlintVR with React.js bindings.


How to Use
----------

Please see the example project. Other than that, this is just regular react
but you can use 'scene' and 'model' components.

```javascript
global.vrmain = function(env) {
  render(
    <scene>
      <model file='box.fbx' position={Vector3(0, 0, -10)} />
    </scene>
  );
}
```