import React, { useEffect } from "react";
import useEdit from "../../Hooks/product/useEdit";
import useSpinner from "shared/components/spinner/useSpinner";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct: React.FC = () => {
  const {
    getProductById,
    editProductById,
    name,
    quantity,
    price,
    load,
    handleChange,
    description,
    displays,
    shopId,
    variations,
  } = useEdit();
  const navigate = useNavigate();

  let { productId } = useParams();
  const { renderSpinner } = useSpinner();
  useEffect(() => {
    getProductById(productId);
  }, []);

  return (
    <form
      autoComplete="off"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        editProductById(e, productId);
      }}
      className="flex flex-col w-full px-[0.5rem]  py-[2rem] md:px-[2rem] space-y-5 relative"
    >
      {/*......................................
            *NAME AND PRICE
         ......................................*/}
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-10">
        <div className="flex flex-col w-full">
          <label htmlFor="name" className="labels">
            Product name
          </label>
          <input
            onChange={handleChange}
            required
            value={name}
            type="text"
            id="name"
            className="inputs"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="price" className="labels">
            Price($.)
          </label>
          <input
            onChange={handleChange}
            required
            value={price}
            type="number"
            id="price"
            className="inputs"
          />
        </div>
      </div>
      {/*......................................
            *DESC AND QUANTITY
         ......................................*/}
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-10">
        <div className="flex flex-col w-full">
          <label htmlFor="desc" className="labels">
            Description
          </label>
          <textarea
            onChange={handleChange}
            value={description}
            id="desc"
            rows={3}
            className="textarea"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="quantity" className="labels">
            Quantity
          </label>
          <input
            onChange={handleChange}
            required
            value={quantity}
            type="number"
            id="quantity"
            className="inputs"
          />
        </div>
      </div>
      {/*......................................
               * VARIATIONS
            ......................................*/}
      <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="flex flex-col w-full">
          {/* description */}
          <label htmlFor="variations" className="labels">
            Variations
          </label>
          <input
            onChange={handleChange}
            value={variations}
            id="variations"
            className="inputs"
          />
        </div>
        <div className="flex flex-col w-full"></div>
      </div>

      {/*......................................
            *IMAGES
         ......................................*/}
      <div className="flex flex-col md:flex-row  md:space-x-10">
        {/* upload btn  and hidden input*/}
        {load ? null : (
          <div className="flex flex-col w-full">
            <button
              type="button"
              onClick={() => {
                // navigate(`/add/${shopId}/images/${productId}`, {
                //   replace: true,
                // });
                navigate(`/myAccount/shops/add/${shopId}/images/${productId}`, {
                  replace: true,
                });
              }}
              className="red-outline-btn"
            >
              Upload new images
            </button>
          </div>
        )}

        {/* IMAGES */}
        <div className="flex flex-row flex-wrap w-full">
          {displays?.map((img: any, key: number) => (
            <div className="relative flex flex-col" key={key}>
              {img.length > 60 ? (
                <img
                  src={img}
                  alt=""
                  key={key}
                  className="h-[6rem] w-[4rem] lg:w-[8rem] mx-[1.4rem] object-contain
                            cursor-pointer"
                />
              ) : (
                <img
                  src={img}
                  alt={img}
                  key={key}
                  className="h-[6rem] w-[4rem] lg:w-[8rem] mx-[1.4rem] object-contain
                  cursor-pointer"
                />
              )}
              {/* 
							<FontAwesomeIcon
								icon={faTrash}
								size="1x"
								color="#F74356"
								onClick={() => {
									removeImg(key);
								}}
								className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50]
                        z-20"
							/> */}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full md:w-[50%]">
        {renderSpinner(load)}
        <button type="submit" className="blue-btn">
          Update
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
