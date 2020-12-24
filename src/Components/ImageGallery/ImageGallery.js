import { useState, useEffect } from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import Loaded from "../Loader";
import Modal from "../Modal";
import Button from "../Button";
import s from "./ImageGallery.module.css";

export default function ImageGallery({ search }) {
  const [searchQuery, setSearchQuery] = useState(() => {
    return null ?? [];
  });
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState("");

  const apiFetch = (search, page) => {
    return fetch(
      `https://pixabay.com/api/?key=8315600-a916a243d8ea2edafddc43bfd&q=${search}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    );
  };

  useEffect(() => {
    if (search === "") {
      return;
    }

    setStatus("pending");

    apiFetch(search, page)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`По запросу ${search}ничего не найдено`)
        );
      })
      .then((data) => {
        setSearchQuery(data.hits);
        setPage(1);
        setStatus("resolved");
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  }, [search, page]);

  const handleChangePage = () => {
    setPage((state) => state + 1);
  };

  const openModal = (largeImageURL) => {
    setShowModal(true);
    setImageModal(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {status === "idle" && (
        <h2 style={{ textAlign: "center" }}>Введите параметы поиска </h2>
      )}
      {status === "pending" && <Loaded />}
      {status === "rejected" && <h2>{error}</h2>}
      {status === "resolved" && (
        <>
          <ul className={s.ImageGallery}>
            {searchQuery.map((el) => (
              <ImageGalleryItem
                key={el.id}
                webformatURL={el.webformatURL}
                largeImageURL={el.largeImageURL}
                clickOnImageItem={openModal}
              />
            ))}
          </ul>
          <Button btnLoad={handleChangePage} />
          {showModal && (
            <Modal onCloseModal={closeModal}>
              {<img src={imageModal} alt="" />}
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
