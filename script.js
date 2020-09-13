let wasmExports = null;

let wasmMemory = new WebAssembly.Memory({initial: 256,maximum: 256});

let wasmTable = new WebAssembly.Table({
    'initial': 1,
    'element': 'anyfunc'
  });
  let asmLibraryArg = {
    "__indirect_function_table": wasmTable,
      "__handle_stack_overflow":()=>{},
      "emscripten_resize_heap":()=>{},
      "__lock":()=>{},
      "__unlock":()=>{},
      "memory":wasmMemory,
      // "table":wasmTable,   
  };
  var info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg
  };
async function loadWasm(){
    let response = await fetch('function.wasm');
    let bytes = await response.arrayBuffer();
    let wasmObj = await WebAssembly.instantiate(bytes,info);
    wasmExports = wasmObj.instance.exports.add(2,3);
    console.log(wasmExports);
}
  
loadWasm();

// fetch('function.wasm').then(response => 
//   response.arrayBuffer()
// ).then(bytes => 
//   WebAssembly.instantiate(bytes,info)
// ).then(obj => {
//     console.log(obj.instance.exports.add());
// });