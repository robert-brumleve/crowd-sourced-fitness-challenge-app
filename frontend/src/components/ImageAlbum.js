//This code is based from
// https://mdbootstrap.com/docs/standard/extended/gallery/
import React from "react";

const ImageAlbum = ({ images }) => {
  return (
    <section className="mx-auto" style={{ maxWidth: "45rem", margin: "1rem" }}>
      {/* Section: Images */}
      <section className="border">
        <span className="fs-4 fw-bold mb-3 d-block text-center">
          Gallery of Shared Images
        </span>
        <div className="row">
          {images.map((image, index) => (
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0" key={index}>
              <div
                className="bg-image hover-overlay ripple shadow-1-strong rounded
                justify-content-center d-flex "
                data-ripple-color="light"
                data-bs-toggle="modal" // Bootstrap JS modal trigger
                data-bs-target={`#exampleModal${index + 1}`} // Link to the modal
              >
                <img
                  src={image.imgUrl}
                  className="d-block w-100 img-fluid rounded" // Make sure images are responsive
                  alt=""
                  style={{
                    cursor: "pointer",
                    height: "auto", // Maintain aspect ratio
                    maxHeight: "500px",
                    maxWidth: "95%", // Prevent image from overflowing
                    padding: "5px",
                  }}
                />
                <a
                  href="#!"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal${index + 1}`}
                >
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Section: Modals */}
      <section>
        {images.map((image, index) => (
          <div
            className="modal fade "
            id={`exampleModal${index + 1}`}
            tabindex="-1"
            aria-labelledby={`exampleModal${index + 1}Label`}
            aria-hidden="true"
            key={index}
          >
            <div
              className="modal-dialog modal-lg "
              style={{ padding: "5px", maxHeight: "80vh", width: "auto" }}
            >
              <div className="modal-content">
                <div className="modal-body d-flex justify-content-center align-items-center text-center">
                  <img
                    src={image.imgUrl} // Display the image in the modal
                    alt=""
                    className="img-fluid rounded" // Ensure the image is responsive
                    style={{
                      //width: "100%", // Ensure image takes full width
                      maxHeight: "60vh", // Maintain aspect ratio
                      maxWidth: "100%", // Prevent image from overflowing
                    }}
                  />
                </div>
                <div className="text-center py-3">
                  <button
                    type="button"
                    data-bs-dismiss="modal" // Bootstrap JS dismiss modal
                    className="btn btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default ImageAlbum;
