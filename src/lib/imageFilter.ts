export const applyFilterToCanvas = (
  canvasElement: HTMLCanvasElement,
  selectedFilter: string
) => {
  const newCanvas = document.createElement("canvas");
  newCanvas.width = canvasElement.width;
  newCanvas.height = canvasElement.height;

  const ctx = newCanvas.getContext("2d");
  if (ctx) {
    ctx.filter = selectedFilter;
    ctx.drawImage(canvasElement, 0, 0);
  }

  return newCanvas;
};
