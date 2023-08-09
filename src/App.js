import { useState } from "react";
import "./App.css";

function App() {
  const [imageURL, setImageURL] = useState("https://picsum.photos/200");
  const [saturation, setSaturation] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [randomSaturation, setRandomSaturation] = useState(
    Math.random() * 201 + 1
  );
  const [randomBrightness, setRandomBrightness] = useState(
    Math.random() * 201 + 1
  );
  const [randomContrast, setRandomContrast] = useState(Math.random() * 201 + 1);
  const [results, setResults] = useState(false);

  // const originalImageStyle = {
  //   filter: `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%)`,
  // };

  const randomImageStyle = {
    filter: `saturate(${randomSaturation}%) contrast(${randomContrast}%) brightness(${randomBrightness}%)`,
  };

  const handleConfirm = () => {
    setResults({
      saturation:
        100 * (1 - Math.abs(randomSaturation - saturation) / randomSaturation),
      contrast:
        100 * (1 - Math.abs(randomContrast - contrast) / randomContrast),
      brightness:
        100 * (1 - Math.abs(randomBrightness - brightness) / randomBrightness),
    });
    setTimeout(() => {
      newImage();
      setResults(false);
    }, 3000);
  };

  const newImage = () => {
    setImageURL(imageURL + "?");
    setRandomBrightness(Math.random() * 201 + 1);
    setRandomContrast(Math.random() * 201 + 1);
    setRandomSaturation(Math.random() * 201 + 1);
    setSaturation(100);
    setBrightness(100);
    setContrast(100);
  };

  return (
    <div className="App">
      <h1 className="header">
        Edit the photo on the left to make it look like the one on the right
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="card w-200 bg-base-100 shadow-xl m-1.5 rounded-2xl">
          <figure>
            <div className={`image-container`}>
              <img
                src={imageURL}
                alt="original"
                style={{
                  filter: `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%)`,
                }}
              />
            </div>
          </figure>
        </div>
        <div className="card w-200 bg-base-100 shadow-xl m-1.5">
          <figure>
            <img src={imageURL} alt="original" style={randomImageStyle} />
          </figure>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={newImage} className="btn btn-neutral">
          Change Image
        </button>
      </div>

      <div>
        <label>Saturation:</label>
        <input
          type="range"
          min="1"
          max={`200`}
          value={saturation}
          className="range range-primary"
          onChange={(e) => setSaturation(e.target.value)}
        />
        {results ? <span>{`${results.saturation}%`}</span> : <></>}
      </div>

      <div>
        <label>Contrast:</label>
        <input
          type="range"
          min="1"
          max="200"
          value={contrast}
          className="range range-secondary"
          onChange={(e) => setContrast(e.target.value)}
        />
        {results ? <span>{`${results.contrast}%`}</span> : <></>}
      </div>

      <div>
        <label>Brightness:</label>
        <input
          type="range"
          min="1"
          max="200"
          value={brightness}
          className="range range-accent"
          onChange={(e) => setBrightness(e.target.value)}
        />
        {results ? <span>{`${results.brightness}%`}</span> : <></>}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={handleConfirm} className="btn btn-success">
          Confirm
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {results ? (
          <h1>{`${
            (results.saturation + results.brightness + results.contrast) / 3
          }%`}</h1>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
