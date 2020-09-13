#include <emscripten.h>

float EMSCRIPTEN_KEEPALIVE add(float x, float y) {
  return x + y;
}