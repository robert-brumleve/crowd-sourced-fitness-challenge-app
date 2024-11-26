//This code is based from
// https://mdbootstrap.com/docs/standard/extended/carousel-with-thumbnails/
import React from "react";

const ImageAlbum = ({images}) => {

    /*const images = [
        "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(88).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(121).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(31).webp"
      ];*/
//style={{maxWidth:"45rem"}}
  return (
    <div className="container" style={{maxWidth:"40rem"}}>
    <section className="p-4 text-center">
    <span className="fs-4 fw-bold mb-3 d-block">Gallery of Shared Images</span>
      <div
        id="carouselExampleIndicators"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        {/* Slides */}
        <div className="carousel-inner mb-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={img.imgUrl}
                className="d-block w-100  img-fluid "
                alt={`Slide ${index + 1}`}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Thumbnails */}
        <div className="carousel-indicators position-static mt-3 d-flex justify-content-center gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={`p-0 border-0 ${index === 0 ? "active" : ""}`}
              aria-label={`Slide ${index + 1}`}
              style={{width:"100px"}}
            >
              <img
                src={img.imgUrl}
                className="d-block w-100 img-fluid"
                alt={`Thumbnail ${index + 1}`}
                style={{
                  height: "60px",
                  objectFit: "cover",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  </div>
    
  );
};

export default ImageAlbum;
