
//Get a GPUCanvasContext from an offscreen HTMLCanvasElement:

//const canvas = document.createElement('canvas');
//const context = canvas.getContext('webgpu');


//20.2. GPUCanvasContext
//[Exposed=(Window, DedicatedWorker), SecureContext]
//interface GPUCanvasContext {
//    readonly attribute (HTMLCanvasElement or OffscreenCanvas) canvas;
//
//    undefined configure(GPUCanvasConfiguration configuration);
//    undefined unconfigure();
//
//    GPUTextureFormat getPreferredFormat(GPUAdapter adapter);
//    GPUTexture getCurrentTexture();

//Configure a GPUCanvasContext to be used with a specific GPUDevice, using the preferred format for this context: 
//const canvas = document.createElement("canvas");
//const context = canvas.getContext("webgpu");

context.configure({
  device: gpuDevice,
  format: context.getPreferredFormat(gpuAdapter),
});

//Reconfigure a GPUCanvasContext in response to canvas resize, monitored using ResizeObserver to get the exact pixel dimensions of the canvas: 
const canvas = document.createElement("canvas");
const context = canvas.getContext("webgpu");

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.target != canvas) {
      continue;
    }
    context.configure({
      device: gpuDevice,
      format: context.getPreferredFormat(gpuAdapter),
      size: {
        // This reports the size of the canvas element in pixels
        width: entry.devicePixelContentBoxSize[0].inlineSize,
        height: entry.devicePixelContentBoxSize[0].blockSize,
      },
    });
  }
});
resizeObserver.observe(canvas);
