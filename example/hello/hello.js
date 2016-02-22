import React from 'react';
import { render } from '../lib/render';
import cursorVertexShader from './shaders/cursor.vert'
import cursorFragmentShader from './shaders/cursor.frag'

const { VERTEX_POSITION, VERTEX_COLOR, Geometry, Program, Vector3f, Vector4f } = Flint.Core;

function getCubeGeometry() {
  const cubeVertices = [
    VERTEX_POSITION,       VERTEX_COLOR,
    Vector3f(-1,  1, -1),  Vector4f(1, 0, 1, 1), // top
    Vector3f( 1,  1, -1),  Vector4f(0, 1, 0, 1),
    Vector3f( 1,  1,  1),  Vector4f(0, 0, 1, 1),
    Vector3f(-1,  1,  1),  Vector4f(1, 0, 0, 1),
    Vector3f(-1, -1, -1),  Vector4f(0, 0, 1, 1), // bottom
    Vector3f(-1, -1,  1),  Vector4f(0, 1, 0, 1),
    Vector3f( 1, -1,  1),  Vector4f(1, 0, 1, 1),
    Vector3f( 1, -1, -1),  Vector4f(1, 0, 0, 1)
  ];
  const cubeIndices = [
    0, 1, 2, 2, 3, 0, // top
    4, 5, 6, 6, 7, 4, // bottom
    2, 6, 7, 7, 1, 2, // right
    0, 4, 5, 5, 3, 0, // left
    3, 5, 6, 6, 2, 3, // front
    0, 1, 7, 7, 4, 0  // back
  ];
  return Geometry({
    vertices: cubeVertices,
    indices: cubeIndices
  });
}

const Cursor = React.createClass({
  getDefaultProps: function() {
    return {
      geometry: getCubeGeometry(),
      program: Program(cursorVertexShader, cursorFragmentShader)
    };
  },

  handleFrame: function(ev) {
    const pos = ev.viewPos.add(ev.viewFwd.multiply(5));
    this.refs.model.position.x = pos.x;
    this.refs.model.position.y = pos.y;
    this.refs.model.position.z = pos.z;
  },

  render: function() {
    return (
      <model ref="model"
             geometry={this.props.geometry}
             program={this.props.program}
             scale={Vector3f(0.02, 0.02, 0.02)}
             onFrame={this.handleFrame}>
      </model>
    );
  }
});

global.vrmain = function(env) {
  render(
    <scene>
      <Cursor />
    </scene>
  );
}