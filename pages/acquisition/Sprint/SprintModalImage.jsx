import React, { useEffect, useState } from "react";
import ModalCustom from "../../../components/ModalCustom";
import { DialogContent, DialogContentText } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import config from "../../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../../../components/styleComponent/carouselStyle.css";

export default function SprintModalImage({
  modalOpen,
  setModalOpen,
  sprintId,
}) {
  const [imageList, setImageList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newSprintId, setNewSprintId] = useState("");

  const arrowStyle = {
    color: "#171717",
    transition: "color 0.3s",
  };

  const SampleNextArrow = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      style={{
        display: "block",
        position: "absolute",
        bottom: "20px",
        left: "95%",
        transform: "translateX(-50%)",
        zIndex: 1,
        cursor: "pointer",
      }}>
      <FontAwesomeIcon icon={faCircleRight} style={arrowStyle} />
    </div>
  );

  const SamplePrevArrow = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      style={{
        display: "block",
        position: "absolute",
        bottom: "20px",
        left: "5%",
        transform: "translateX(-50%)",
        zIndex: 1,
        cursor: "pointer",
      }}>
      <FontAwesomeIcon icon={faCircleLeft} style={arrowStyle} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentImageIndex(index),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    // Enkripsi sprintId menggunakan Base64 encoding saat komponen pertama kali dirender
    const encryptedSprintId = btoa(sprintId.toString());
    setNewSprintId(encryptedSprintId);

    // Mengambil data ketika komponen pertama kali dirender
    const getImageList = async () => {
      try {
        const response = await fetch(
          `${config.api_ptms}/merchant?id=${encryptedSprintId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const merchantDoc = data.result.merchantDoc;

          const images = [
            merchantDoc.ktpPic,
            merchantDoc.ktpDirectors,
            merchantDoc.npwpDirectors,
            merchantDoc.npwpOffice,
            merchantDoc.aktaOffice,
            merchantDoc.aktaAmantmend,
            merchantDoc.skKemenkeh,
            merchantDoc.nib,
            merchantDoc.siup,
            merchantDoc.photoOffice,
          ];

          setImageList(images.filter((image) => !!image));
        } else {
          console.log("Gagal mengambil data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (modalOpen) {
      getImageList();
    }
  }, [modalOpen, sprintId]);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalCustom
      id="showImage-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={`Document - ${imageList[currentImageIndex]}`}
      type="3xl">
      <div>
        <DialogContent>
          <DialogContentText
            id="image-carousel-dialog-description"
            style={{
              height: "auto",
              overflowY: "hidden",
              overflowX: "hidden",
              padding: 0,
            }}>
            <Slider {...settings}>
              {imageList.map((imageName, index) => (
                <div
                  key={index}
                  className="border"
                  style={{
                    position: "relative",
                    backgroundColor:
                      index === currentImageIndex ? "#000000" : "transparent",
                  }}>
                  <div className="flex bg-slate-300">
                    <img
                      src={`${config.api_ptms}/download-file?fileName=${imageName}`}
                      alt={`Image ${index + 1}`}
                      style={{
                        maxHeight: "53vh",
                        maxWidth: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </DialogContentText>
        </DialogContent>
      </div>
    </ModalCustom>
  );
}
