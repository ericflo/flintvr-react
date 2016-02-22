#version 300 es

in vec3 Position;
in vec4 VertexColor;
uniform mat4 Modelm;
uniform mat4 Viewm;
uniform mat4 Projectionm;
out vec4 fragmentColor;

void main()
{
  gl_Position = Projectionm * (Viewm * (Modelm * vec4(Position, 1.0)));
  fragmentColor = VertexColor;
}