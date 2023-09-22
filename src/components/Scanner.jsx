import React, { useEffect, useState } from "react";
import Quagga from "quagga";
import config from "../jsons/scannerConfig.json";
import { validateIsbn } from "../services/valid";
import "./styles/Style.css";

const Scanner = (props) => {
  let scannerAttemps = 0;

  const onDetected = (result) => {
    Quagga.offDetected(onDetected);

    let isbn = result;
    console.log(isbn);

    if (validateIsbn(isbn)) {
      props.setCode(result);
      scannerAttemps= 0
      return;
    } else {
      if (scannerAttemps > 5) {
        console.log(scannerAttemps);
        alert("Código invalido");
      }
      scannerAttemps++;
    }
  };

  const handleProcessed = (result) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;
    drawingCtx.font = "24px Arial";
    drawingCtx.fillStyle = "green";

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute("width")),
          parseInt(drawingCanvas.getAttribute("height"))
        );
        result.boxes
          .filter((box) => box !== result.box)
          .forEach((box) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: "green",
              lineWidth: 2,
            });
          });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: "blue",
          lineWidth: 5,
        });
      }
    }
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init(config, (err) => {
        if (err) {
          console.log(err, "error msg");
        }
        Quagga.start();
        return () => {
          Quagga.stop();
        };
      });
      Quagga.onProcessed(handleProcessed);
    }

    Quagga.onDetected(detected);
  }, []);

  const detected = (result) => {
    onDetected(result.codeResult.code);
  };

  return (
    <div
      id="interactive"
      className="viewport"
      style={{ position: "relative", height: 380 }}
    >
      <canvas
        className="drawingBuffer"
        style={{
          position: "absolute",
          top: "0px",
          border: "3px solid green",
        }}
      />
    </div>
  );
};
export default Scanner;
